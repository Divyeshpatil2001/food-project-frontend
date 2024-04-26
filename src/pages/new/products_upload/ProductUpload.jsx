import React, { useState } from 'react';
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useDispatch } from "react-redux";
import axiosInstance from '../../../services/axiosConfig';
import "./productupload.scss";

const ProductUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    recommended: "",
    rating: "",
    quantity: "",
    categories: "",
    // Add other fields as needed
  });

  const handleInputChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", inputs.name);
      formData.append("description", inputs.description);
      formData.append("price", inputs.price);
      formData.append("recommended", inputs.recommended);
      formData.append("rating", inputs.rating);
      formData.append("quantity", inputs.quantity);
      formData.append("categories", inputs.categories);
      // Append other fields to formData

      const response = await axiosInstance.post('/products/ProductAPI/', formData);
      console.log(response.data);
      setMessage("Product added successfully!");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
      console.error('Error adding product:', error);
      setMessage("Failed to add product");
    }
  };

  return (
    <div className="productUpload">
      <Sidebar />
      <div className="productUploadContainer">
        <Navbar />
        <div className="top">
          <h1>Add Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div
              className="imagePreview drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {file && <img src={URL.createObjectURL(file)} alt="" />}
              {!file && <div className="placeholder">Drop Image or Click to Upload</div>}
            </div>
            <div className="fileInput">
              <label htmlFor="file">
                <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <CustomInput
                label="Name"
                value={inputs.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={errors.name && errors.name[0]}
              />
              <CustomInput
                label="Description"
                value={inputs.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                error={errors.description && errors.description[0]}
              />
              <CustomInput
                label="Price"
                value={inputs.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                error={errors.price && errors.price[0]}
              />
              <CustomInput
                label="Recommended"
                value={inputs.recommended}
                onChange={(e) => handleInputChange("recommended", e.target.value)}
                error={errors.recommended && errors.recommended[0]}
              />
              <CustomInput
                label="Rating"
                value={inputs.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                error={errors.rating && errors.rating[0]}
              />
              <CustomInput
                label="Quantity"
                value={inputs.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                error={errors.quantity && errors.quantity[0]}
              />
              <CustomInput
                label="Categories"
                value={inputs.categories}
                onChange={(e) => handleInputChange("categories", e.target.value)}
                error={errors.categories && errors.categories[0]}
              />
              <button type="submit">Add Product</button>
              {message && <div className="message">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomInput = ({ label, value, onChange, error }) => {
  return (
    <div className="customInput">
      <label>{label}:</label>
      <div contentEditable={true} className={`inputField ${error ? 'error' : ''}`} onInput={(e) => onChange(e)}>
        {value}
      </div>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
};

export default ProductUpload;
