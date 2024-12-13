import React, { useEffect, useState } from 'react';  
import { useLocation, useNavigate } from 'react-router-dom';  
import { Box, Typography, Button, Card, CardContent, Divider, Pagination } from '@mui/material';  

export default function TransactionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions: initialTransactions } = location.state || { transactions: [] };
  const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions || []);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5; // Items per page

  useEffect(() => {
    // Load transactions from localStorage if no transactions are passed via state
    if (!initialTransactions || initialTransactions.length === 0) {
      const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
      setFilteredTransactions(storedTransactions);
    }
  }, [initialTransactions]);

  const handleBackToHome = () => navigate('/home');  

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Get current transactions to display based on pagination  
  const indexOfLastTransaction = currentPage * transactionsPerPage;  
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;  
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);  

  return (  
    <Box sx={{ padding: 5 }}>  
      <Typography variant="h4" sx={{ mb: 3 }}>Transactions</Typography>  

      {currentTransactions.length === 0 ? (  
        <Typography>No transactions found.</Typography>  
      ) : (  
        currentTransactions.map((transaction, index) => (  
          <Card key={index} sx={{ mb: 2 }}>  
            <CardContent>  
              <Typography variant="h6">Transaction #{indexOfFirstTransaction + index + 1}</Typography>  
              <Divider sx={{ my: 1 }} />  
              <Typography>Date: {new Date(transaction.date).toLocaleDateString()}</Typography>  
              <Typography>Total Price: ₱{transaction.totalPrice.toFixed(2)}</Typography>  
              <Typography>Payment Method: {transaction.paymentMethod}</Typography>  
              <Typography>Notes: {transaction.notes || 'N/A'}</Typography>  
              <Typography>Items:</Typography>  
              {transaction.items.map((item, idx) => (  
                <Typography key={idx} sx={{ pl: 2 }}>  
                  - {item.name} (Qty: {item.quantity}, ₱{item.sellProductPrice.toFixed(2)})  
                </Typography>  
              ))}  
            </CardContent>  
          </Card>  
        ))  
      )}  

      <Pagination  
        count={totalPages}  
        page={currentPage}  
        onChange={handlePageChange}  
        sx={{ mt: 3 }}  
      />  

      <Button  
        onClick={handleBackToHome}  
        variant="contained"  
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
  );  
}  
