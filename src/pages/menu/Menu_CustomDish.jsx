import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axiosInstance from '../../services/axiosConfig';
import Select from 'react-select';
import './MenuCustomDish.scss'; 
import { useDispatch, useSelector } from 'react-redux';
import { addCustomDish, updateCustomDish } from '../../features/cartSlice'; 

function Menu_CustomDish({ selectedItemId, onCloseModal }) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const [message, setMessage] = useState('');
  
  const selectedItem = cart.find(item => item.id === selectedItemId);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/ProductAPI/');
        const formattedProducts = response.data.map((product) => ({
          value: product.id,
          label: product.title,
          price: product.price || 0 
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelection = (selectedOptions) => {
    setSelectedProducts(selectedOptions.map(option => option.value));
  };

  const calculateTotalPrice = () => {
 
  if (selectedProducts.length === 0 || products.length === 0) {
    return 0;
  }

  return selectedProducts.reduce((total, productId) => {
    const product = products.find(p => p.value === productId);
    if (product && typeof product.price === 'number') {
      const price = parseFloat(product.price);
      if (!isNaN(price)) {
        return total + price; // Add valid price to total
      }
    }
    return total;
  }, 0);
};

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const newDish = {
        menu_name: values.customDishName,
        menu_desc: values.customDishDescription,
        select_product: selectedProducts,
        availablity: true,
        rating: 5,
        quantity: values.quantity || 1
      };
  
      let response;
      if (selectedItem) {
        response = await axiosInstance.put(`/products/menuAPI/${selectedItem.id}/`, newDish);
        dispatch(updateCustomDish({ id: selectedItem.id, newData: response.data }));
        setMessage('Custom dish updated successfully.');
      } else {
        response = await axiosInstance.post('/products/menuAPI/', newDish);
        console.log(response.data)
        dispatch(addCustomDish(response.data));
        setMessage('Custom dish created successfully.');
      }
  
      const updatedDish = { ...response.data };
      
      const totalPrice = calculateTotalPrice(); 
      updatedDish.total_price = totalPrice; 
  
      setSubmitting(false);
      if (typeof onCloseModal === 'function') {
        onCloseModal();
      }
    } catch (error) {
      console.error('Error creating/updating custom dish:', error);
      setMessage('An error occurred. Please try again.')
      setSubmitting(false);
    }
  };

  return (
    <div className="menu-custom-dish-container">
      <h2>{selectedItem ? 'Edit Custom Dish' : 'Create Custom Dish'}</h2>
      <Formik
        initialValues={{
          customDishName: selectedItem ? selectedItem.menu_name : '',
          customDishDescription: selectedItem ? selectedItem.menu_desc : '',
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="menu-custom-dish-form">
            <div className="form-group">
              <label htmlFor="customDishName">Custom Dish Name:</label>
              <Field type="text" id="customDishName" name="customDishName" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="customDishDescription">Custom Dish Description:</label>
              <Field as="textarea" id="customDishDescription" name="customDishDescription" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="selectProducts">Select Products:</label>
              <Select
                id="selectProducts"
                name="selectProducts"
                options={products}
                isMulti
                onChange={handleProductSelection}
                className="select-control"
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {selectedItem ? 'Update Custom Dish' : 'Create Custom Dish'}
            </button>
            {message && <div className="message">{message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Menu_CustomDish;
