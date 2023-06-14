const express = require("express");
const db = require("./queries");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const cors = require("cors");
const PORT = 5000;

app.use(cors());

app.use(express.json());

// getByToken
app.get("/get_user", authenticateToken, db.getCustomerByToken);
app.get("/get_provider", authenticateToken, db.getProviderByToken);
app.get("/get_admin", authenticateToken, db.getAdminByToken);

// Customer
app.post("/users", db.createCustomer);
app.get("/users", db.getCustomer);
app.get("/users_count", db.getCustomercount);
app.get("/users/:id", db.getCustomerById);
app.put("/users/:id", db.updateCustomerCreaditCard);
app.put("/delete_user/:id", db.deleteCustomer);
app.put("/update_user/:id", db.updateUser);
app.put("/update_card/:id", db.fillCreditCard);
app.post("/createMoveCustomer/:id", db.createMoveCustomer);
app.post("/Pre_rented_cars/:id", db.Pre_rented_cars);

// admin
app.get("/admin", db.getAdmin);
app.post("/admin", db.createAdmin);
app.put("/delete_admin/:id", db.deleteAdmin);
app.put("/update_admin/:id", db.updateAdmin);

// provider
app.post("/provider", db.createProvider);
app.get("/provider", db.getProvider);
app.get("/not_active_provider", db.getNotAcceptedProvider);
app.get("/provider_count", db.getProvidercount);
app.get("/provider/:id", db.getProviderById);
app.put("/delete_provider/:id", db.deleteProvider);
app.put("/accept_provider/:id", db.acceptProvider);
app.put("/update_provider/:id", db.updateProvider);
app.get("/carsProvider/:id", db.getCarsByIdProvider);

// cars
app.get("/cars", db.getCar);
app.get("/cars_count", db.getCarscount);
app.get("/rented_Carscount", db.getRentedCarscount);

app.get("/cars/:id", db.getCarsById);
app.post("/cars", db.createCar);
app.put("/delete_car/:id", db.deleteCars);
app.put("/delete_car_Prov/:id", db.deleteCarsOfProvider);
app.put("/bookCar/:id", db.bookCar);
app.get("/not_active_car", db.getNotActiveCar);
app.put("/accept_car/:id", db.acceptCar);

app.get("/rented_cars_count", db.getRentedCarscount);
app.get("/rentedCars", db.rentedCars);
app.put("/update_car/:id", db.updateCar);
app.put("/update_car_available/:id", db.RomveUserAndUpdateCarAvailable);
app.get("/cars", db.checkCars, db.getCar);

// Sign
app.get("/checkToken", authenticateToken, (req, res) => {
  res.send(req.user);
});

app.post("/logIn_customer", db.checkCustomer, (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
  console.log("Generated token:", token);
  res.json(token);
});

app.post("/logIn_provider", db.checkProvider, (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
  console.log("Generated token:", token);
  res.json(token);
});

app.post("/logIn_admin", db.checkAdmin, (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
  console.log("Generated token:", token);
  res.json(token);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Not found" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid" });
    }

    req.user = decoded;
    next();
  });
}

app.listen(PORT);
