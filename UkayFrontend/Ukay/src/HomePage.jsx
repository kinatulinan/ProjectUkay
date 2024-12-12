import React, { useState } from 'react';
import './App.css';
import { Box, Typography, Button, Grid, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Cover from './assets/Cover.jpg';
import { Snackbar, Alert } from '@mui/material';

import Cargo1 from './assets/Cargo.png';
import Cargo2 from './assets/Cargo2.png';
import Cargo3 from './assets/Cargo3.png';
import Cargo4 from './assets/Cargo4.png';
import Cargo5 from './assets/Cargo5.png';
import Cargo6 from './assets/Cargo6.png';
import Cargo7 from './assets/Cargo7.png';
import Cargo8 from './assets/Cargo8.png';
import Cargo9 from './assets/Cargo9.jpg';
import Acs from './assets/Acs.jpg';
import Acs2 from './assets/Acs2.jpg';
import Acs3 from './assets/Acs3.jpg';
import Acs4 from './assets/Acs4.jpg';
import Acs5 from './assets/Acs5.jpg';
import Acs6 from './assets/Acs6.jpg';
import Acs7 from './assets/Acs7.jpg';
import Acs8red from './assets/Acs8red.jpg';
import Acs9bead from './assets/Acs9bead.jpg';
import Jacket from './assets/Jacket.png';
import Jacket2 from './assets/Jacket2.png';
import Jacket3 from './assets/Jacket3.png';
import Jacket4 from './assets/Jacket4.png';
import Jacket5 from './assets/Jacket5.png';
import Jacket6 from './assets/Jacket6.png';
import Jacket7 from './assets/Jacket7.png';
import Jacket8 from './assets/Jacket8.png';
import Jacket9 from './assets/Jacket9.png';
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
import Dress4 from './assets/Dress4.jpg';
import Dress5 from './assets/Dress5.jpg';
import Dress6 from './assets/Dress6.jpg';
import Jeans from './assets/Jeans.jpg';
import Jeans2 from './assets/Jeans2.jpg';
import Jeans4 from './assets/Jeans3.jpg';
import Jeans3 from './assets/Jeans4.jpg';
import Jeans5 from './assets/Jeans5.jpg';
import Jeans6 from './assets/Jeans6.jpg';
import Jorts from './assets/Jorts.jpg';
import Jorts2 from './assets/Jorts2.jpg';
import Jorts3 from './assets/Jorts3.jpg';
import Jorts4 from './assets/Jorts4.jpg';
import Jorts5 from './assets/Jorts5.jpg';
import Jorts6 from './assets/Jorts6.jpg';


function HomePage({ onAddToCart }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
const [snackbarMessage, setSnackbarMessage] = useState(''); // State to hold the Snackbar message

  const products = [
    {
      label: 'Cargo Pants',
      variants: [
        { img: Cargo1, name: 'Cargo', sellProductPrice: 232 },
        { img: Cargo2, name: 'Animal Print Cargo', sellProductPrice: 345 },
        { img: Cargo3, name: 'Deni3 Cargo', sellProductPrice: 234 },
        { img: Cargo4, name: 'Cream Cargo Shorts', sellProductPrice: 245 },
        { img: Cargo5, name: 'Deni3fd Cargo', sellProductPrice: 244 },
        { img: Cargo6, name: 'Denidf Cargo', sellProductPrice: 434 },
        { img: Cargo7, name: 'Denifd Cargo', sellProductPrice: 355 },
        { img: Cargo9, name: 'Black Cargo Shorts', sellProductPrice: 433 },
        { img: Cargo8, name: 'Brown Cargo Shorts', sellProductPrice: 388 },

      ]
    },
    {
      label: 'Accessories',
     
      variants: [
        { img: Acs, name: 'Black Beannie', sellProductPrice: 299   },
        { img: Acs6, name: 'Blue Ford Beannie', sellProductPrice: 299 },
        { img: Acs2, name: 'Brown Cap', sellProductPrice: 299},
        { img: Acs3, name: 'White Beannie', sellProductPrice: 299 },
        { img: Acs5, name: 'White Ford Cap', sellProductPrice: 299 },
        { img: Acs4, name: 'Green Ford Cap', sellProductPrice: 299 },
        { img: Acs7, name: 'Silver Necklace', sellProductPrice: 299 },
        { img: Acs8red, name: 'Red Gem Necklace', sellProductPrice: 259 },
        { img: Acs9bead, name: 'Bead Necklace', sellProductPrice: 249 },
      ]
    },
    {
      label: 'Jackets',
     
      variants: [
        { img: Jacket, name: 'Stylish Jacket', sellProductPrice: 399 },
        { img: Jacket2, name: 'Cozy Jacket', sellProductPrice: 249 },
        { img: Jacket3, name: 'Denim Jacket', sellProductPrice: 299 },
        { img: Jacket4, name: 'Denim Jacket', sellProductPrice: 299 },
        { img: Jacket5, name: 'Denim Jacket', sellProductPrice: 239 },
        { img: Jacket6, name: 'Denim Jacket', sellProductPrice: 232 },
        { img: Jacket7, name: 'Denim Jacket', sellProductPrice: 324 },
        { img: Jacket8, name: 'Denim Jacket', sellProductPrice: 123 },
        { img: Jacket9, name: 'Denim Jacket', sellProductPrice: 344 },
        
      ]
    },
    {
      label: 'Shoes',
      
      variants: [
        { img: Footwear, name: 'Footwear', sellProductPrice: 499 },
        { img: Shoes7, name: 'Footwear', sellProductPrice: 499 },
        { img: Shoes, name: 'Sneakers', sellProductPrice: 499 },
        { img: Shoes2, name: 'Shoes', sellProductPrice: 899 },
        { img: Shoes6, name: 'Shoes', sellProductPrice: 899 },
        { img: Shoes4, name: ' Shoes', sellProductPrice: 899 },
        { img: Shoes3, name: 'Shoes', sellProductPrice: 899 },
        { img: Shoes5, name: 'Shoes', sellProductPrice: 899 },
        
      ]
    },
    {
      label: 'Bags',
     
      variants: [
        
        { img: Bag, name: 'Shoulder Bag', sellProductPrice: 234 },
        { img: Bag2, name: 'Handbag', sellProductPrice: 234 },
        { img: Bag3, name: 'Handbag', sellProductPrice: 566},
        { img: Bag4, name: 'Handbag ', sellProductPrice: 499},
        { img: Bag5, name: 'Handbag', sellProductPrice: 499 },
      ]
    },
    {
      label: 'Dresses',
      
      variants: [
        { img: Dress, name: 'Evening Dress', sellProductPrice: 344 },
        { img: Dress2, name: 'Casual Dress', sellProductPrice: 245 },
        { img: Dress3, name: ' Dress', sellProductPrice: 299 },
        { img: Dress4, name: ' Dress', sellProductPrice: 299 },
        { img: Dress5, name:  'Dress', sellProductPrice: 299 },
        { img: Dress6, name: 'Dress', sellProductPrice: 299 },
      ]
    },
    {
      label: 'Jeans',
      
      variants: [
        { img: Jeans, name: 'Skinny Jeans', sellProductPrice: 29 },
        { img: Jeans2, name: 'Straight Cut', sellProductPrice: 299},
        { img: Jeans3, name: 'Straight Cut', sellProductPrice: 299 },
        { img: Jeans4, name: 'Straight Cut', sellProductPrice: 299 },
        { img: Jeans5, name: 'Straight Cut', sellProductPrice: 299 },
        { img: Jeans6, name: 'Straight Cut', sellProductPrice: 299 },
      ]
    },
    {
      label: 'Jorts',
      
      variants: [
        { img: Jorts, name: 'Denim Shorts', sellProductPrice: 150 },
        { img: Jorts2, name: 'Denim Shorts', sellProductPrice: 150 },
        { img: Jorts3, name: 'Denim Shorts', sellProductPrice: 150 },
        { img: Jorts4, name: 'Denim Shorts', sellProductPrice: 150 },
        { img: Jorts5, name: 'Denim Shorts', sellProductPrice: 150},
        { img: Jorts6, name: 'Denim Shorts', sellProductPrice: 150 },
      ]
    }
  ];

  const handleAddToCart = (variant) => {
    onAddToCart(variant);
    setSnackbarMessage(`${variant.name} has been added to the cart!`);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 2000);
  };
  
  // Function to handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
   {/* Hero Section */}
   <Box 
      sx={{
        textAlign: 'center',
        backgroundImage: `url(${Cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: { xs: '50px 12px', md: '100px 18px' },
        marginTop: '30px',
        color: 'white',
        width: '100%',
        height: { xs: '76vh', md: '96vh' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
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
    fontSize: { xs: '55rem', md: '25rem' }, // Adjust the font size as needed
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
  U-Kay
</Typography>


      <Box sx={{ mt: { xs: 2, md: 4 } }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ fontFamily: 'Georgia, serif', color: '#fff' }}>
          Discover Unique Finds and Timeless Styles
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            fontSize: { xs: '14px', md: '18px' },
            fontStyle: 'italic',
            color: '#d1d1d1',
          }}
        >
          Style your wardrobe with handpicked thrift treasures at unbeatable prices.
        </Typography>
      </Box>
    </Box>

      {/* Product Grid Section */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontFamily: 'Georgia, serif', color: '#333' }}
        >
          Find Your Perfect Thrifted Look
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
          From cozy layers to standout styles, discover one-of-a-kind pieces to elevate every occasion.
        </Typography>
      </Box>
  
      <Grid container spacing={4} sx={{ mt: 4 }}>
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
              }}
              onClick={() => handleOpen(product)}
            >
              <Box
                component="img"
                src={product.variants[0].img}
                alt={product.label}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  height: '500px',
                  objectFit: 'cover', // Ensures images fill the box proportionally
                  mb: 1,
                  border: '1px solid #999',
                }}
              />
              <Typography variant="body1" fontWeight="bold" sx={{ color: '#333' }}>
                {product.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
  
      {/* Dialog for product details */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedItem?.label}</DialogTitle>
        <DialogContent
          sx={{
            overflowY: 'auto',
            maxHeight: '60vh',
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f0f0f0',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#bbb',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#888',
            },
          }}
        >
          <Grid container spacing={2}>
            {selectedItem?.variants.map((variant, idx) => (
              <Grid item xs={6} sm={4} md={3} key={idx}>
                <Box
                  sx={{
                    textAlign: 'center',
                    padding: 1,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
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
                  <Typography variant="body1" fontWeight="bold" sx={{ color: '#333' }}>
                    {variant.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    ₱{variant.sellProductPrice}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: '#E99E00',
                      color: '#fff',
                      fontFamily: 'Lobster, Sans Serif',
                      fontSize: '1.2rem',
                      padding: '10px 20px',
                      borderRadius: '30px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#D68E00',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                    onClick={() => handleAddToCart(variant)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
  
      {/* Snackbar for confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default HomePage;
