import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import axiosInstance from '../../services/axiosConfig';
import './MenuProducts.scss';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity } from '../../features/cartSlice';
import { Margin } from '@mui/icons-material';

function MenuProducts() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/ProductAPI/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (event, product) => {
    event.preventDefault(); 

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      dispatch(incrementQuantity(product.id));
    } else {
      dispatch(addToCart(product));
    }

    console.log('Adding to cart:', product);
  };

  return (
    <div className="menu-products-container">
      <h2>What's on your mind?</h2>
      <hr className='hrrow'/>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card-link">
            <Card>
              <Link to={`/menu-products/products-desc/${product.id}`} className="product-link" style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.product_image}
                  alt={product.title}
                  style={{borderRadius:"8px", objectFit: 'cover'}} 
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{product.price}
                  </Typography>
                  {product.recommended && <Typography variant="body2" color="text.secondary">Recommended</Typography>}
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={product.rating} readOnly />
                  </Box>
                </CardContent>
              </Link>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Button
                variant="contained"
                onClick={(event) => handleAddToCart(event, product)}
                sx={{margin:"auto"}}
              >
                Add to Cart
              </Button>
              </Box>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuProducts;
