import React from 'react'
import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ProductsItemTable from './ProductsItemTable';

function ProductsItem() {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductsItemTable />
      </div>
    </div>
  )
}

export default ProductsItem