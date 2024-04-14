import React from "react";
import { Grid, Typography } from "@mui/material";
import pastanew from "./pastanew.jpg";
import gjthali from './gujaratithali.webp';

const Section2 = () => {
  return (
    <Grid
      container
      sx={{
        height: "75%",
        color: "white",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            textAlign: "center",
            marginTop: "20px",
            color:'black'
          }}
        >
          Elevating Your Delivery Experience with Every Bite!
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: "0 20px", marginTop: "100px" }}>
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <img src={gjthali} alt="customized image" style={{ maxWidth: "80%", height: "auto", borderRadius:"18%" }} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ color: "black", textAlign: "left" }}>
          <Typography variant="h6" fontSize={'20px'} paragraph>
            Welcome to FoodCrafters, where food is not just a meal, but an exploration of flavors and experiences! We believe in making dining an effortless and delightful journey, whether you're at home or in the office.
          </Typography>
          <Typography variant="h6" fontSize={'20px'} paragraph>
            In today's fast-paced world, convenience is key. Say goodbye to the days of rushing to a restaurant amidst a busy schedule. Our mission at FoodCrafters is to redefine convenience through online food ordering, offering a diverse array of customizable dishes that cater to your preferences, dietary needs, and budget.
          </Typography>
          <Typography variant="h6" fontSize={'20px'} paragraph>
            Amidst the challenges of the pandemic, online food ordering has emerged as a lifeline for many. With statistics showing a surge in demand, we've risen to the occasion by providing wholesome, freshly prepared meals at affordable prices.
          </Typography>
          <Typography variant="h6" fontSize={'20px'} paragraph>
            At FoodCrafters, we specialize in crafting authentic vegetarian North Indian and Chinese cuisine, meticulously prepared and delivered right to your doorstep. Our menu is designed to cater to a variety of tastes and dietary requirements, ensuring that everyone can indulge in a satisfying meal.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Section2;
