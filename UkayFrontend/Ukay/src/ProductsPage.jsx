import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import img1 from './assets/img1.png';

import './App.css';

export default function MediaCard() {
  const navigate = useNavigate();

  // Handle "Add to Cart" click
  const handleAddToCart = () => {
    // Add your logic here to save the product to cart if needed
    navigate('/cart'); // Navigate to the Cart page
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 350 }}
        image={img1}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sweat Shirt
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
        <Button size="small">Update</Button>
        <Button className="delete-button" size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
