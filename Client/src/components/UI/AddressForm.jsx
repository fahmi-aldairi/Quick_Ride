/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { indigo } from "@mui/material/colors";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AddressForm({ handleNext, setDate }) {
  const [formDate, setFormDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [formErrors, setFormErrors] = useState({
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    setDate({
      startDate: formDate.startDate,
      endDate: formDate.endDate,
    });
  }, [formDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      setFormDate((prevFormDate) => ({
        ...prevFormDate,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed to the next step or perform other actions
      handleNext();
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    const today = new Date();
    const startDate = new Date(formDate.startDate);

    const selectedEndDate = new Date(formDate.endDate);

    const MySwal = withReactContent(Swal);

    // Validate startDate
    if (!formDate.startDate.trim()) {
      errors.startDate = "start Date is required";
      isValid = false;
    } else if (startDate < today) {
      errors.startDate = "YOU CAN START RESERVING FROM TOMORROW";
      isValid = false;
      MySwal.fire({
        title: <strong>Invalid Date!</strong>,
        // text: errors.startDate,
        icon: "error",
      });
    }

    // Validate endDate
    if (!formDate.endDate.trim()) {
      errors.endDate = "end Date code is required";
      isValid = false;
    } else if (selectedEndDate < today) {
      errors.endDate = "YOU CAN START RESERVING FROM TOMORROW";
      isValid = false;

      MySwal.fire({
        title: <strong>Invalid Date!</strong>,
        // text: errors.endDate,
        icon: "error",
      });
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <React.Fragment>
      {/* <Typography variant="h6" color={indigo[900]} gutterBottom>
                Your Information
            </Typography> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color={indigo[100]} gutterBottom>
              Start Date
            </Typography>
            <TextField
              required
              id="startDate"
              name="startDate"
              type="date"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={formDate.startDate}
              onChange={handleChange}
              error={!!formErrors.startDate}
              helperText={formErrors.startDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color={indigo[100]} gutterBottom>
              End Date
            </Typography>
            <TextField
              id="endDate"
              name="endDate"
              type="date"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={formDate.endDate}
              onChange={handleChange}
              error={!!formErrors.endDate}
              helperText={formErrors.endDate}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
