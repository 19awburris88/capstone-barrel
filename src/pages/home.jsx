import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Modal,
  Stack,
  Grid,
} from '@mui/material';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ✅ Import local images for featured bottles
import bottle1 from '../assets/Blanton.png';
import bottle2 from '../assets/Blanton.png';
import bottle3 from '../assets/Blanton.png';
import bottle4 from '../assets/Blanton.png';
import bottle5 from '../assets/Blanton.png';
import bottle6 from '../assets/Blanton.png';
import bottle7 from '../assets/Blanton.png';
import bottle8 from '../assets/Blanton.png';
import bottle9 from '../assets/Blanton.png';
import bottle10 from '../assets/Blanton.png';

const featuredBottles = [
  { name: 'Old Forester Birthday Bourbon', image: bottle1 },
  { name: 'William Larue Weller', image: bottle2 },
  { name: 'Colonel E.H. Taylor Four Grain', image: bottle3 },
  { name: 'Blanton’s Straight From the Barrel', image: bottle4 },
  { name: 'King of Kentucky', image: bottle5 },
  { name: 'Booker’s 30th Anniversary', image: bottle6 },
  { name: 'Heaven Hill 17 Year', image: bottle7 },
  { name: 'Jefferson’s Presidential Select', image: bottle8 },
  { name: 'Parker’s Heritage Collection', image: bottle9 },
  { name: 'Michter’s Celebration', image: bottle10 },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  arrows: true,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 900, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
  ],
};

export default function Home() {
  const [showAgePrompt, setShowAgePrompt] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('is21');
    if (!verified) setShowAgePrompt(true);
  }, []);

  const handleVerify = () => {
    localStorage.setItem('is21', 'true');
    setShowAgePrompt(false);
  };

  const handleDeny = () => {
    window.location.href = 'https://www.responsibility.org/';
  };

  return (
    <Box sx={{ bgcolor: '#0B0B0B', color: 'white' }}>
      {/* Age Verification Modal */}
      <Modal open={showAgePrompt} disableEscapeKeyDown disableAutoFocus>
        <Box
          sx={{
            width: '100vw',
            backgroundColor: '#1e1e1e',
            color: '#fff',
            p: 4,
            borderRadius: 2,
            maxWidth: 400,
            mx: 'auto',
            mt: 20,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Are you 21 or older?
          </Typography>
          <Typography variant="body2" color="#ccc" mb={3}>
            You must be of legal drinking age to access Barrel Exchange.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={handleVerify}>
              Yes, I am
            </Button>
            <Button variant="outlined" onClick={handleDeny}>
              No
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Navbar />

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 10, px: 4, borderBottom: '1px solid #1F1F1F' }}>
        <Typography variant="h2" fontWeight="bold" color="#C19A54" gutterBottom>
          Welcome to Barrel Exchange
        </Typography>
        <Typography variant="h6" color="gray">
          Discover, sell, and collect rare bourbon with trusted enthusiasts.
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#C19A54',
            color: '#C19A54',
            mt: 3,
            '&:hover': {
              backgroundColor: '#C19A54',
              color: '#000',
            },
          }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Carousel */}
      <Box sx={{ maxWidth: '1440px', mx: 'auto', px: 4, py: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Featured Bottles
        </Typography>

        <Slider {...sliderSettings}>
          {featuredBottles.map((bottle, index) => (
            <Box
              key={index}
              px={1}
              sx={{
                width: 300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 220,
                  bgcolor: '#1F1F1F',
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={bottle.image}
                  alt={bottle.name}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'center' }}>
                {bottle.name}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* About Section */}
      <Box sx={{ bgcolor: '#1A1A1A', py: 10 }}>
        <Box sx={{ maxWidth: '1440px', mx: 'auto', px: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" color="#C19A54" gutterBottom>
              Why Barrel Exchange?
            </Typography>
            <Typography variant="body1" color="gray" sx={{ maxWidth: 800, mx: 'auto' }}>
              We're more than just a marketplace—we're a community of bourbon collectors who value trust, transparency, and premium experiences.
            </Typography>
          </Box>

          <Grid container spacing={6} justifyContent="center" alignItems="center">
            {[
              {
                icon: '🏷️',
                title: 'Great Value',
                desc: 'List your first bottle for just a small fee. You only pay when a sale is made.',
              },
              {
                icon: '📈',
                title: 'Powerful Tools',
                desc: 'Easily manage your listings, view insights, and grow your collector’s profile.',
              },
              {
                icon: '📘',
                title: 'Support & Education',
                desc: 'Reach out anytime or explore our Seller’s Guide to get the most out of Barrel Exchange.',
              },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      backgroundColor: '#D8E5F1',
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 40,
                      color: '#1A1A1A',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="white" sx={{ mt: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="gray" sx={{ maxWidth: 300, mx: 'auto' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
