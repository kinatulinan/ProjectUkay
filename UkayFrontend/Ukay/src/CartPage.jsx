import React from 'react';
import { Box, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function CartPage({ cartItems, onClose, open, onRemoveItem }) {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.sellProductPrice * item.quantity,
    0
  );

  const handleViewCart = () => {
    navigate('/cart');
    onClose();
  };

  const handleCheckOut = () => {
    navigate('/payment');
    onClose();
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 500,
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
        },
      }}
    >
      <Box sx={{ padding: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Drawer Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Cart
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {/* Cart Items */}
        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {cartItems.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
              Your cart is empty.
            </Typography>
          ) : (
            cartItems.map((item, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText
                  primary={item.sellProductName}
                  secondary={`₱${item.sellProductPrice} x ${item.quantity}`}
                />
                <Typography>
                  ₱{(item.sellProductPrice * item.quantity).toFixed(2)}
                </Typography>
                <IconButton onClick={() => onRemoveItem(index)}>Remove</IconButton>
              </ListItem>
            ))
          )}
        </List>

        {/* Total Price and Buttons */}
        <Box>
          <Divider sx={{ marginY: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button
              variant="contained"
              sx={{
                width: '50%',
                color: '#E99E00',
                backgroundColor: 'black',
                borderRadius: '30px',
                marginRight: '10px',
                textTransform: 'capitalize',
                '&:focus': { outline: 'none' },
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
              onClick={handleCheckOut}
            >
              Checkout &middot; ₱{totalPrice.toFixed(2)}
            </Button>
          </Box>
        </Box>

        {/* View Cart Button */}
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
          <Button
            variant="text"
            sx={{
              width: '20%',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '0px',
              textTransform: 'capitalize',
              position: 'relative',
              overflow: 'hidden',
              '&:focus': { outline: 'none' },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '0%',
                width: '100%',
                height: '1.3px',
                backgroundColor: '#b3b5b5',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 1s ease, background-color 0.5s ease',
              },
              '&:hover': {
                '&::after': {
                  backgroundColor: 'black',
                  transform: 'scaleX(1)',
                  transformOrigin: 'bottom left',
                },
              },
            }}
            onClick={handleViewCart}
          >
            View Cart
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default CartPage;
