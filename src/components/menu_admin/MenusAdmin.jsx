import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import axiosInstance from '../../services/axiosConfig';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';

const MenusAdmin = () => {
  const [menus, setMenus] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axiosInstance.get('/products/menuAPI/');
        setMenus(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/menuAPI/${id}`);
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'total_price', headerName: 'Total Price', width: 150 },
    { field: 'menu_name', headerName: 'Menu Name', width: 200 },
    { field: 'menu_desc', headerName: 'Menu Description', width: 300 },
    { field: 'availablity', headerName: 'Availability', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 120 },
  ];

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 6 }}>
          <Navbar />
          <div style={{ display: 'flex', justifyContent: 'left', marginTop: '20px' }}>
            <div style={{ width: '100%' }}>
              <h1>Menu</h1><br /><hr />
              <DataGrid
                rows={menus}
                columns={columns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                checkboxSelection={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenusAdmin;
