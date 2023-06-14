/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { MDBInput } from "mdb-react-ui-kit";
import { Button as BootstrapButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function ProfilePage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState({});
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [password, setpassword] = useState();
  const [carsDataAvailable, setCarsDataAvailable] = useState([]);
  const [carsDataRented, setCarsDataRented] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user?.role == "user") {
      axios
        .put(`http://localhost:5000/update_user/${user.customers_id}`, {
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
        })
        .then((response) => {
          setShow(false);
        });
    } else if (user?.role == "provider") {
      axios
        .put(`http://localhost:5000/update_provider/${user.provider_id}`, {
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
        })
        .then((response) => {
          setShow(false);
        });
    }
  };

  const getCars = async () => {
    const token = localStorage.getItem("token") || "";
    let userToken;

    try {
      const resToken = await axios.get("http://localhost:5000/checkToken", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      userToken = resToken.data;
      setUser(resToken.data);

      try {
        const res = await axios.post(
          `http://localhost:5000/Pre_rented_cars/${resToken.data.customers_id}`
        );

        const Rented = res.data?.filter((car) => car.available);

        const Available = res.data?.filter((car) => !car.available);

        setCarsDataAvailable(Available);
        setCarsDataRented(Rented);

      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const dateFormat = (dateFromDatabase) => {

    let date = new Date(dateFromDatabase);

    let monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let day = date.getUTCDate();
    let monthIndex = date.getUTCMonth();
    let year = date.getUTCFullYear();

    let formattedDate = day + " " + monthNames[monthIndex] + " " + year;

    return formattedDate;  // Output: "10 Jun 2023"
  }
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="text-center">
        <h1 className="fw-bold" style={{ color: "#000d6b" }}>
          Welcome to QuickRide
        </h1>
      </div>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <img
              style={{ height: "35rem" }}
              src="https://images.pexels.com/photos/1519192/pexels-photo-1519192.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </MDBCol>
          <MDBCol lg="8">
            <MDBCol lg="12">
              <MDBCard className="mb-4">
                <MDBCardBody style={{ padding: "7rem" }}>
                  <form>
                    <MDBRow className="mb-4">
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          onChange={(event) => setname(event.target.value)}
                          type="text"
                          className="text"
                          value={user?.username}
                          readOnly
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow className="mb-4">
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          onChange={(event) => setemail(event.target.value)}
                          type="email"
                          className="text"
                          value={user?.email}
                          readOnly
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow className="mb-4">
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          onChange={(event) => setphone(event.target.value)}
                          type="text"
                          className="text"
                          value={user?.phone}
                          readOnly
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow className="mb-4">
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          onChange={(event) => address(event.target.value)}
                          type="text"
                          className="text"
                          value={user?.address}
                          readOnly
                        />
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-end">
                      <BootstrapButton
                        variant="success"
                        className="btn-floating"
                        onClick={handleShow}
                        style={{
                          backgroundColor: "#000D6B",
                          border: "1px solid #000D6B",
                        }}
                      >
                        <FontAwesomeIcon icon={faUserEdit} />
                      </BootstrapButton>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add A New Information </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="email"
                              onChange={(event) => setname(event.target.value)}
                              placeholder="Johnatan Smith"
                              autoFocus
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="name@example.com"
                              autoFocus
                              onChange={(event) => setemail(event.target.value)}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="Password"
                              placeholder="*********"
                              autoFocus
                              onChange={(event) =>
                                setpassword(event.target.value)
                              }
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              placeholder="0799999999"
                              autoFocus
                              onChange={(event) => setphone(event.target.value)}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Zarqa , Jordan"
                              autoFocus
                              onChange={(event) =>
                                setaddress(event.target.value)
                              }
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          style={{
                            backgroundColor: "#000D6B",
                            border: "1px solid #000D6B",
                          }}
                        >
                          Update
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBCol>
        </MDBRow>

        <div className="row d-flex justify-content-around">
          {carsDataRented.length >= 1 ? (
            <h1
              className="row d-flex justify-content-center fw-bold mb-4"
              style={{ color: "#000d6b" }}
            >
              Previously rented cars
            </h1>
          ) : (
            <></>
          )}
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {carsDataRented?.map((car, index) => (
              <div key={index}>
                <div className="car__item" style={{ backgroundColor: "white" }}>
                  <div className="car__img">
                    <img src={car.images_data} alt="" className="w-100" />
                  </div>

                  <div className="car__item-content mt-4">
                    <h4 className="section__title text-center">{car.model}</h4>
                    <h6 className="rent__price text-center mt-">
                      ${car.rental_price}.00 <span>/ Day</span>
                    </h6>

                    <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                      <span className="d-flex align-items-center gap-1">
                        <i className="ri-car-line"></i> {car.type}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <i className="ri-settings-2-line"></i> {car.energy_type}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="ri-calendar-line"
                          style={{ color: "#f9a826" }}
                        ></i>
                        {car.year}
                      </span>
                    </div>
                    <Link to={`/Checkout/${car.cars_id}`}>
                      <button className="w-50 car__item-btn car__btn-rent">
                        Rent it again
                      </button>
                    </Link>
                    <Link to={`/cars/${car.cars_id}`}>
                      <button className="w-50 car__item-btn car__btn-details">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {carsDataAvailable.length >= 1 ? (
            <h1
              className="row d-flex justify-content-center fw-bold mb-4"
              style={{ color: "#000d6b" }}
            >
              Your rented cars
            </h1>
          ) : (
            <></>
          )}

          <div className="d-flex flex-row flex-wrap justify-content-center">
            {carsDataAvailable?.map((car, index) => (
              <div key={index}>
                <div className="car__item" style={{ backgroundColor: "white" }}>
                  <div className="car__img">
                    <img src={car.images_data} alt="" className="w-100" />
                  </div>

                  <div className="car__item-content mt-4">
                    <h4 className="section__title text-center">{car.model}</h4>
                    <h6 className="rent__price text-center mt-">
                      ${car.rental_price}.00 <span>/ Day</span>
                    </h6>

                    <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                      <span className="d-flex align-items-center gap-1">
                        <i className="ri-car-line"></i> {car.type}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <i className="ri-settings-2-line"></i> {car.energy_type}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="ri-calendar-line"
                          style={{ color: "#f9a826" }}
                        ></i>
                        {car.year}
                      </span>
                    </div>

                    <div className="flex justify-content-between">
                      <div>
                        <div>Form :</div>
                        <span className="d-flex align-items-center gap-1">
                          <i
                            className="ri-calendar-line"
                            style={{ color: "#f9a826" }}
                          ></i>
                          {dateFormat(car.start_date)}
                        </span>
                      </div>
                      <div>
                        <div>To :</div>
                        <span className="d-flex align-items-center gap-1">
                          <i
                            className="ri-calendar-line"
                            style={{ color: "#f9a826" }}
                          ></i>
                          {dateFormat(car.end_date)}
                        </span>
                      </div>
                    </div>
                    <Link to={`/cars/${car.cars_id}`}>
                      <button className="w-100 car__item-btn car__btn-details">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MDBContainer>
    </section>
  );
}
