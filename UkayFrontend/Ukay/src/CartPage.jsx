import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

function CartPage({ cartItems }) {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {cartItems.map((item, index) => (
            <Card key={index} sx={{ maxWidth: 500, margin: 'auto', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  {item.sellProductName}
                </Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Type: {item.sellProductType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.sellProductPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="secondary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CartPage;
