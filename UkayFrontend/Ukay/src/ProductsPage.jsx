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
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
                      color: '#F5F5F5',
                    },
                  }}
                  onClick={() => onAddToCart(product)}
                >
                  ADD TO CART
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateDialogOpen(product)}
                  sx={{ 
                    margin: '5px',
                    fontWeight: 'bold',
                    color: '#0D0F1F',
                    backgroundColor: 'white',
                    width: '30%',
                    borderRadius: '30px',
                    '&:hover': {
                      backgroundColor: '#0D0F1F',
                      color: '#F5F5F5',
                    },

                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteDialogOpen(product)}
                  sx={{ 
                    margin: '5px',
                    fontWeight: 'bold',
                    color: '#0D0F1F',
                    backgroundColor: 'white',
                    width: '30%',
                    borderRadius: '30px',
                    '&:hover': {
                      backgroundColor: '#0D0F1F',
                      color: '#F5F5F5',
                    },
                   }}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Update Product Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleUpdateDialogClose}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
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
              label="Product Price"
              value={updatedProduct.sellProductPrice || ''}
              onChange={(e) => handleInputChange('sellProductPrice', e.target.value)}
              fullWidth
              type="number"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSave} color="secondary">
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
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
