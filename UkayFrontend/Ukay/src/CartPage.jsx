import React from 'react';
import { Box, Grid, Typography, Button, IconButton, TextField, Drawer, Divider, List, ListItem } from '@mui/material';
import { Add, Remove, Close as CloseIcon } from '@mui/icons-material';

function CartPage({ cartItems, onRemoveItem, onUpdateQuantity, open, onClose, handleViewCart }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.sellProductPrice * item.quantity,
    0
  );

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose} 
      sx={{
        '& .MuiDrawer-paper': { 
          borderTopLeftRadius: '20px', 
          borderBottomLeftRadius: '20px',
        },
      }}
    >
      <Box 
        sx={{ 
          width: 500, 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%' 
        }} 
        role="presentation" 
        onClick={onClose} 
        onKeyDown={onClose}
      >
        {/* Close Icon */}
        <IconButton 
          onClick={onClose} 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            color: 'black' 
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Cart Title */}
        <Typography 
          variant="h6" 
          sx={{ 
            padding: 2, 
            fontFamily: 'Roboto, sans-serif', 
            fontWeight: 'bold', 
            fontSize: '0.9rem' 
          }}
        >
          CART
        </Typography>
        <Divider />

        {/* Cart Items List */}
        <List sx={{ flexGrow: 1 }}>
          {cartItems.length === 0 ? (
            <ListItem> </ListItem>
          ) : (
            cartItems.map((item, index) => (
              <div key={index}>
                <Typography>{item.sellProductName}</Typography>
                <Typography>{item.sellProductPrice}</Typography>
              </div>
            ))
          )}
        </List>

        {/* View Cart Button */}
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
          <Button 
            variant="text" 
            sx={{ 
              width: '18%', 
              fontWeight: 'bold', 
              backgroundColor: 'white', 
              color: 'black', 
              borderRadius: '0px', 
              textTransform: 'capitalize', 
              position: 'relative', 
              overflow: 'hidden',
              '&::after': {
                content: '""', 
                position: 'absolute', 
                bottom: 0, 
                left: '0%', 
                width: '100%', 
                height: '2px',
                backgroundColor: '#b3b5b5',  
                transform: 'scaleX(1)', 
                transformOrigin: 'bottom right',
                transition: 'transform 10s ease, background-color 0.5s ease', 
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
