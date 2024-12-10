import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, Checkbox } from '@mui/material';
import { RemoveCircle, AddCircle, Delete } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [emptyCartDialog, setEmptyCartDialog] = useState(false);
  const [checkedItems, setCheckedItems] = useState(() => {
    const savedCheckedItems = localStorage.getItem('checkedItems');
    try {
      return savedCheckedItems ? JSON.parse(savedCheckedItems) : [];
    } catch (e) {
      console.error('Error parsing checked items from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      cartItems = JSON.parse(savedCartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (location.pathname !== '/cart') {
      localStorage.removeItem('checkedItems');
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const getTotalPrice = () => {
    return cartItems
      .filter((item, index) => checkedItems.includes(index))
      .reduce((total, item) => total + item.sellProductPrice * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0 || checkedItems.length === 0) {
      setEmptyCartDialog(true);
      return;
    }
    const selectedItems = cartItems.filter((_, index) => checkedItems.includes(index));
    const totalPrice = getTotalPrice();
    navigate('/payment', { state: { selectedItems, totalPrice } });
  };
  

  const handleContinueShopping = () => {
    navigate('/products');
  };

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

  const closeEmptyCartDialog = () => {
    setEmptyCartDialog(false);
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(index)) {
        return prevCheckedItems.filter((item) => item !== index);
      } else {
        return [...prevCheckedItems, index];
      }
    });
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
            <Typography fontWeight={"bold"}>Buy</Typography>
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
              <Typography sx={{ textAlign: 'left', marginLeft: '38%'}}>{item.sellProductName}</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                  sx={{ p: 0, color: 'black', '&:focus': { outline: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
                  disabled={item.quantity === 1}
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
                  onClick={() => handleDeleteItem(index)}
                  sx={{ p: 0, color: 'black', '&:focus': { outline: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
                >
                  <Delete sx={{ color: 'red' }} />
                </IconButton>
              </Box>

              <Typography>₱{(item.sellProductPrice * item.quantity).toFixed(2)}</Typography>

              <Checkbox checked={checkedItems.includes(index)} onChange={() => handleCheckboxChange(index)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '& .MuiTouchRipple-root': {
                    display: 'none',
                    },
                  }} />
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
        <Typography sx={{ fontSize: '16px', width: '150px', textAlign: 'left'}}>
          Total: ₱<span style={{ fontWeight: 'bold' }}>
                    {getTotalPrice().toFixed(2)}
                </span></Typography>

        <Button
          variant="text"
          sx={{
            width: '18%',
            backgroundColor: '#f5f5f5',
            color: 'black',
            borderRadius: '30px',
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
              borderRadius: '30px',
              backgroundColor: 'white',
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
            width: '15%',
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
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogContent>
          <Typography
            sx={{
              marginBottom: '10px',
              fontSize: '1rem',
              color: '#0D0F1F',
            }}
          >
            Are you sure you want to remove this in your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancelDelete}
            color="primary"
            sx={{
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
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="secondary"
            sx={{
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
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Empty Cart Dialog */}
      <Dialog open={emptyCartDialog} onClose={closeEmptyCartDialog}>
        <DialogContent>
          <Typography
            sx={{
              marginBottom: '10px',
              fontSize: '1rem',
              color: '#0D0F1F',
            }}
          >
            Please select at least one item to checkout.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeEmptyCartDialog}
            color="primary"
            sx={{
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
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
