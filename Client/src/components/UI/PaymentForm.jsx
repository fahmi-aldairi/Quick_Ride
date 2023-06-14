/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { indigo } from "@mui/material/colors";

export default function PaymentForm({ handleNext, setCridetCard }) {
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expDate, setExpDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setCridetCard({
      cardName: cardName,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
    });
  }, [cardName, cardNumber, expDate, cvv]);

  const handleCardNameChange = (event) => {
    setCardName(event.target.value.toUpperCase());
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpDateChange = (event) => {
    setExpDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    const today = new Date();
    const currentYear = today.getFullYear();
    const MySwal = withReactContent(Swal);

    // Validate cardName
    if (cardName.trim() === "") {
      errors.cardName = "Card name is required";
    }

    // Validate cardNumber
    if (!/^\d{14}$/.test(cardNumber)) {
      errors.cardNumber = "Card number must be 14 digits";
    }

    // Validate expDate
    if (!/^\d{2}\/\d{2}$/.test(expDate)) {
      errors.expDate = "Expiry date must be in the format MM/YY";
      isValid = false;
    } else {
      const [month, year] = expDate.split("/");
      const enteredYear = parseInt(year, 10) + 2000; // Assuming years are in the format YY (e.g., 22 for 2022)

      if (enteredYear < currentYear) {
        errors.expDate = "The year you entered has already passed !";
        isValid = false;

        MySwal.fire({
          title: <strong>Expiry Date !</strong>,
          // text: errors.expDate,
          icon: "error",
        });
      }
    }

    // Validate cvv
    if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = "CVV must be 3 digits";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      handleNext();
    } else {
      setErrors(errors);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom color={indigo[100]} align="center">
        Payment method
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              value={cardName}
              onChange={handleCardNameChange}
              error={!!errors.cardName}
              helperText={errors.cardName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              value={cardNumber}
              onChange={handleCardNumberChange}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              // type='date'
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={expDate}
              onChange={handleExpDateChange}
              error={!!errors.expDate}
              helperText={errors.expDate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              value={cvv}
              onChange={handleCvvChange}
              error={!!errors.cvv}
              // helperText={errors.cvv}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
          Next
        </Button>
      </form>
    </React.Fragment>
  );
}
