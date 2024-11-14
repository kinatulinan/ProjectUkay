import React from 'react';
import './App.css';
import { Box, Typography, Button, Grid } from '@mui/material';
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import img4 from './assets/img4.png';
import img5 from './assets/img5.png';
import img6 from './assets/img6.png';
import thriftshop from './assets/thriftshop.jpg';
import y2kgirl from './assets/y2kgirl.png';
import streetwearstyle from'./assets/streetwearstyle.png';
function HomePage() {
  return (
    <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          textAlign: 'center',
          backgroundImage: `url(${thriftshop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          color: 'white',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            
          },
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

      {/* Outfit Grid Section */}
      <Box sx={{ textAlign: 'center', mt: 6, padding: '0 20px' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'Georgia, serif'}}>
          Outfit Every Gathering in Style
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
          From dinner tables to fall strolls, see all the occasion looks you need to dress to impress this season.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4, padding: '0 20px' }}>
        {/* Item Cards */}
        {[
          { img: y2kgirl, label: 'Inspired by late 90s to early 2000s fashion', price: 'Y2K Style' },
          { img: streetwearstyle, label: 'Button Downs', price: 'FROM $10' },
          { img: img3, label: 'Ballet Flats', price: 'FROM $5' },
          { img: img4, label: 'Maxi Dresses', price: 'FROM $7' },
          { img: img5, label: 'T-shirts', price: 'FROM $10' },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Box 
              sx={{
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: 2,
                padding: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                }
              }}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.label}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  mb: 1,
                  border: '1px solid #999', // Keeps the border in grayscale style
                }}
              />
              <Typography variant="body1" fontWeight="bold" sx={{ color: '#333' }}>{item.price}</Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>{item.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;
