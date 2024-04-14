import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Card, CardContent, CardMedia, Typography, Button, Grid, Paper, Modal } from '@mui/material';
import { RemoveCircleOutline as RemoveCircleOutlineIcon, AddCircleOutline as AddCircleOutlineIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../features/cartSlice';
import Menu_CustomDish from '../../pages/menu/Menu_CustomDish';

function AddToCart() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
    
    return totalAmount; 
  };

  const handleEdit = (productId) => {
    setShowModal(true);
    setSelectedItemId(productId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

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
