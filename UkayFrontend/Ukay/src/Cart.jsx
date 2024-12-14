import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Dialog, DialogActions, DialogContent, Checkbox } from '@mui/material';
import { RemoveCircle, AddCircle, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [emptyCartDialog, setEmptyCartDialog] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [setCartItems] = useState([]);
  const [clearCartDialog, setClearCartDialog] = useState(false);

  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('checkedItems');
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }
  }, []);

  useEffect(() => {
    if (checkedItems.length > 0) {
      localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    }
  }, [checkedItems]);

  const getSelectedTotalPrice = () => {
    return cartItems
      .filter((_, index) => checkedItems.includes(index))
      .reduce((total, item) => total + item.sellProductPrice * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0 || checkedItems.length === 0) {
      setEmptyCartDialog(true);
      return;
    }
    const selectedItems = cartItems.filter((_, index) => checkedItems.includes(index));
    const totalPrice = getSelectedTotalPrice();
    navigate('/order', { state: { selectedItems, totalPrice } });
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleDeleteItem = (index) => {
    setItemToDelete(index);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      onRemoveItem(itemToDelete);
    }
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(index)
        ? prevCheckedItems.filter((item) => item !== index)
        : [...prevCheckedItems, index]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setCheckedItems(cartItems.map((_, index) => index));
    } else {
      setCheckedItems([]); 
    }
  };

  const isAllSelected = checkedItems.length === cartItems.length;

  const closeEmptyCartDialog = () => {
    setEmptyCartDialog(false);
  };
  
  const handleClearCart = () => {
    setClearCartDialog(true);
  };

  const confirmClearCart = () => {
    cartItems.forEach((_, index) => {
      onRemoveItem(index);
    });
    localStorage.removeItem('cartItems');
    setClearCartDialog(false);
  };

  const cancelClearCart = () => {
    setClearCartDialog(false);
  };

  return (
    <Box sx={{ padding: 2, minWidth: 1000 }}>
      <Typography
        variant="h1"
        noWrap
        component="a"
        href="home"
        sx={{
          mr: 2,
          display: { xs: 'block', md: 'block' },
          fontFamily: 'Lobster, Sans Serif',
          fontWeight: 700,
          fontSize: { xs: '10rem', md: '5rem' },
          letterSpacing: '.3rem',
          textDecoration: 'none',
          color: '#E99E00',
          background: 'linear-gradient(to right,rgb(0, 0, 0), white)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 100%',
          backgroundPosition: '200% 0',
          transition: 'background-position 1.0s ease',
          lineHeight: 1.2,
          paddingTop: '20px',
          '&:hover': {
            backgroundPosition: '0 0',
            WebkitTextFillColor: 'transparent',
          },
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
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              fontFamily: 'Georgia, serif',
            }}
          >
            Your cart is empty.
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 400, overflowY: 'auto' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr 2fr 1fr',
                fontWeight: 'bold',
                padding: '8px 0',
                borderBottom: '2px solid lightgray',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <Typography fontWeight="bold" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Product</Typography>
              <Typography fontWeight="bold" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Quantity</Typography>
              <Typography fontWeight="bold" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Total</Typography>
              <Box>
                <Typography fontWeight="bold" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Select All</Typography>
                <Checkbox
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  sx={{
                    marginTop: '0',
                    color: '#E99E00',
                    '&.Mui-checked': {
                      color: '#E99E00',
                    },
                  }}
                />
              </Box>
            </Box>

            {cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 2fr 2fr 1fr',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #e0e0e0',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ textAlign: 'left' }}>{item.sellProductName || item.name}</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                    sx={{ p: 0, color: '#E99E00', '&:focus': { outline: 'none' }, '&:hover': { backgroundColor: '#f2f2f2' } }}
                    disabled={item.quantity === 1}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <Typography variant="body2">{item.quantity}</Typography>
                  <IconButton
                    onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                    sx={{ p: 0, color: '#E99E00', '&:focus': { outline: 'none' }, '&:hover': { backgroundColor: '#f2f2f2' } }}
                  >
                    <AddCircle />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteItem(index)}
                    sx={{ p: 0, color: 'red', '&:focus': { outline: 'none' }, '&:hover': { backgroundColor: '#f2f2f2' } }}
                  >
                    <Delete sx={{ color: 'red' }} />
                  </IconButton>
                </Box>

                <Typography>₱{(item.sellProductPrice * item.quantity).toFixed(2)}</Typography>

                <Checkbox
                  checked={checkedItems.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  sx={{
                    marginTop: '0',
                    color: '#E99E00',
                    '&.Mui-checked': {
                      color: '#E99E00',
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

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
                    {getSelectedTotalPrice().toFixed(2)}
                </span></Typography>

        <Button
          onClick={handleClearCart}
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
        >
          Clear Cart
        </Button>

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
          Check Out
        </Button>
      </Box>
        </>
      )}

      {/* Confirmation Dialog */}
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

      <Dialog
        open={clearCartDialog}
        onClose={cancelClearCart}
        aria-labelledby="clear-cart-dialog-title"
        aria-describedby="clear-cart-dialog-description"
      >
        <DialogContent>
          <Typography id="clear-cart-dialog-description">
            Are you sure you want to clear the cart? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelClearCart} 
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
            onClick={confirmClearCart}
            color="secondary"
            autoFocus
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
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
