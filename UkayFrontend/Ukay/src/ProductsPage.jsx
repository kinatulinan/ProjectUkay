import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Button, Stack, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import './App.css';
import model from './assets/model.png';
import model1 from './assets/model1.png';
import model2 from './assets/model2.png';
import model3 from './assets/model3.png';

export default function ProductDetailsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const galleryImages = [model1, model2, model3, model];

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/sell/get");
        setProducts(response.data.reverse());
        setProductCount(response.data.length); // Set the product count
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Open Update Dialog
  const handleUpdateDialogOpen = (product) => {
    setProductToUpdate(product);
    setUpdatedProduct({
      sellProductName: product.sellProductName || '',
      sellProductType: product.sellProductType || '',
      sellProductPrice: product.sellProductPrice || '',
    });
    setOpenUpdateDialog(true);
  };

  // Close Update Dialog
  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setProductToUpdate(null);
    setUpdatedProduct({});
  };

  // Save Updated Product
  const handleUpdateSave = async () => {
    if (!productToUpdate.sellId) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/sell/update/${productToUpdate.sellId}`,
        updatedProduct
      );
      setProducts(products.map((p) => (p.sellId === productToUpdate.sellId ? response.data : p)));
      setOpenUpdateDialog(false); // Close dialog after saving
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle Input Change for Update Dialog
  const handleInputChange = (field, value) => {
    setUpdatedProduct((prev) => ({ ...prev, [field]: value }));
  };

  // Open Delete Dialog
  const handleDeleteDialogOpen = (product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  // Close Delete Dialog
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  // Delete Product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/sell/delete/${productToDelete.sellId}`);
      setProducts(products.filter((p) => p.sellId !== productToDelete.sellId));
      setProductCount(products.length - 1); // Decrement product count after deletion
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle adding a product to the cart
  const handleAddToCart = (product) => {
    onAddToCart(product); // Your existing logic for adding to cart
    setProductCount(productCount + 1); // Increment product count when added to cart
  };

  return (
    <div className="product-details-page" style={{ padding: '20px', marginTop: '35px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        {/* Display the count of products found */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {productCount} Products Found
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} container spacing={2} key={product.sellId}>
            <Grid item xs={12} md={4}>
              <Stack direction="column" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: '100%',
                    height: '350px',
                    overflow: 'hidden',
                    border: '1px solid lightgray',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Box
                    component="img"
                    src={galleryImages[currentImageIndex]}
                    alt={product.sellProductName || 'Product Image'}
                    sx={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                  />
                </Box>
                <Stack direction="row" spacing={1}>
                  {galleryImages.map((imgSrc, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={imgSrc}
                      alt="Gallery Thumbnail"
                      sx={{
                        width: '60px',
                        height: 'auto',
                        border: index === currentImageIndex ? '2px solid black' : '1px solid gray',
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ padding: 2, border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    color: '#333',
                  }}
                >
                  {product.sellProductName || 'Product Name'}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    color: '#333',
                  }}
                >

                  
                  {product.sellProductType || 'Product Type'}
                </Typography>

                <Typography
                variant="body1"
                sx={{
                  fontSize: '14px',
                  mb: 2,
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  color: '#333',
                }}
                >
                  SIZE: {product.sellProductSize || 'Not specified'}
                  </Typography>


                  <Typography
                variant="body1"
                sx={{
                  fontSize: '14px',
                  mb: 2,
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  color: '#333',
                }}
                >
                   {product.sellProductDescription || 'Not specified'}
                  </Typography>


                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    color: '#333',
                  }}
                >
                  {product.sellProductPrice || '6,595.00'} PHP
                </Typography>

                

                

              

                <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                  <Grid item xs={4} sm={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: '100%',
                        fontWeight: 'bold',
                        color: '#0D0F1F',
                        backgroundColor: 'white',
                        borderRadius: '30px',
                        '&:focus': { outline: 'none' },
                        '&:hover': {
                          backgroundColor: '#0D0F1F',
                          color: '#F5F5F5',
                        },
                      }}
                      onClick={() => handleAddToCart(product)} // Increment the count when added to cart
                    >
                      ADD TO CART
                    </Button>
                  </Grid>

                  <Grid item xs={4} sm={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateDialogOpen(product)}
                      sx={{
                        width: '100%',
                        fontWeight: 'bold',
                        color: '#0D0F1F',
                        backgroundColor: 'white',
                        borderRadius: '30px',
                        '&:focus': { outline: 'none' },
                        '&:hover': {
                          backgroundColor: '#0D0F1F',
                          color: '#F5F5F5',
                        },
                      }}
                    >
                      Update
                    </Button>
                  </Grid>

                  <Grid item xs={4} sm={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteDialogOpen(product)}
                      sx={{
                        width: '100%',
                        fontWeight: 'bold',
                        color: '#0D0F1F',
                        backgroundColor: 'white',
                        borderRadius: '30px',
                        '&:focus': { outline: 'none' },
                        '&:hover': {
                          backgroundColor: '#0D0F1F',
                          color: '#F5F5F5',
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Update Product Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleUpdateDialogClose}>
        <DialogTitle 
              sx={{ mb: 0 }}>Update Product</DialogTitle>
        <DialogContent>
          <Stack spacing={1.5}>
            <TextField
              label="Product Name"
              value={updatedProduct.sellProductName || ''}
              onChange={(e) => handleInputChange('sellProductName', e.target.value)}
              fullWidth
            />
            <TextField
              label="Product Type"
              value={updatedProduct.sellProductType || ''}
              onChange={(e) => handleInputChange('sellProductType', e.target.value)}
              fullWidth
            />
            
            <TextField
              label="Product Size"
              value={updatedProduct.sellProductSize || ''}
              onChange={(e) => handleInputChange('sellProductSize', e.target.value)}
              fullWidth
            />
            
            <TextField
              label="Product Description"
              value={updatedProduct.sellProductDescription || ''}
              onChange={(e) => handleInputChange('sellProductDescription', e.target.value)}
              fullWidth
            />

            
            <TextField
              label="Product Price"
              value={updatedProduct.sellProductPrice || ''}
              onChange={(e) => handleInputChange('sellProductPrice', e.target.value)}
              fullWidth
              type="number"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} sx={{
              color: '#0D0F1F',
              backgroundColor: '#FFFFFF',
              borderRadius: '25px',
              padding: '5px 20px',
              textTransform: 'capitalize',
              '&:focus': { outline: 'none' },
              '&:hover': {
                color: '#0D0F1F',
                backgroundColor: '#F5F5F5',
              },
            }}>
            Cancel
          </Button>
          <Button onClick={handleUpdateSave} sx={{
              color: '#0D0F1F',
              backgroundColor: '#white',
              borderRadius: '25px',
              padding: '5px 20px',
              textTransform: 'capitalize',
              '&:focus': { outline: 'none' },
              '&:hover': {
                color: '#F5F5F5',
                backgroundColor: '#0D0F1F',
              },
            }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogContent>
          <Typography variant="h6">Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} sx={{
              color: '#0D0F1F',
              backgroundColor: '#FFFFFF',
              borderRadius: '25px',
              padding: '5px 20px',
              textTransform: 'capitalize',
              '&:focus': { outline: 'none' },
              '&:hover': {
                color: '#0D0F1F',
                backgroundColor: '#F5F5F5',
              },
            }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} sx={{
              color: '#D02A2A',
              backgroundColor: '#FFFFFF',
              borderRadius: '25px',
              padding: '5px 20px',
              textTransform: 'capitalize',
              '&:focus': { outline: 'none' },
              '&:hover': {
                color: '#FFFFFF',
                backgroundColor: '#D02A2A',
              },
            }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}