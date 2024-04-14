import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import pastanew from "./pastanew.jpg";
import dalfood from "./dalfood.jpg";
import pasta from "./pasta.jpg";
import tandori from "./tandori.jpg";

export default function Cards() {
  const images = [pastanew, tandori, dalfood, pasta];

  return (
    <Grid container spacing={2} justifyContent="center">
      {[
        {
          title: "OUR MISSION",
          content:
            "We, at Food On Way, stand for providing a high Quality, Value for money, healthy & nutritious meal to our patrons. We take great pride in saying with conviction that we do not use any artificial colours or preservatives. We use natural and fresh ingredients like lemon, salt, sugar and tomatoes and other spices to do the job of artificial colours and preservatives!",
        },
        {
          title: "Cooking with Love and Care",
          content:
            "In the realm of gastronomy, there's an undeniable truth: food prepared with love and care transcends mere sustenance—it becomes a soulful experience. At Food On Way, we wholeheartedly embrace this sentiment. Inspired by studies highlighted in the University Herald (June 29, 2022) suggesting that food imbued with love and effort is perceived to taste better, we infuse each dish with a generous helping of affection. Our kitchen is meticulously designed to foster a positive environment, where our dedicated staff can cook with passion and relish the joy of creation. Every meal that leaves our kitchen is a testament to our unwavering commitment to cooking with love and care.",
        },
        {
          title: "Safety First",
          content:
            "At Food On Way, safety isn't just a priority; it's a fundamental principle that underpins everything we do. From conducting regular health checks for our team to selecting high-quality materials for food packaging, we leave no stone unturned in ensuring the well-being of our patrons. Our staff members are equipped with hairnets, aprons, and gloves, maintaining impeccable standards of hygiene and safety at all times. Your trust in us is paramount, and we strive to uphold it through unwavering dedication to safety standards.",
        },
        {
          title: "Efficient Delivery, Every Time",
          content:
            "In a fast-paced world, we understand the importance of prompt service. Our commitment to efficiency extends beyond the kitchen to our delivery service. With a focus on freshness and quality, our diligent staff endeavors to prepare each meal swiftly, using only the finest ingredients. Moreover, we offer contactless delivery, providing added peace of mind to our patrons. When you choose Food On Way, expect not just delicious meals but also seamless and efficient service, every time.",
        },
      ].map((card, index) => (
        <Grid item xs={12} key={index} sx={{marginTop:"45px"}}>
          <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {card.title}
              </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: '20px',
              border: "1px solid #ccc",
              borderRadius: 8,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <img
              src={images[index]}
              alt={card.title}
              style={{ width: "25%", borderRadius: "8px" }}
            />
            <Box sx={{ width: "55%" }}>
              
              <Typography variant="body2" color="text.primary" sx={{ textAlign: "left",fontSize:"20px" }}>
                {card.content}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
