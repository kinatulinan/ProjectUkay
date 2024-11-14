import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Button, Link } from '@mui/material';
import './App.css';
import zara from './assets/zara1.png';

export default function ProductDetailsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from backend on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/sell/get');
        setProducts(response.data);
        setSelectedProduct(response.data[0]); // Set the first product as selected by default
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-details-page" style={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Main Product Image */}
        <Grid item xs={7}>
          <Box
            component="img"
            src={zara} // Replace with your main product image path
            alt={selectedProduct?.sellProductName || 'Product Image'}
            sx={{ width: '501px', height: '752px' }}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={5}>
          <Box sx={{ border: '1px solid black', padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedProduct?.sellProductName || 'Product Name'}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedProduct?.sellProductPrice || '0.00'} PHP
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedProduct?.sellProductType || 'Product Type'}  
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.5 }}>
              Regular fit jacket made of shiny leather-effect fabric with a contrasting faux fur interior. Lapel collar and long sleeves. Welt pockets at the hip. Inside pocket detail. Zip-up front.
            </Typography>
            
            
            <Box sx={{ borderTop: '1px solid black', borderBottom: '1px solid black', py: 2, mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                BLACK | 3548/705
              </Typography>

              {/* Size Options */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 1 }}>
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <Button key={size} variant="contained" sx={{ fontWeight: 'bold' , color: 'black', backgroundColor: 'white', borderRadius: '30px', '&:hover': {                 
                    backgroundColor: 'black',
                    color: 'white',
                  },}}>
                    {size}
                  </Button>
                ))}
              </Box>
              
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%', fontWeight: 'bold' , color: 'black', backgroundColor: 'white', borderRadius: '30px', '&:hover': {                 
      backgroundColor: 'black',
      color: 'white',
    },}}
              onClick={() => onAddToCart(selectedProduct)}
            >
              ADD TO CART
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
