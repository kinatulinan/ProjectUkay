import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
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
    <div>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: 'left',
          marginTop: 0,
          fontWeight: 'bold',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'white',
          padding: '10px 0',
        }}
      >
        Your Cart
      </Typography>
    <Box sx={{ padding: 3 }}>
      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
            border: '1px solid lightgray',
            borderRadius: '8px',
            padding: 2,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Your cart is empty.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 400, overflowY: 'auto' }}>
          {/* Cart Items */}
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                padding: '8px 0',
                borderBottom: '2px solid lightgray',
              }}
            >
              <Typography>Product</Typography>
              <Typography>Quantity</Typography>
              <Typography>Total</Typography>
            </Box>
            {cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid lightgray',
                }}
              >
                {/* Product Name */}
                <Typography>{item.sellProductName}</Typography>

                {/* Quantity and Quantity Control */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <Typography variant="body2">{item.quantity}</Typography>
                  <IconButton onClick={() => onUpdateQuantity(index, item.quantity + 1)}>
                    <AddCircle />
                  </IconButton>
                </Box>

                {/* Total Price */}
                <Typography>₱{(item.sellProductPrice * item.quantity).toFixed(2)}</Typography>

                {/* Remove Button */}
                <IconButton onClick={() => onRemoveItem(index)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Checkout and Continue Shopping Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 4,
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          padding: '10px 0',
        }}
      >
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
    </div>
  );
}
