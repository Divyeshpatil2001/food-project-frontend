import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Card, CardContent, CardMedia, Typography, Button, Grid, Paper, Modal } from '@mui/material';
import { RemoveCircleOutline as RemoveCircleOutlineIcon, AddCircleOutline as AddCircleOutlineIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../features/cartSlice';
import Menu_CustomDish from '../../pages/menu/Menu_CustomDish';
import axiosInstance from '../../services/axiosConfig';
import useRazorpay from "react-razorpay";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddToCart() {
  const cart = useSelector(state => state.cart.items);
  const userId = useSelector(state => state.user.userDetail.id)
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [Razorpay] = useRazorpay();
   const navigate = useNavigate();

  const handleRemoveFromCart = (event, productId) => {
    event.stopPropagation();
    dispatch(removeFromCart(productId));
  };

  const handleIncrementQuantity = (event, productId) => {
    event.stopPropagation();
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (event, productId) => {
    event.stopPropagation();
    dispatch(decrementQuantity(productId));
  };

  const getTotalPrice = () => {
    const totalPrice = cart.reduce((total, product) => {
      const price = parseFloat(product.price || product.total_price);
      const quantity = parseInt(product.quantity);
      return total + (price * quantity);
    }, 0);
  
    return totalPrice;
  };
  
  const getGST = () => {
    const total = getTotalPrice();
    const gst = total * 0.05;
    
    return gst;
  };
  
  const getTotalAmount = () => {
    const total = getTotalPrice(); 
    const gst = getGST(); 
    const totalAmount = total + gst;
    
    return parseInt(totalAmount); 
  };

  const handleEdit = (productId) => {
    setShowModal(true);
    setSelectedItemId(productId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };
  const order_data = {
    total_amount : getTotalAmount(),
    items : cart.map(product => ({
      name: product.menu_name || product.title,
      quantity: product.quantity
    })),
  }



  const handleCheckout = async() => {
    // order save 
    const order_save = await axiosInstance.post('/orders/OrdersAPI/',order_data)
    // initalize payment
    const razorPayment = await axiosInstance.post('/razorpay/order/create/',{
      "amount" : getTotalAmount() * 100,
      "currency" : "INR"
    })

    // // compelete order
    const compelete_order = async (payment_id,order_id,signature,) => {
      const response = await axiosInstance.post('razorpay/order/complete/',{
        "payment_id" : payment_id,
        "order_id" : order_id,
        "signature" : signature,
        "amount" : getTotalAmount(order_id) * 100,
      })
      navigate('/order');
    } 


    var order_id = razorPayment.data.data.id
    const options = {
      key: "rzp_test_mK8OLxdgPMsqTK", 
      name: "FoodCrafters",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        await compelete_order(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        )

        const updatedOrders = cart.map(product => ({
          ...product,
          payment_status: 'Completed'
        }));
      },
      prefill: {
        name: "Divyesh patil",
        email: "divyeshpatil@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    
      rzp1.open();
  }

  return (
    <Paper style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <Grid container justifyContent="center" spacing={2}>
        {cart.map((product) => (
          <Grid item xs={12} key={product.id}>
            <Card variant="outlined" style={{ height: 'auto' }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {product.product_image ? 
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        image={product.product_image}
                        style={{ borderRadius: "10px", width: "26%" }}
                        alt={product.title}
                      />
                    </Grid> : 
                    <Grid item xs={4}>
                      <Button onClick={() => handleEdit(product.id)}>Edit Dish</Button>
                    </Grid>
                  }
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.menu_name || product.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={(event) => handleDecrementQuantity(event, product.id)} disabled={product.quantity === 1}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <Typography variant="body1" style={{ margin: '0 10px' }}>
                        {product.quantity}
                      </Typography>
                      <IconButton onClick={(event) => handleIncrementQuantity(event, product.id)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                      {console.log("Price:", product.price)}
                      {console.log("Quantity:", product.quantity)}
                      {console.log("Total Price:", product.total_price)}
                      <Typography variant="body1">
                        {`₹${product.total_price * product.quantity || (product.price * product.quantity)}`}
                      </Typography>
                      <IconButton onClick={(event) => handleRemoveFromCart(event, product.id)} style={{ marginLeft: 'auto', marginTop: '-10px' }}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {cart.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.primary">
              Your cart is empty.
            </Typography>
          </Grid>
        ) :
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Bill Details</Typography>
              <Typography variant="subtitle1">Total Price: ₹{getTotalPrice()}</Typography>
              <Typography variant="subtitle1">GST (5%): ₹{getGST()}</Typography>
              <Typography variant="subtitle1">Total Amount (incl. GST): ₹{getTotalAmount()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCartIcon />}
                fullWidth
                style={{ marginTop: '20px' }}
                onClick={handleCheckout}
              >
                Checkout - Total: ₹{getTotalAmount()}
              </Button>
            </Grid>
          </>
        }
      </Grid>
      <div>
        <Modal open={showModal} onClose={handleCloseModal}>
          <>
            <Menu_CustomDish selectedItemId={selectedItemId} onCloseModal={handleCloseModal} />
          </>
        </Modal>
      </div>
    </Paper>
  );
}

export default AddToCart;