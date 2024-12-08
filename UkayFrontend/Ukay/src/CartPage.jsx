import React, { useState } from 'react';
import {Box, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent,
} from '@mui/material';
import { Close as CloseIcon, RemoveCircle, AddCircle, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function CartPage({ cartItems, onClose, open, onRemoveItem, onUpdateQuantity }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.sellProductPrice * item.quantity,
    0
  );

  const handleDeleteItem = (index) => {
    setItemToDelete(index);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    onRemoveItem(itemToDelete);
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleCheckOut = () => {
    navigate('/payment');
    onClose();
  };

  const handleViewCart = () => {
    navigate('/cart');
    onClose();
  };

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
          <IconButton onClick={onClose} sx={{'&:focus': { outline: 'none' }, '&:hover': {
              color: '#f5f5f5',
            backgroundColor: '#C81501',
            }}}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {/* Cart Items */}
        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {cartItems.length === 0 ? (
            <Typography sx = {{fontSize:'0.8rem', paddingLeft: '35%'}}>Add items to cart first.</Typography>
          ) : (
            cartItems.map((item, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <ListItemText
                    primary={item.sellProductName}
                    secondary={`₱${item.sellProductPrice}`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <RemoveCircle />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                    >
                      <AddCircle />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteItem(index)}
                    >
                      <Delete sx={{ color: 'red' }} />
                    </IconButton>
                  </Box>
                </Box>
                <Typography sx={{ marginLeft: 2 }}>
                  ₱{(item.sellProductPrice * item.quantity).toFixed(2)}
                </Typography>
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
                color: '#F5F5F5',
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
              disabled={cartItems.length === 0}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this item from your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}

export default CartPage;
