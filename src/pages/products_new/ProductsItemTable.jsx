import React from 'react'
import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { loginUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { logout } from '../../features/userSlice';
import axiosInstance from '../../services/axiosConfig';
import './productsitemtable.scss'

function ProductsItemTable() {
    const [data,setData] = useState([])
const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/products/ProductAPI/');
        console.log("product recieving")
        setData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
  fetchData()  
},[access_token])

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/ProductAPI/${id}`);
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

  const renderProductImage = (params) => {
    return <img src={params.value} alt="Product" style={{ width: "32px", height: "32px", borderRadius: "50%",paddingTop: "10px" }} />;
  };

  
  const ProductsColumns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "product_image", headerName: "PRODUCT-IMAGE", width: 120, renderCell: renderProductImage },
      { field: "title", headerName: "TITLE", width: 150 },
      { field: "recommended", headerName: "RECOMMENDED", width: 150 },
      { field: "rating", headerName: "RATING", width: 200 },
      { field: "quantity", headerName: "QUANTITY", width: 120 },
      { field: "categories", headerName: "CATEGORIES", width: 120 },
      { field: "price", headerName: "PRICE", width: 100 },
    ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="newproduct" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={ProductsColumns.concat(actionColumn)}
        pageSize={3}
        rowsPerPageOptions={[3]}
        checkboxSelection
      />
    </div>
  )
}

export default ProductsItemTable