import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import {
  Rating,
  Paper,
  IconButton,
  Container,
  Box,
  Button,
} from "@mui/material";
import {
  ArrowBackIosNew as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { addToCart, incrementQuantity } from "../../features/cartSlice"; // Import addToCart action from cartSlice

function Menu_ProductDesc() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axiosInstance.get(
          `/products/ProductAPI/${productId}`
        );
        setProduct(productResponse.data);

        const productImagesResponse = await axiosInstance.get(
          `/products/ProductImagesAPI/?product=${productId}`
        );
        const mainImageUrl = productResponse.data.product_image.startsWith(
          "http"
        )
          ? productResponse.data.product_image
          : `https://food-project-backend-1.onrender.com${productResponse.data.product_image}`;
        const images = [
          mainImageUrl,
          ...productImagesResponse.data.map((image) => {
            const imageUrl = `https://food-project-backend-1.onrender.com${image.multiple_images}`;
            return imageUrl;
          }),
        ];
        setProductImages(images);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [productId]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      dispatch(incrementQuantity(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "40px" }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <div
          style={{
            flex: 1,
            marginRight: { xs: "0", sm: "20px" },
            marginBottom: { xs: "20px", sm: "0" },
          }}
        >
          {productImages.length > 0 && (
            <div style={{ position: "relative", marginBottom: "20px" }}>
              <IconButton
                onClick={prevImage}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <img
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
                src={productImages[currentImageIndex]}
                alt={`Product ${product.title}`}
              />
              <IconButton
                onClick={nextImage}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          )}
        </div>
        <div style={{ flex: 1, textAlign: "left", paddingLeft: "55px" }}>
          <h2
            style={{
              margin: "5px 0",
              fontWeight: 100,
              fontFamily: "ProximaNova-Regular, Helvetica, Arial, sans-serif",
              lineHeight: 1.3,
              fontSize: "30px",
              color: "#373737",
              position: "relative",
              display: "inline",
            }}
          >
            {product.title}
          </h2>
          <p style={{ marginBottom: "10px", fontSize: "20px" }}>
            ₹ {product.price}
          </p>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <div>
            <Rating name="read-only" value={product.rating} readOnly />
          </div>
          <div
            style={{
              fontSize: "18px",
              lineHeight: 1.56,
              color: "#373737",
              marginTop: "30px",
            }}
          >
            DETAILS ABOUT THIS MEAL
          </div>
          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.67,
              color: "#4a4a4a",
              fontFamily: "ProximaNova-Regular, Helvetica, Arial, sans-serif",
            }}
          >
            {product.description}
          </div>
          <div>
            <div
              style={{
                fontFamily: "ProximaNova-Regular, Helvetica, Arial, sans-serif",
                fontSize: "18px",
                lineHeight: 1.56,
                color: "#373737",
                marginTop: "50px",
              }}
            >
              INGREDIENTS
            </div>
            {/* <div>

                        </div> */}
          </div>
        </div>
      </Box>
      <hr
        style={{
          border: "1px solid #e0e0e0",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
    </Container>
  );
}

export default Menu_ProductDesc;
