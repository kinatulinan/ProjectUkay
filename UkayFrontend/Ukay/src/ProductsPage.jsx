import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Button, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './App.css';
import zara from './assets/zara1.png';
import model from './assets/model.png';
import model1 from './assets/model1.png';
import model2 from './assets/model2.png';
import model3 from './assets/model3.png';

export default function ProductDetailsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const galleryImages = [model1, model2, model3, model];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/sell/get");
        setProducts(response.data.reverse());
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
  const handleDeleteProduct = async () => {
    if (!productToDelete) {
      console.error("Product not selected for deletion.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/sell/delete/${productToDelete.sellId}`);
      setProducts(products.filter((p) => p.sellId !== productToDelete.sellId)); // Filter out the deleted product
      console.log("Product deleted");
      setOpenDeleteDialog(false); // Close the dialog after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);  // Close dialog without deleting
    setProductToDelete(null);  // Reset the product to delete
  };

  const handleDeleteDialogOpen = (product) => {
    setProductToDelete(product);  // Set the product to delete
    setOpenDeleteDialog(true);  // Open the confirmation dialog
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
    <div className="product-details-page" style={{ padding: '20px', marginTop: '35px' }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} container spacing={2} key={product.sellId}>
            <Grid item xs={4}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: '100%',
                    height: '310px',
                    overflowY: 'scroll',
                    border: '1px solid lightgray',
                  }}
                >
                  <Box
                    component="img"
                    src={galleryImages[currentImageIndex]}
                    alt={product.sellProductName || 'Product Image'}
                    sx={{ width: '100%', height: 'auto' }}
                  />
                </Box>

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

            <Grid item xs={8}>
              <Box sx={{ padding: 2, border: '1px solid black' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    fontFamily: 'Neue-Helvetica, Helvetica, Arial',
                    textAlign: 'justify',
                    marginLeft: '50px',
                  }}
                >
                  {product.sellProductName || 'Product Name'}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontFamily: 'Neue-Helvetica, Helvetica, Arial',
                    textAlign: 'justify',
                    marginLeft: '50px',
                  }}
                >
                  {product.sellProductType || 'Product Type'}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontFamily: 'Neue-Helvetica, Helvetica, Arial',
                    textAlign: 'justify',
                    marginLeft: '50px',
                  }}
                >
                  {product.sellProductPrice || '6,595.00'} PHP
                </Typography>

                <Typography
                  sx={{
                    fontSize: '14px',
                    mb: 2,
                    fontFamily: 'Neue-Helvetica, Helvetica, Arial',
                    textAlign: 'justify',
                    marginLeft: '50px',
                  }}
                >
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
                  Cropped fit jacket made of leather effect fabric with a contrast faux fur interior. Lapel collar and long sleeves. Welt pockets at the hip. Inside pocket detail. Zip-up front.
                </Typography>

                <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <Grid item key={size}>
                      <Button
                        variant="contained"
                        sx={{
                          width: '50px',
                          height: '50px',
                          color: '#0D0F1F',
                          backgroundColor: 'white',
                          borderRadius: '0',
                          '&:hover': {
                            backgroundColor: '#0D0F1F',
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
                    '&:focus': { outline: 'none' },
                    width: '30%',
                    fontWeight: 'bold',
                    color: '#0D0F1F',
                    backgroundColor: 'white',
                    borderRadius: '30px',
                    marginRight: '10px',
                    '&:hover': {
                      backgroundColor: '#0D0F1F',
                      color: '#E99E00',
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
                    '&:focus': { outline: 'none' },
                    width: '30%',
                    fontWeight: 'bold',
                    color: '#0D0F1F',
                    marginTop: '5px',
                    marginRight: '10px',
                    backgroundColor: 'white',
                    borderRadius: '30px',
                    '&:hover': {
                      backgroundColor: '#0D0F1F',
                      color: '#E99E00',
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
                    '&:focus': { outline: 'none' },
                    width: '30%',
                    fontWeight: 'bold',
                    color: '#C81501',
                    marginTop: '5px',
                    backgroundColor: 'white',
                    borderRadius: '30px',
                    '&:hover': {
                      backgroundColor: '#0D0F1F',
                      color: '#C81501',
                    },
                  }}
                  onClick={() => handleDeleteDialogOpen(product)} // Open delete dialog
                >
                  DELETE
                </Button>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
      <DialogContent
        sx={{
          padding: '20px',
          textAlign: 'center',
          fontSize: '1rem',
          color: '#0D0F1F',
          backgroundColor: '#e0e0e0',
        }}
      >
        <Typography
          sx={{
            marginBottom: '10px',
            fontSize: '1rem',
            color: '#0D0F1F',
            fontWeight: 'bold',
          }}
        >
          Are you sure you want to delete this product?
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          padding: '10px',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Button
          onClick={handleDeleteDialogClose}
          color="primary"
          sx={{
            color: '#0D0F1F',
            backgroundColor: '#f5f5f5',
            borderRadius: '25px',
            padding: '5px 20px',
            '&:hover': {
              color: '#E99E00',
              backgroundColor: '#0D0F1F',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteProduct}
          color="secondary"
          sx={{
            color: '#f5f5f5',
            backgroundColor: '#C81501',
            borderRadius: '25px',
            padding: '5px 20px',
            '&:hover': {
              backgroundColor: '#0D0F1F',
              color: '#E99E00',
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}
