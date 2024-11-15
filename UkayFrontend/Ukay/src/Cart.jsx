import React from 'react';
import { Box, Typography, Button, Grid, IconButton } from '@mui/material';
import { RemoveCircle, AddCircle, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.sellProductPrice * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', marginTop: 0, fontWeight: 'bold',
        position: 'sticky',
        top: 0,
        zIndex: 10, 
       }}>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 400,
            border: '1px solid lightgray',
            borderRadius: '8px',
            padding: 2,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography>No items in cart</Typography>
          <Button variant="outlined" sx={{ marginTop: 2 }} onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box sx={{ maxHeight: 400, overflowY: 'auto', marginBottom: 2 }}>
          <Grid container spacing={4}>
            {cartItems.map((item, index) => (
              <Grid item xs={12} sm={12} md={12} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid lightgray', paddingBottom: 2 }}>
                  <Box sx={{ width: 120, height: 120, mr: 2 }}>
                    <img
                      src={item.image}
                      alt={item.sellProductName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.sellProductName}</Typography>
                    <Typography variant="body2">Size: {item.size}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ₱{item.sellProductPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  {/* Quantity and Remove Button */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => onUpdateQuantity(index, item.quantity - 1)} disabled={item.quantity === 1}>
                      <RemoveCircle />
                    </IconButton>
                    <Typography variant="body2">{item.quantity}</Typography>
                    <IconButton onClick={() => onUpdateQuantity(index, item.quantity + 1)}>
                      <AddCircle />
                    </IconButton>
                    <IconButton onClick={() => onRemoveItem(index)}>
                      <Delete />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{  marginLeft: 2,  fontSize: '0.875rem',  marginTop: -1, }}>
                    Total: ₱{(item.sellProductPrice * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, position: 'sticky', bottom: 0, backgroundColor: 'white', padding: '10px 0' }}>
        <Typography variant="h6">Total: ₱{getTotalPrice().toFixed(2)}</Typography>
        <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }} onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 80,
          left: 230,
          zIndex: 20,
        }}
      >
        <Button variant="outlined" onClick={handleContinueShopping}>
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
}
