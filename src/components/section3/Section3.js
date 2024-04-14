import React from "react";
import { Grid, Typography } from "@mui/material";
import newsalad from "./newsalad.jpg"; 

const Section3 = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ py: 4 }}>
      <Grid item xs={12}  sx={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold",marginTop:"15px"}}>
          Welcome to FoodCrafters
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: "0 20px", marginTop: "32px" }}>
        <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 2 }, textAlign: "left" }}>
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
          <Typography variant="h6" fontSize={'20px'} paragraph>
            Whether you're looking for a quick lunch, a hearty dinner, or catering for a special event, FoodCrafters has you covered. Our platform is designed to make online food ordering a seamless and enjoyable experience, allowing you to create your own customized dishes and enjoy the comforts of home-cooked food, hassle-free.
          </Typography>
        </Grid>
      <Grid item xs={6} sx={{  textAlign: "left" }}>
        <img src={newsalad} alt="Frankie Delight" style={{ maxWidth: "85%", height: "auto", borderRadius: "15%",marginLeft:"70px" }} />
      </Grid>
    </Grid>
  </Grid>
)
  }
export default Section3
