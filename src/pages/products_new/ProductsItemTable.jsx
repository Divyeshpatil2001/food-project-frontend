import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { DataGrid } from '@mui/x-data-grid';

function OrdersAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders when component mounts
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders/OrdersAPI/');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

    // Clean up function to cancel any pending requests
    return () => {
      // Your cleanup logic here if needed
    };
  }, []); // Empty dependency array means it will only run once on component mount

  const columns = [
    { field: 'order_id', headerName: 'Order ID', width: 200 },
    { field: 'created_at', headerName: 'Created At', width: 200 },
    { field: 'items', headerName: 'Items', width: 300,
      renderCell: ({ value }) => (
        <ul>
          {value.map((item, index) => (
            <li key={index}>{item.name} - {item.quantity}</li>
          ))}
        </ul>
      )
    },
    { field: 'total_amount', headerName: 'Total Amount', width: 150 },
    { field: 'payment_status', headerName: 'Payment Status', width: 150 },
    { field: 'user', headerName: 'User ID', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: ({ row }) => (
        <div>
          {/* Replace the buttons with your actual actions */}
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    // Add your edit logic here
    console.log("Edit order:", row.order_id);
  };

  const handleDelete = (row) => {
    // Add your delete logic here
    console.log("Delete order:", row.order_id);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Orders</h1>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
}

export default OrdersAdmin;
