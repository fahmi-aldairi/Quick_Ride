/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../components/UI/AddressForm";
import PaymentForm from "../components/UI/PaymentForm";
import Review from "../components/UI/Review";
import { indigo } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const steps = ["Booking Time", "Payment details", "Review your order"];

const defaultTheme = createTheme();

export default function Checkout() {
  const currentDate = new Date();

  const { slug } = useParams();

  const [provider, setProvider] = React.useState();
  const [car, setCar] = React.useState();
  const [customer, setCustomer] = React.useState();

  const navigate = useNavigate(); // useNavigate hook to get access to the navigate function
  const [activeStep, setActiveStep] = React.useState(0);

  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [cridetCard, setCridetCard] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [review, setReview] = useState({
    price: 0,
    startDate: date.startDate,
    endDate: date.endDate,
  });

  const getCar = async (slug) => {
    let car_ = {};

    try {
      const response = await axios.get(`http://localhost:5000/cars/${slug}`);

      setCar(response.data[0]);
      car_ = response.data[0];
    } catch (error) {
      console.error(error);
    }
    return car_;
  };

  const getProvider = async (id_provider) => {
    let pro = {};
    try {
      const response = await axios.get(
        `http://localhost:5000/provider/${id_provider}`
      );

      setProvider(response.data);
      pro = response.data;
    } catch (error) {
      console.error(error);
    }
    return pro;
  };

  const getCustomer = async () => {
    const token = localStorage.getItem("token") || "";
    let cus = {};

    try {
      const response = await axios.get(`http://localhost:5000/checkToken`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setCustomer(response.data);
      cus = response.data;
    } catch (error) {
      console.error(error);
    }
    return cus;
  };

  const joinGetData = async () => {
    const car = await getCar(slug);
    const provider = await getProvider(car.provider_id);
    const customer = await getCustomer();
  };

  React.useEffect(() => {
    joinGetData();
  }, []);

  React.useEffect(() => {
    setReview({
      price: car?.rental_price,
      startDate: date.startDate,
      finalDate: date.endDate,
    });
  }, [date, car]);

  const bookCar = async (start_date, end_date) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/bookCar/${car.cars_id}`,
        {
          user_id: customer.customers_id,
          start_date: start_date,
          end_date: end_date,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCustomerCard = async (
    customers_id,
    cardNumber,
    cardName,
    expDate,
    cvv
  ) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/update_card/${customers_id}`,
        {
          credit_card: cardNumber,
          cardholder_name: cardName,
          card_expiration_date: expDate,
          cvv_cvc_code: cvv,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const createMovements = async (customers_id, move_type, date, car_id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/createMoveCustomer/${customers_id}`,
        {
          move_type: move_type,
          date: date,
          car_id: car_id,
          customers_id: customers_id,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await bookCar(date.startDate, date.endDate);
      await updateCustomerCard(
        customer.customers_id,
        cridetCard.cardNumber,
        cridetCard.cardName,
        cridetCard.expDate,
        cridetCard.cvv
      );
      await createMovements(
        customer.customers_id,
        "rent",
        currentDate.toDateString(),
        car.cars_id
      );
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleGoBackHome = () => {
    navigate("/"); // navigate to the home page
  };

  function getStepContent(step, handleNext) {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} setDate={setDate} />;
      case 1:
        return (
          <PaymentForm handleNext={handleNext} setCridetCard={setCridetCard} />
        );
      case 2:
        return <Review review={review} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const theme = createTheme({
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#000D6B",
            alignSelf: "flex-end",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color={indigo[900]}
          >
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                We have emailed your order confirmation.
              </Typography>
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button
                  onClick={handleGoBackHome}
                  sx={{ mt: 3, ml: 1, color: "white" }}
                >
                  Go Back Home
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, handleNext)}
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1, color: "white" }}
                  >
                    Back
                  </Button>
                )}
                {activeStep === 2 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                ) : null}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
