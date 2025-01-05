import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Divider, CardActions, Paper } from '@mui/material';
import axiosInstance from '../../services/axiosConfig';

function Order() {
  const [orders, setOrders] = useState([]);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders/OrdersAPI/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    setCancelOrderId(orderId);
    setOpenCancelDialog(true);
  };

  const cancelOrder = () => {
    const updatedOrders = orders.map(order => {
      if (order.order_id === cancelOrderId) {
        return { ...order, payment_status: 'Cancelled' }; // Update payment status locally
      }
      return order;
    });
    setOrders(updatedOrders);
    setOpenCancelDialog(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Grid container spacing={3}>
      {orders.map(order => (
        <Grid item xs={12} key={order.order_id}>
          <Paper elevation={3} style={{ padding: '15px' }}>
            <Card variant="outlined">
              <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Order ID: {order.order_id}
                    </Typography>
                    <Divider /><br />
                    <Typography variant="body2" component="p">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          <p>{item.quantity} x {item.name}</p>
                        </div>
                      ))}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" style={{ backgroundColor: '#9f9d9a', padding: '8px', borderRadius: '5px', color: '#fff' ,fontSize:"medium"}}>
                      {order.payment_status}
                    </Typography>
                  </Grid>
                </Grid><br />
                <Typography variant="subtitle2" color="textPrimary">
                  Ordered On: {formatDate(order.created_at)}
                </Typography>
                <Typography variant="h6" align="right" style={{ flexGrow: 1 }}>
                  Total Amount: {order.total_amount}
                </Typography>
                <Divider />
              </CardContent>
              <CardActions>
                {order.payment_status === 'Pending' && (
                  <Button onClick={() => handleCancelOrder(order.order_id)} color="error" variant="contained">
                    Cancel Order
                  </Button>
                )}
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      ))}
      {/* Cancel Order Confirmation Dialog */}
      <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)} color="primary">
            No, Keep Order
          </Button>
          <Button onClick={cancelOrder} color="error" variant="contained">
            Yes, Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Order;
