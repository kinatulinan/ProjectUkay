import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Checkbox,
} from '@mui/material';
import { RemoveCircle, AddCircle, Delete } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [emptyCartDialog, setEmptyCartDialog] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const savedCheckedItems = localStorage.getItem('checkedItems');
    setCheckedItems(savedCheckedItems ? JSON.parse(savedCheckedItems) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const getSelectedTotalPrice = () => {
    return cartItems
      .filter((_, index) => checkedItems.includes(index))
      .reduce((total, item) => total + item.sellProductPrice * item.quantity, 0);
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
      setCheckedItems(cartItems.map((_, index) => index)); // Select all
    } else {
      setCheckedItems([]); // Deselect all
    }
  };

  const isAllSelected = checkedItems.length === cartItems.length;

  const handleCheckout = () => {
    if (checkedItems.length === 0) {
      setEmptyCartDialog(true);
      return;
    }
    const selectedItems = cartItems.filter((_, index) =>
      checkedItems.includes(index)
    );
    const totalPrice = getSelectedTotalPrice();
    navigate('/payment', { state: { selectedItems, totalPrice } });
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const closeEmptyCartDialog = () => {
    setEmptyCartDialog(false);
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
        fontSize: { xs: '50rem', md: '20rem' }, // Adjust the font size as needed
        letterSpacing: '.3rem',
        textDecoration: 'none',
        color: '#E99E00',
        background: 'linear-gradient(to right, #E99E00, white)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: '200% 100%',
        backgroundPosition: '200% 0',
        transition: 'background-position 1.0s ease',
        lineHeight: 1.2, // Fix clipping of descenders like "y"
        paddingTop: '20px', // Adjust padding to move it higher
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
              fontStyle: 'italic',
            }}
          >
            Your cart is empty.
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 400 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr 2fr 1fr',
                fontWeight: 'bold',
                padding: '8px 0',
                borderBottom: '2px solid #ccc',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
              }}
            >
              <Typography>Product</Typography>
              <Typography>Quantity</Typography>
              <Typography>Total</Typography>
              <Box>
                <Checkbox
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  sx={{
                    color: '#E99E00',
                    '&.Mui-checked': {
                      color: '#E99E00',
                    },
                  }}
                />
                <Typography variant="caption">Select All</Typography>
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
                <Typography sx={{ textAlign: 'left', paddingLeft: 2 }}>
                  {item.name || 'Unnamed Product'}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <IconButton
                    onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    sx={{
                      color: '#E99E00',
                      '&:hover': {
                        backgroundColor: '#f2f2f2',
                      },
                    }}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                    sx={{
                      color: '#E99E00',
                      '&:hover': {
                        backgroundColor: '#f2f2f2',
                      },
                    }}
                  >
                    <AddCircle />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteItem(index)}
                    sx={{
                      color: 'red',
                      '&:hover': {
                        backgroundColor: '#f2f2f2',
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>

                <Typography>
                  ₱{(item.sellProductPrice * item.quantity).toFixed(2)}
                </Typography>

                <Checkbox
                  checked={checkedItems.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                  sx={{
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
              marginTop: 4,
              textAlign: 'right',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            Total Price: ₱{getSelectedTotalPrice().toFixed(2)}
          </Box>

          {/* Continue Shopping and Checkout Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 3,
            }}
          >
            <Button
              variant="text"
              onClick={handleContinueShopping}
              sx={{
                color: '#E99E00',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#f2f2f2',
                },
              }}
            >
              Continue Shopping
            </Button>

            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{
                backgroundColor: '#E99E00',
                color: 'white',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#D68E00',
                },
              }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Empty Cart Dialog */}
      <Dialog open={emptyCartDialog} onClose={closeEmptyCartDialog}>
        <DialogContent>
          <Typography>Please select at least one item to checkout.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEmptyCartDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
