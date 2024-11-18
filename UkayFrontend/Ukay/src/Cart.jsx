import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { RemoveCircle, AddCircle, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false); // For opening/closing dialog
  const [itemToDelete, setItemToDelete] = useState(null); // To store the item to be deleted

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.sellProductPrice * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleDeleteItem = (index) => {
    setItemToDelete(index); // Store the item to delete
    setOpenDialog(true); // Open the dialog
  };

  const confirmDelete = () => {
    onRemoveItem(itemToDelete); // Perform the removal
    setOpenDialog(false); // Close the dialog
    setItemToDelete(null); // Clear the item
  };

  const cancelDelete = () => {
    setOpenDialog(false); // Close the dialog without removing
    setItemToDelete(null); // Clear the item
  };

  return (
    <Box sx={{ padding: 2, minWidth: 1000 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: 'left',
          marginTop: 3,
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

      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
            borderRadius: '8px',
            padding: 2,
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Your cart is empty.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 400, overflowY: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '3fr 2fr 2fr 1fr',
              fontWeight: 'bold',
              padding: '8px 0',
              borderBottom: '2px solid lightgray',
              textAlign: 'center',
            }}
          >
            <Typography fontWeight={"bold"}>Product</Typography>
            <Typography fontWeight={"bold"}>Quantity</Typography>
            <Typography fontWeight={"bold"}>Total</Typography>
          </Box>

          {cartItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr 2fr 1fr',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid lightgray',
                textAlign: 'center',
              }}
            >
              <Typography>{item.sellProductName}</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={() => onUpdateQuantity(index, item.quantity - 1 )}
                  sx={{ p: 0, color: 'black', '&:focus': { outline: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
                  disabled={item.quantity === 1 }
                >
                  <RemoveCircle />
                </IconButton>
                <Typography variant="body2">{item.quantity}</Typography>
                <IconButton
                  onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                  sx={{ p: 0, color: 'black', '&:focus': { outline: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
                >
                  <AddCircle />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteItem(index)} // Trigger delete confirmation
                  sx={{ p: 0, color: 'black', '&:focus': { outline: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
                >
                  <Delete sx={{ color: 'red' }} />
                </IconButton>
              </Box>

              <Typography>₱{(item.sellProductPrice * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4,
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          padding: '10px 0',
        }}
      >
        <Typography sx={{ fontSize: '18px' }}>Total: ₱{getTotalPrice().toFixed(2)}</Typography>

        <Button 
            variant="text" 
            sx={{ 
              width: '18%',
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
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>

        <Button
            variant="contained"
            color="primary"
            sx={{
              width: '25%',
              color: '#E99E00',
              backgroundColor: 'black',
              borderRadius: '30px',
              marginRight: '10px',
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={cancelDelete}>
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
          onClick={cancelDelete}
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
          onClick={confirmDelete}
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
    </Box>
  );
}
