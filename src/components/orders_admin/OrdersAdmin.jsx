import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import axiosInstance from '../../services/axiosConfig';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';


const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders/OrdersAPI/');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

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
  ];


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/orders/OrdersAPI/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      console.log("Delete successful");
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const actionColumn = [
    {
      field: "remove",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

 

  const getRowId = (row) => row.order_id;

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 6 }}>
          <Navbar />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div style={{ width: '100%' }}>
              <h1>Orders</h1><br /><hr />
              <DataGrid
                rows={orders}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                checkboxSelection={true}
                getRowId={getRowId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersAdmin;
