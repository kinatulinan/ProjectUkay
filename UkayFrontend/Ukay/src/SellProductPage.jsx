import React, { useState, useRef } from 'react';
import { Container, Box, Typography, Button, TextField, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import './App.css';
import background from './assets/background.png';
import background1 from './assets/background1.png';

function SellProductPage() {
  const [formData, setFormData] = useState({
    sellProductName: '',
    sellProductType: '',
    sellProductPrice: '',
  });

  const [email, setEmail] = useState('');
  const formRef = useRef(null); // Create a reference for the form

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/sell/post', formData);
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Promotional Section */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            SELL CLOTHES ONLINE
          </Typography>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Start, run, and sell your clothes now!
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Get the training, tools, and support you need to build the clothing business you’ve always wanted.
          </Typography>
          <Box component="form" onSubmit={handleEmailSubmit} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
    type="submit" 
    variant="contained" 
    sx={{ 
      whiteSpace: 'nowrap',
      backgroundColor: 'white',       // Custom background color
      color: 'black',                 // Text color
      padding: '10px 20px',           // Padding
      borderRadius: '30px',           // Rounded corners
      fontWeight: 'bold',             // Bold text
      '&:hover': {                    // Hover effect
        backgroundColor: 'black',
        color: 'white',
      },
    }}
  >
    Start Selling Now
  </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={background} // Use the imported image here
            alt="Clothing business setup"
            sx={{ width: '100%', borderRadius: 2 }}
          />
        </Grid>
      </Grid>

      {/* Steps to Sell Clothes Online */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            How to sell clothes online in just 5 steps
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>1. Create your online store</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Start by creating a professional online store where you can showcase your products.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>2. Set up your product pages</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Create attractive product pages with high-quality images and detailed descriptions.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>3. Select your apps and sales channels</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Choose apps and sales channels that help you reach a larger audience.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>4. Pick your payment gateway</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Select a secure payment gateway to accept payments from your customers.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>5. Market your clothing store</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Market your brand through social media, email, and other marketing channels.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={background1} // Use the imported image here
            alt="Steps illustration"
            sx={{ width: '100%', borderRadius: 2 }}
          />
        </Grid>
      </Grid>

      {/* Form and Description Side-by-Side Layout */}
      <Grid container spacing={3}>
        {/* Description Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Ready to sell your products?
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              Fill out the form to add your product to our catalog. Provide detailed information to attract more customers and make sure your product stands out!
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              * Ensure accurate pricing and category details for better visibility.
            </Typography>
          </Box>
        </Grid>

        {/* Selling Form */}
        <Grid item xs={12} md={6}>
          <Box ref={formRef}  component="form" onSubmit={handleSubmit} sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
              Sell A Product
            </Typography>
            <label className="label-adjust" htmlFor="sellProductName">Product Name</label>
            <TextField
              fullWidth
              type="text"
              id="sellProductName"
              placeholder="Product Name here"
              value={formData.sellProductName}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
            
            <label className="label-adjust" htmlFor="sellProductType">Product Type</label>
            <TextField
              fullWidth
              type="text"
              id="sellProductType"
              placeholder="Product Type here"
              value={formData.sellProductType}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

            <label className="label-adjust" htmlFor="sellProductPrice">Product Price</label>
            <TextField
              fullWidth
              type="number"
              id="sellProductPrice"
              placeholder="Product Price here"
              value={formData.sellProductPrice}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />

<Button 
  type="submit" 
  variant="contained" 
  sx={{ 
    mt: 2, 
    backgroundColor: 'white', 
    color: 'black',              
    padding: '10px 20px',        
    borderRadius: '30px',        
    fontWeight: 'bold',          
    '&:hover': {                 
      backgroundColor: 'black',
      color: 'white',
    },
  }}
>
  Submit Product
</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SellProductPage;
