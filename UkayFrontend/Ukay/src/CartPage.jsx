import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function CartPage({ cartItems, onRemoveItem }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.sellProductPrice, 0);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="text.primary">
                    {item.sellProductName}
                  </Typography>
                  <Divider sx={{ marginY: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Type: {item.sellProductType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.sellProductPrice.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary" onClick={() => onRemoveItem(index)}>
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box sx={{ marginTop: 3, padding: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="h6" color="text.primary">
                Total: ${totalPrice.toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default CartPage;
