/* eslint-disable react/prop-types */
import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { indigo } from "@mui/material/colors";

export default function Review({ review }) {
  const calculateTotalPrice = () => {
    const startDate = new Date(review.startDate);
    const finalDate = new Date(review.finalDate);

    // Calculate the difference in milliseconds between the start and final dates
    const timeDiff = Math.abs(finalDate - startDate);
    // Calculate the number of days in the rental period
    const rentalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Calculate the total price by multiplying the price per day by the number of rental days
    const totalPrice = review.price * rentalDays;

    return totalPrice;
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center" color={indigo[100]}>
        Total
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Start Date: {review.startDate}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Final Date: {review.finalDate}
          </Typography>
        </ListItem>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {/* pricePerDay={pricePerDay} */}
          Total Price: {calculateTotalPrice()}
        </Typography>
      </List>
    </React.Fragment>
  );
}
