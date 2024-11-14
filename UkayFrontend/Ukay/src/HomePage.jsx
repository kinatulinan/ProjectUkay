import React, { useState } from 'react';
import './App.css';
import { Box, Typography, Button, Grid, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Cover from './assets/Cover.jpg';
// Imports for product images
import Cargo1 from './assets/Cargo.png';
import Cargo2 from './assets/Cargo2.png';
import Cargo3 from './assets/Cargo3.png';
import Acs from './assets/Acs.jpg';
import Acs2 from './assets/Acs2.jpg';
import Acs3 from './assets/Acs3.jpg';
import Jacket from './assets/Jacket.png';
import Jacket2 from './assets/Jacket2.png';
import Jacket3 from './assets/Jacket3.png';
import Jacket4 from './assets/Jacket4.png';
import Jacket5 from './assets/Jacket5.png';
import Footwear from './assets/Footwear.jpg';
import Shoes from './assets/Shoes.jpg';
import Shoes2 from './assets/Shoes2.jpg';
import Shoes3 from './assets/Shoes3.jpg';
import Bag from './assets/Bag.jpg';
import Bag2 from './assets/Bag2.jpg';
import Bag3 from './assets/Bag3.jpg';
import Bag4 from './assets/Bag4.jpg';
import Dress from './assets/Dress.jpg';
import Dress2 from './assets/Dress2.jpg';
import Dress3 from './assets/Dress3.jpg';
import Jeans from './assets/Jeans.jpg';
import Jeans2 from './assets/Jeans2.jpg';
import Jorts from './assets/Jorts.jpg';
import Jorts2 from './assets/Jorts2.jpg';

function HomePage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);

  // Product data
  const products = [
    {
      label: 'Cargo Pants',
      price: 'Military Inspired',
      variants: [
        { img: Cargo1, name: 'Classic Cargo', price: '2,995 PHP' },
        { img: Cargo2, name: 'Animal Print Cargo', price: '3,295 PHP' },
        { img: Cargo3, name: 'Denim Cargo', price: '3,495 PHP' },
      ]
    },
    {
      label: 'Accessories',
      price: 'FROM $5',
      variants: [
        { img: Acs, name: 'Necklace', price: '500 PHP' },
        { img: Acs2, name: 'Bracelet', price: '300 PHP' },
        { img: Acs3, name: 'Ring Set', price: '450 PHP' },
      ]
    },
    {
      label: 'Jackets',
      price: 'Various Styles',
      variants: [
        { img: Jacket, name: 'Stylish Jacket', price: '4,000 PHP' },
        { img: Jacket2, name: 'Cozy Jacket', price: '3,500 PHP' },
        { img: Jacket3, name: 'Denim Jacket', price: '3,800 PHP' },
      ]
    },
    {
      label: 'Shoes',
      price: 'Trendy Footwear',
      variants: [
        { img: Footwear, name: 'Footwear', price: '2,500 PHP' },
        { img: Shoes, name: 'Sneakers', price: '3,000 PHP' },
        { img: Shoes2, name: 'Casual Shoes', price: '2,800 PHP' },
      ]
    },
    {
      label: 'Bags',
      price: 'Stylish Bags',
      variants: [
        { img: Bag, name: 'Shoulder Bag', price: '1,500 PHP' },
        { img: Bag2, name: 'Handbag', price: '1,800 PHP' },
        { img: Bag3, name: 'Backpack', price: '2,000 PHP' },
      ]
    },
    {
      label: 'Dresses',
      price: 'Elegant Dresses',
      variants: [
        { img: Dress, name: 'Evening Dress', price: '3,000 PHP' },
        { img: Dress2, name: 'Casual Dress', price: '2,500 PHP' },
        { img: Dress3, name: 'Party Dress', price: '3,200 PHP' },
      ]
    },
    {
      label: 'Jeans',
      price: 'Classic Denim',
      variants: [
        { img: Jeans, name: 'Skinny Jeans', price: '2,200 PHP' },
        { img: Jeans2, name: 'Straight Cut', price: '2,500 PHP' },
      ]
    },
    {
      label: 'Jorts',
      price: 'Trendy Shorts',
      variants: [
        { img: Jorts, name: 'Denim Shorts', price: '1,500 PHP' },
        { img: Jorts2, name: 'Cargo Shorts', price: '1,800 PHP' },
      ]
    }
  ];

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleMouseEnter = (item) => {
    if (item.variants && item.variants.length > 1) {
      const interval = setInterval(() => {
        setHoverIndex((prevIndex) => (prevIndex + 1) % item.variants.length);
      }, 2000);
      item.interval = interval;
    }
  };

  const handleMouseLeave = (item) => {
    if (item.interval) {
      clearInterval(item.interval);
      setHoverIndex(0);
    }
  };

  return (
    <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          textAlign: 'center',
          backgroundImage: `url(${Cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          color: 'white',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" fontWeight="bold" sx={{ fontFamily: 'Georgia, serif', color: '#fff' }}>
          New Festive Arrivals
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, fontSize: '18px', fontStyle: 'italic', color: '#d1d1d1' }}>
          Holiday social calendar piling up? Prep the affordable way with looks from quality brands up to 90% off.
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 3, backgroundColor: '#e0e0e0', color: '#000', fontWeight: 'bold', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          Shop New Arrivals
        </Button>
      </Box>

      {/* Product Grid Section */}
      <Box sx={{ textAlign: 'center', mt: 6, padding: '0 20px' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'Georgia, serif'}}>
          Outfit Every Gathering in Style
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
          From dinner tables to fall strolls, see all the occasion looks you need to dress to impress this season.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4, padding: '0 20px' }}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box 
              sx={{
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: 2,
                padding: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                }
              }}
              onClick={() => handleOpen(product)}
              onMouseEnter={() => handleMouseEnter(product)}
              onMouseLeave={() => handleMouseLeave(product)}
            >
              <Box
                component="img"
                src={product.variants[hoverIndex].img}
                alt={product.label}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  mb: 1,
                  border: '1px solid #999',
                  transition: 'transform 0.3s ease',
                }}
              />
              <Typography variant="body1" fontWeight="bold" sx={{ color: '#333' }}>{product.price}</Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>{product.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for product details */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedItem?.label}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {selectedItem?.variants.map((variant, idx) => (
              <Grid item xs={6} sm={4} md={3} key={idx}>
                <Box 
                  sx={{
                    textAlign: 'center',
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={variant.img}
                    alt={variant.name}
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                      mb: 1,
                      border: '1px solid #ddd',
                    }}
                  />
                  <Typography variant="body1" fontWeight="bold" sx={{ color: '#333' }}>{variant.price}</Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>{variant.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default HomePage;
