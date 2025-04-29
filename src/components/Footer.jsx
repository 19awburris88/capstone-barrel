import React from 'react';
import { Box, Typography, IconButton, Button, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#111',
        color: 'white',
        py: 6,
        px: 4,
        mt: 8,
        borderTop: '1px solid #1F1F1F',
        textAlign: 'center',
      }}
    >
      {/* Call-to-Action */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Join the Bourbon Exchange Revolution
      </Typography>
      <Typography variant="body1" color="gray" mb={2}>
        Sign up today and be part of the collector's community.
      </Typography>
      <Button
        variant="outlined"
        sx={{
          borderColor: 'white',
          color: 'white',
          '&:hover': {
            bgcolor: 'white',
            color: '#111',
          },
        }}
      >
        Get Started
      </Button>

      {/* Social Links */}
      <Stack direction="row" justifyContent="center" spacing={3} mt={5}>
        <IconButton
          component="a"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
        >
          <InstagramIcon />
        </IconButton>
      </Stack>

      {/* Copyright */}
      <Typography variant="body2" color="gray" mt={4}>
        &copy; {new Date().getFullYear()} Barrel Exchange. All rights reserved.
      </Typography>
    </Box>
  );
}
