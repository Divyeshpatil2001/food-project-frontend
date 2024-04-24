import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { loginUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { logout } from '../../features/userSlice';
import axiosInstance from '../../services/axiosConfig';

const DataTable = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');
  

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await axiosInstance.get('/accounts/RegisterUserAPI/');
        console.log("data recievibg")
        setData(response.data);
      } catch(error) {
        console.log("error in fetching users",error.message)
      }   
    }
    fetchData()
  },[access_token])


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/accounts/RegisterUserAPI/${id}`);
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

  const UserColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "Address1", headerName: "City", width: 200 },
    { field: "pincode", headerName: "Pincode", width: 120 },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="newuser" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={UserColumns.concat(actionColumn)}
        pageSize={3}
        rowsPerPageOptions={[3]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
