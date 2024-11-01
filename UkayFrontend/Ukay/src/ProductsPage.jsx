import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid'; // Import Grid

import './App.css';

export default function ProductsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch products from backend on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/sell/get');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Open update dialog
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Update product in backend
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/sell/update/${selectedProduct.sellId}`, selectedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.sellId === selectedProduct.sellId ? selectedProduct : product
        )
      );
      setOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle delete product
  const handleDelete = async (sellId) => {
    try {
      await axios.delete(`http://localhost:8080/api/sell/delete/${sellId}`);
      setProducts(products.filter((product) => product.sellId !== sellId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  return (
    <div className="products-grid" style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.sellId}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 150 }}
                image={'/path/to/your/image.jpg' || 'placeholder.jpg'} // Replace with a relevant image URL
                title={product.sellProductName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.sellProductName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Type: {product.sellProductType}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Price: ${product.sellProductPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => onAddToCart(product)}>Add to Cart</Button>
                <Button size="small" onClick={() => handleUpdateClick(product)}>Update</Button>
                <Button size="small" onClick={() => handleDelete(product.sellId)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Update Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            type="text"
            fullWidth
            name="sellProductName"
            value={selectedProduct?.sellProductName || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Product Type"
            type="text"
            fullWidth
            name="sellProductType"
            value={selectedProduct?.sellProductType || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Product Price"
            type="number"
            fullWidth
            name="sellProductPrice"
            value={selectedProduct?.sellProductPrice || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
