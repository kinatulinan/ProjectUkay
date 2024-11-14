import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import './App.css';
import zara from './assets/zara1.png';
import model from './assets/model.png';
import model1 from './assets/model1.png';
import model2 from './assets/model2.png';
import model3 from './assets/model3.png';

export default function ProductDetailsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryImages = [model1, model2, model3, model]; // Array of images for the gallery

  // Fetch products from backend on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/sell/get");
        setProducts(response.data); // Set all products to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  // Handle Update Product
  const handleUpdateProduct = async (product) => {
    if (!product.sellId) {
      console.error("Product ID missing for update.");
      return;
    }

    try {
      const updatedProduct = {
        ...product,
        sellProductName: product.sellProductName + " (Updated)",
      };

      const response = await axios.put(
        `http://localhost:8080/api/sell/update/${product.sellId}`,
        updatedProduct
      );
      setProducts(products.map((p) => (p.sellId === product.sellId ? response.data : p)));
      console.log("Product updated:", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (product) => {
    if (!product.sellId) {
      console.error("Product ID missing for deletion.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/sell/delete/${product.sellId}`);
      setProducts(products.filter((p) => p.sellId !== product.sellId)); // Filter out the deleted product
      console.log("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle scrolling in the image container
  const handleScroll = (event) => {
    const scrollPosition = event.target.scrollTop;
    const imageIndex = Math.min(
      galleryImages.length - 0.5,
      Math.floor(scrollPosition / 10) // Adjust 100 for sensitivity if needed
    );
    setCurrentImageIndex(imageIndex);
  };

  return (
    <div className="product-details-page" style={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} container spacing={2} key={product.sellId}>
            <Grid item xs={4}>
              <Stack direction="row" spacing={2} alignItems="center">
                {/* Main Image */}
                <Box
                  sx={{
                    width: '100%',
                    height: '310px',
                    overflowY: 'scroll',
                    border: '1px solid lightgray',
                  }}
                  onScroll={handleScroll}
                >
                  <Box
                    component="img"
                    src={galleryImages[currentImageIndex]}
                    alt={product.sellProductName || 'Product Image'}
                    sx={{ width: '100%', height: 'auto' }}
                  />
                </Box>

                {/* Gallery Thumbnails on the right */}
                <Stack direction="column" spacing={1} sx={{ width: '30%' }}>
                  {galleryImages.map((imgSrc, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={imgSrc}
                      alt="Gallery Thumbnail"
                      sx={{
                        width: '80px',
                        height: 'auto',
                        border: index === currentImageIndex ? '2px solid black' : '1px solid gray',
                        cursor: 'pointer',
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* Right Column - Product Details */}
            <Grid item xs={8}>
              <Box sx={{ padding: 2, border: '1px solid black' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 , fontFamily: 'Neue-Helvetica, Helvetica, Arial',
    textAlign: 'justify', marginLeft: '50px'}}>
                  {product.sellProductName || 'Product Name'}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 , fontFamily: 'Neue-Helvetica, Helvetica, Arial',
    textAlign: 'justify', marginLeft: '50px'}}>
                  {product.sellProductType || 'Product Type'}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 , fontFamily: 'Neue-Helvetica, Helvetica, Arial',
    textAlign: 'justify', marginLeft: '50px'}}>
                  {product.sellProductPrice || '6,595.00'} PHP
                </Typography>
                
                <Typography sx={{ fontSize: '14px', mb: 2, fontFamily: 'Neue-Helvetica, Helvetica, Arial',
    textAlign: 'justify', marginLeft: '50px'}}>
                  Model height: 186 cm | Size: L
                </Typography>
                <Typography
  variant="body2"
  sx={{
    mb: 2,
    lineHeight: 1.5,
    fontFamily: 'Neue-Helvetica, Helvetica, Arial',
    marginLeft: '50px',
    textAlign: 'justify',
    width: '350px',
    
  }}
>
  Cropped fit jacket made of leather effect fabric with a contrast faux fur interior. Lapel collar
  and long sleeves. Welt pockets at the hip. Inside pocket detail. Zip-up front.
</Typography>


                <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <Grid item key={size}>
                      <Button
                        variant="contained"
                        sx={{
                          width: '50px',
                          height: '50px',
                          color: 'black',
                          backgroundColor: 'white',
                          borderRadius: '0',
                          '&:hover': {
                            backgroundColor: 'black',
                            color: 'white',
                          },
                        }}
                      >
                        {size}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '30%',
                    fontWeight: 'bold',
                    color: 'black',
                    backgroundColor: 'white',
                    borderRadius: '30px',
                    marginRight: '10px',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                  }}
                  onClick={() => onAddToCart(product)}
                >
                  ADD TO CART
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '30%',
                    fontWeight: 'bold',
                    color: 'black',
                    marginTop: '5px',
                    marginRight: 'px',
                    backgroundColor: 'white',
                    borderRadius: '30px',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                  }}
                  onClick={() => handleUpdateProduct(product)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '30%',
                    fontWeight: 'bold',
                    color: 'black',
                    marginTop: '5px',
                    backgroundColor: 'white',
                    borderRadius: '30px',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                  }}
                  onClick={() => handleDeleteProduct(product)}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
