import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
} from '@mui/material';

export default function TransactionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions } = location.state || { transactions: [] };
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredTransactions(transactions); // Reset to full list if search query is empty
    } else {
      const filtered = transactions.filter((_, index) => {
        const transactionId = index + 1; // Assuming transaction ID is the index + 1
        return transactionId.toString() === searchQuery;
      });
      setFilteredTransactions(filtered);
    }
  };

  return (
    <Box sx={{ padding: 5, minWidth: 1000 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        Transactions
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          label="Search Transaction ID"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: '#E99E00',
            color: 'white',
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: '#D68E00',
            },
          }}
        >
          Search
        </Button>
      </Box>

      {filteredTransactions.length === 0 ? (
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
            No transactions found.
          </Typography>
          <Button
            variant="contained"
            onClick={handleBackToHome}
            sx={{
              marginTop: 2,
              backgroundColor: '#E99E00',
              color: 'white',
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: '#D68E00',
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 4,
          }}
        >
          {filteredTransactions.map((transaction, index) => (
            <Card key={index} sx={{ backgroundColor: '#fff', boxShadow: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Transaction #{transactions.indexOf(transaction) + 1}
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Typography>
                    <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>Total Price:</strong> ₱{transaction.totalPrice.toFixed(2)}
                  </Typography>
                  <Typography>
                    <strong>Payment Method:</strong> {transaction.paymentMethod}
                  </Typography>
                  <Typography>
                    <strong>Notes:</strong> {transaction.notes || 'N/A'}
                  </Typography>
                  <Typography>
                    <strong>Items:</strong>
                  </Typography>
                  <Box sx={{ paddingLeft: 2 }}>
                    {transaction.items.map((item, idx) => (
                      <Typography key={idx}>
                        - {item.name} (Qty: {item.quantity}, ₱
                        {(item.sellProductPrice * item.quantity).toFixed(2)})
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={handleBackToHome}
          sx={{
            backgroundColor: '#E99E00',
            color: 'white',
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: '#D68E00',
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}
