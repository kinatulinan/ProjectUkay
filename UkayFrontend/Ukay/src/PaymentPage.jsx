import React, { useState, useEffect } from 'react';
import './App.css'; 
import PaymentService from '../PaymentService';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from '@mui/material';

const PaymentPage = () => {
  const userid = 1; // Sample user ID
  const [payments, setPayments] = useState([]);
  const [searchId, setSearchId] = useState('');

  const fetchPayments = async () => {
    try {
      const response = await PaymentService.getPaymentsByUserId(userid);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [userid]);

  const handlePaymentCreated = () => {
    fetchPayments();
  };

  return (
    <Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#E99E00',
          fontFamily: 'Lobster, Sans Serif',
          marginBottom: '1rem',
        }}
      >
        Payment Form
      </Typography>

      <PaymentForm userid={userid} onPaymentCreated={handlePaymentCreated} />
    </Box>
  );
};

// PaymentForm component
const PaymentForm = ({ userid, onPaymentCreated }) => {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [method, setMethod] = useState('');

  // Calculate today's date in the local timezone
  const today = new Date();
  const offset = today.getTimezoneOffset(); // Get timezone offset in minutes
  const adjustedToday = new Date(today.getTime() - offset * 60 * 1000);
  const todayDate = adjustedToday.toISOString().split('T')[0];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paymentData = {
      amount: parseFloat(amount),
      paymentDate,
      notes,
      method,
    };

    try {
      await PaymentService.createPayment(userid, paymentData);
      alert('Payment created successfully!');
      onPaymentCreated();
    } catch (error) {
      alert('Failed to create payment!');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        fullWidth
        sx={{
          '& label.Mui-focused': {
            color: '#E99E00',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#E99E00',
          },
        }}
      />

      <TextField
        label="Payment Date"
        type="date"
        value={paymentDate}
        onChange={(e) => setPaymentDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: todayDate }}
        required
        fullWidth
        sx={{
          '& label.Mui-focused': {
            color: '#E99E00',
          },
        }}
      />

      <TextareaAutosize
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        minRows={4}
        style={{
          padding: '0.5rem',
          fontFamily: 'Arial',
          borderColor: '#ccc',
          borderRadius: '4px',
          resize: 'none',
        }}
      />

      <FormControl fullWidth required>
        <InputLabel id="payment-method-label">Payment Method</InputLabel>
        <Select
          labelId="payment-method-label"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <MenuItem value="CASH">Cash</MenuItem>
          <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
          <MenuItem value="DEBIT_CARD">Debit Card</MenuItem>
          <MenuItem value="PAYPAL">PayPal</MenuItem>
          <MenuItem value="BANK_TRANSFER">Bank Transfer</MenuItem>
          <MenuItem value="MOBILE_PAYMENT">Mobile Payment</MenuItem>
          <MenuItem value="GIFT_CARD">Gift Card</MenuItem>
          <MenuItem value="STORE_CREDIT">Store Credit</MenuItem>
          <MenuItem value="CHECK">Check</MenuItem>
          <MenuItem value="OTHER">Other</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#E99E00',
          color: 'white',
          textTransform: 'capitalize',
          padding: '0.8rem',
          '&:hover': {
            backgroundColor: '#D68E00',
          },
        }}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default PaymentPage;
