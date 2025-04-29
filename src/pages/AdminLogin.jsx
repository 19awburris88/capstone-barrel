import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Alert,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token && data.role === 'admin') {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError('Invalid credentials or not authorized as admin.');
      }
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError('Server error. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#0B0B0B',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 350,
          p: 4,
          bgcolor: '#1F1F1F',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Avatar sx={{ bgcolor: '#C19A54', width: 56, height: 56, mb: 2 }}>
          <LockIcon sx={{ color: '#000' }} />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" mb={3} color="#C19A54">
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            InputLabelProps={{ style: { color: '#bbb' } }}
            InputProps={{ style: { color: 'white' } }}
            sx={{ mb: 3 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            InputLabelProps={{ style: { color: '#bbb' } }}
            InputProps={{ style: { color: 'white' } }}
            sx={{ mb: 4 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#C19A54',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#d3ac74',
              },
            }}
          >
            SIGN IN
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
