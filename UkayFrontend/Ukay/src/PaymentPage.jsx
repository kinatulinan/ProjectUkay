import React, { useState } from 'react';  
import { Box, Typography, Button, TextField, Select, MenuItem, Dialog, DialogContent, DialogActions } from '@mui/material';  
import { useLocation, useNavigate } from 'react-router-dom';  

export default function PaymentPage() {  
  const navigate = useNavigate();  
  const location = useLocation();  

  const { selectedItems, totalPrice } = location.state || { selectedItems: [], totalPrice: 0 };  

  const [paymentMethod, setPaymentMethod] = useState('');  
  const [notes, setNotes] = useState('');  
  const [emptyFieldsDialog, setEmptyFieldsDialog] = useState(false);  

  const handlePayment = () => {
    
      // Show success alert
      alert('Order placed successfully!');  
        navigate('/transactions');  
    
};

  const closeEmptyFieldsDialog = () => {  
    setEmptyFieldsDialog(false);  
  };  

  return (  
    <Box sx={{ padding: 5, minWidth: 1000, backgroundColor: '#f9f9f9' }}>  
      <Typography variant="h4" component="h2" sx={{ mb: 3, color: '#333', fontWeight: 'bold' }}>  
        Payment  
      </Typography>  

      {/* Order Summary */}  
      <Box  
        sx={{  
          display: 'flex',  
          flexDirection: 'column',  
          gap: 2,  
          padding: 3,  
          backgroundColor: '#ffffff',  
          borderRadius: '8px',  
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',  
        }}  
      >  
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>  
          Order Summary  
        </Typography>  
        {selectedItems.length > 0 ? (  
          selectedItems.map((item, index) => (  
            <Box  
              key={index}  
              sx={{  
                display: 'flex',  
                justifyContent: 'space-between',  
                alignItems: 'center',  
                padding: '8px 0',  
                borderBottom: '1px solid #e0e0e0',  
              }}  
            >  
              <Typography sx={{ flex: 3, textAlign: 'left', color: '#555' }}>  
                {item.name || 'No Name Available'}  
              </Typography>  
              <Typography sx={{ flex: 1, textAlign: 'center', color: '#555' }}>Qty: {item.quantity || 1}</Typography>  
              <Typography sx={{ flex: 2, textAlign: 'right', color: '#555' }}>  
                ₱{(item.sellProductPrice * (item.quantity || 1)).toFixed(2)}  
              </Typography>  
            </Box>  
          ))  
        ) : (  
          <Typography sx={{ color: '#999' }}>No items in the order.</Typography>  
        )}  
        <Typography variant="body1" sx={{ textAlign: 'right' }}>Total:</Typography>  
        <Typography variant="body1" sx={{ textAlign: 'right' }}>₱{totalPrice.toFixed(2)}</Typography>  
      </Box>  

      {/* Payment Details */}  
      <Box  
        sx={{  
          marginTop: 4,  
          display: 'flex',  
          flexDirection: 'column',  
          gap: 2,  
          backgroundColor: '#ffffff',  
          padding: 3,  
          borderRadius: '8px',  
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',  
        }}  
      >  
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>  
          Payment Details  
        </Typography>  
        <Select  
          value={paymentMethod}  
          onChange={(e) => setPaymentMethod(e.target.value)}  
          displayEmpty  
          fullWidth  
          sx={{  
            '& .MuiSelect-root': {  
              color: paymentMethod ? 'black' : '#9e9e9e',  
            },  
            '& .MuiOutlinedInput-root': {  
              '& fieldset': {  
                borderColor: '#ddd',  
              },  
              '&:hover fieldset': {  
                borderColor: '#bbb',  
              },  
              '&.Mui-focused fieldset': {  
                borderColor: '#E99E00',  
              },  
            },  
          }}  
        >  
          <MenuItem value="" disabled>  
            Select Payment Method  
          </MenuItem>  
          <MenuItem value="CASH">Cash</MenuItem>  
          <MenuItem value="GCASH">Gcash</MenuItem>  
          <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>  
          <MenuItem value="DEBIT_CARD">Debit Card</MenuItem>  
          <MenuItem value="PAYPAL">PayPal</MenuItem>  
          <MenuItem value="BANK_TRANSFER">Bank Transfer</MenuItem>  
        </Select>  

        <TextField  
          label="Additional Notes (Optional)"  
          multiline  
          rows={3}  
          value={notes}  
          onChange={(e) => setNotes(e.target.value)}  
          fullWidth  
          sx={{  
            '& .MuiOutlinedInput-root': {  
              borderColor: '#ddd',  
              '&:hover fieldset': {  
                borderColor: '#bbb',  
              },  
              '&.Mui-focused fieldset': {  
                borderColor: '#E99E00',  
              },  
            },  
          }}  
        />  
      </Box>  

      {/* Place Order Button */}  
      <Box  
        sx={{  
          display: 'flex',  
          justifyContent: 'flex-end',  
          marginTop: 3,  
        }}  
      >  
        <Button sx={{
          width: '100%',
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
          }} onClick={handlePayment}>
          Place Order
          </Button>
      </Box>  

      {/* Empty Fields Dialog */}  
      <Dialog open={emptyFieldsDialog} onClose={closeEmptyFieldsDialog}>  
        <DialogContent>  
          <Typography>Please select a payment method before placing the order.</Typography>  
        </DialogContent>  
        <DialogActions>  
          <Button onClick={closeEmptyFieldsDialog} variant="contained">  
            Close  
          </Button>  
        </DialogActions>  
      </Dialog>  
    </Box>  
  );  
}
