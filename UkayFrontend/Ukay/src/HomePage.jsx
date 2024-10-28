import React, { useState } from 'react';
import './App.css';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import img1 from './assets/img1.png';
import img1Hover from './assets/img1-hover.png'; // Add hover image
import img2 from './assets/img2.png';
import img2Hover from './assets/img2-hover.png';
import img3 from './assets/img3.png';
import img3Hover from './assets/img3-hover.png';
import img4 from './assets/img4.png';
import img4Hover from './assets/img4-hover.png';



const saleSections = [
  {
    title: "Quiet luxury on sale", 
    items: ["Knit Dresses", "Heeled Boots", "$31.99", "Add to Cart"],
    image: img1,
    hoverImage: img1Hover
  },
  {
    title: "Essentials on sale",
    items: ["Cozy Sweaters", "Flowy Pants", "Everyday Flats", "Add to Cart"],
    image: img2,
    hoverImage: img2Hover
  },
  {
    title: "Statement styles on sale",
    items: ["Cheetah Print", "Coats", "Party Bags", "Add to Cart"],
    image: img3,
    hoverImage: img3Hover
  },
  {
    title: "Casual layers on sale",
    items: ["Polished Denim", "Jackets", "Long Sleeves", "Add to Cart"],
    image: img4,
    hoverImage: img4Hover
  }
];

function WinterWarmUp() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Container>
      <Box 
        sx={{
          textAlign: 'center', 
          backgroundImage: 'url(/path/to/header-image.jpg)', // Replace with your image path
          backgroundSize: 'cover',
          padding: '40px 20px',
          color: 'white'
        }}
      >
        <Typography className='homeDetails' variant="h2" fontWeight="bold">WELCOME TO U-KAY</Typography>
        <Typography className='homeDetails' variant="body1">Thrift with us</Typography>
        <Button variant="contained" sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}>Shop the Sale</Button>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {saleSections.map((section, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              sx={{
                backgroundColor: '#4f8a8b',
                color: 'white',
                p: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {section.title}
                </Typography>
                {section.items.map((item, idx) => (
                  <Button
                    key={idx}
                    variant="outlined"
                    sx={{
                      display: 'block',
                      color: 'white',
                      borderColor: 'white',
                      mb: 1,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#4f8a8b'
                      }
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
              <Box
                component="img"
                src={hoveredIndex === index ? section.hoverImage : section.image}
                alt={section.title}
                sx={{ maxWidth: '40%', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default WinterWarmUp;
