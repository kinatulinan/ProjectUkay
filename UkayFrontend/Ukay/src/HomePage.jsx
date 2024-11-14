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
import Acs4 from './assets/Acs4.jpg';
import Acs5 from './assets/Acs5.jpg';
import Acs6 from './assets/Acs6.jpg';
import Jacket from './assets/Jacket.png';
import Jacket2 from './assets/Jacket2.png';
import Jacket3 from './assets/Jacket3.png';
import Jacket4 from './assets/Jacket4.png';
import Jacket5 from './assets/Jacket5.png';
import Footwear from './assets/Footwear.jpg';
import Shoes from './assets/Shoes.jpg';
import Shoes2 from './assets/Shoes2.jpg';
import Shoes3 from './assets/Shoes3.jpg';
import Shoes4 from './assets/Shoes4.jpg';
import Shoes5 from './assets/Shoes5.jpg';
import Shoes6 from './assets/Shoes6.jpg';
import Shoes7 from './assets/Shoes7.jpg';
import Bag from './assets/Bag.jpg';
import Bag2 from './assets/Bag2.jpg';
import Bag3 from './assets/Bag3.jpg';
import Bag4 from './assets/Bag4.jpg';
import Bag5 from './assets/Bag5.jpg';
import Dress from './assets/Dress.jpg';
import Dress2 from './assets/Dress2.jpg';
import Dress3 from './assets/Dress3.jpg';
import Dress4 from './assets/Dress3.jpg';
import Dress5 from './assets/Dress3.jpg';
import Dress6 from './assets/Dress3.jpg';
import Jeans from './assets/Jeans.jpg';
import Jeans2 from './assets/Jeans2.jpg';
import Jeans4 from './assets/Jeans2.jpg';
import Jeans3 from './assets/Jeans2.jpg';
import Jeans5 from './assets/Jeans2.jpg';
import Jeans6 from './assets/Jeans2.jpg';
import Jorts from './assets/Jorts.jpg';
import Jorts2 from './assets/Jorts2.jpg';
import Jorts3 from './assets/Jorts3.jpg';
import Jorts4 from './assets/Jorts4.jpg';
import Jorts5 from './assets/Jorts5.jpg';
import Jorts6 from './assets/Jorts6.jpg';

function HomePage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  // Product data
  const products = [
    {
      label: 'Cargo Pants',
      price: 'Cargo',
      variants: [
        { img: Cargo1, name: 'Classic Cargo', price: '2,995 PHP' },
        { img: Cargo2, name: 'Animal Print Cargo', price: '3,295 PHP' },
        { img: Cargo3, name: 'Denim Cargo', price: '3,495 PHP' },
      ]
    },
    {
      label: 'Accessories',
      price: 'Accessories',
      variants: [
        { img: Acs6, name: 'Cap', price: '500 PHP' },
        { img: Acs2, name: 'Bracelet', price: '300 PHP' },
        { img: Acs3, name: 'Ring Set', price: '450 PHP' },
        { img: Acs5, name: 'Ring Set', price: '450 PHP' },
        { img: Acs4, name: 'Ring Set', price: '450 PHP' },
        { img: Acs, name: 'Ring Set', price: '450 PHP' },
      ]
    },
    {
      label: 'Jackets',
      price: 'Various Styles',
      variants: [
        { img: Jacket, name: 'Stylish Jacket', price: '4,000 PHP' },
        { img: Jacket2, name: 'Cozy Jacket', price: '3,500 PHP' },
        { img: Jacket3, name: 'Denim Jacket', price: '3,800 PHP' },
        { img: Jacket4, name: 'Denim Jacket', price: '3,800 PHP' },
        { img: Jacket5, name: 'Denim Jacket', price: '3,800 PHP' },
        
      ]
    },
    {
      label: 'Shoes',
      price: 'Trendy Footwear',
      variants: [
        { img: Shoes7, name: 'Footwear', price: '120 PHP' },
        { img: Shoes, name: 'Sneakers', price: '120 PHP' },
        { img: Shoes2, name: 'Casual Shoes', price: '120 PHP' },
        { img: Shoes2, name: 'Casual Shoes', price: '120 PHP' },
        { img: Shoes4, name: 'Casual Shoes', price: '120 PHP' },
        { img: Shoes3, name: 'Casual Shoes', price: '120 PHP' },
        { img: Shoes5, name: 'Casual Shoes', price: '120 PHP' },
        
      ]
    },
    {
      label: 'Bags',
      price: 'Stylish Bags',
      variants: [
        { img: Bag, name: 'Shoulder Bag', price: '150 PHP' },
        { img: Bag2, name: 'Handbag', price: '150 PHP' },
        { img: Bag3, name: 'Backpack', price: '150 PHP' },
        { img: Bag4, name: 'Backpack', price: '150 PHP' },
        { img: Bag5, name: 'Backpack', price: '150 PHP' },
      ]
    },
    {
      label: 'Dresses',
      price: 'Elegant Dresses',
      variants: [
        { img: Dress, name: 'Evening Dress', price: '200 PHP' },
        { img: Dress2, name: 'Casual Dress', price: '200 PHP' },
        { img: Dress3, name: 'Party Dress', price: '200 PHP' },
        { img: Dress4, name: 'Party Dress', price: '200 PHP' },
        { img: Dress5, name: 'Party Dress', price: '200 PHP' },
        { img: Dress6, name: 'Party Dress', price: '200 PHP' },
      ]
    },
    {
      label: 'Jeans',
      price: 'Classic Denim',
      variants: [
        { img: Jeans, name: 'Skinny Jeans', price: '50 PHP' },
        { img: Jeans2, name: 'Straight Cut', price: '50 PHP' },
        { img: Jeans3, name: 'Straight Cut', price: '50 PHP' },
        { img: Jeans4, name: 'Straight Cut', price: '50 PHP' },
        { img: Jeans5, name: 'Straight Cut', price: '50 PHP' },
        { img: Jeans6, name: 'Straight Cut', price: '50 PHP' },
      ]
    },
    {
      label: 'Jorts',
      price: 'Trendy Shorts',
      variants: [
        { img: Jorts, name: 'Denim Shorts', price: '230 PHP' },
        { img: Jorts2, name: 'Cargo Shorts', price: '230 PHP' },
        { img: Jorts3, name: 'Cargo Shorts', price: '230 PHP' },
        { img: Jorts4, name: 'Cargo Shorts', price: '230 PHP' },
        { img: Jorts5, name: 'Cargo Shorts', price: '230 PHP' },
        { img: Jorts6, name: 'Cargo Shorts', price: '230 PHP' },
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
            >
              <Box
                component="img"
                src={product.variants[0].img} // Display the first variant image by default
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
