import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Modal,
  Tabs,
  Tab,
  TextField,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/barrel-logo.png';

export default function Navbar() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    password: '',
    profilePic: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRegisterSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('✅ Registration success:', data);

      if (data.user && data.token) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('adminToken', data.token); // ✅ Store token for access
        setUser(data.user);
        setAuthModalOpen(false);
        navigate('/userstore');
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
    }
  };

  const handleLoginSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      console.log('✅ Login success:', data);

      if (data.user && data.token) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('adminToken', data.token); // ✅ Store token for access
        setUser(data.user);
        setAuthModalOpen(false);
        navigate('/userstore');
      } else {
        console.error('❌ Login failed:', data.error || 'Unknown error');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    setUser(null);
    navigate('/');
  };

  const inputStyles = {
    input: {
      color: '#fff',
      backgroundColor: '#2a2a2a',
      borderRadius: 1,
      padding: '10px 14px',
    },
    textarea: {
      color: '#fff',
      backgroundColor: '#2a2a2a',
      borderRadius: 1,
      padding: '10px 14px',
    },
    label: {
      color: '#aaa',
      '&.Mui-focused': {
        color: '#C19A54',
      },
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#2a2a2a',
      borderRadius: 1,
      '&:hover': {
        backgroundColor: '#333',
      },
      '&.Mui-focused': {
        backgroundColor: '#2a2a2a',
        border: '1px solid #C19A54',
      },
    },
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#1A1A1A', px: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            component="img"
            src={logo}
            alt="Barrel Exchange Logo"
            sx={{ height: 100, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />

          <Stack direction="row" spacing={3}>
            <Button
              color="inherit"
              onClick={() => navigate('/explore')}
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { color: '#C19A54' },
              }}
            >
              Bottles
            </Button>

            <Button
              color="inherit"
              onClick={() => navigate('/users')}
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { color: '#C19A54' },
              }}
            >
              Users
            </Button>

            {user && (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/admin')}
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': { color: '#C19A54' },
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/userstore')}
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': { color: '#C19A54' },
                  }}
                >
                  Manage
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    border: '1px solid #C19A54',
                    '&:hover': {
                      backgroundColor: '#C19A54',
                      color: '#000',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )}

            {!user && (
              <Button
                onClick={() => setAuthModalOpen(true)}
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  border: '1px solid #C19A54',
                  '&:hover': {
                    backgroundColor: '#C19A54',
                    color: '#000',
                  },
                }}
              >
                Login / Register
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Modal open={authModalOpen} onClose={() => setAuthModalOpen(false)}>
        <Box
          sx={{
            width: 420,
            mx: 'auto',
            mt: 12,
            p: 4,
            backgroundColor: '#1e1e1e',
            borderRadius: 3,
            color: '#fff',
            boxShadow: 24,
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 3,
              '& .MuiTab-root': { color: '#bbb' },
              '& .Mui-selected': { color: '#C19A54' },
              '& .MuiTabs-indicator': { backgroundColor: '#C19A54' },
            }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {tab === 0 && (
            <Stack spacing={2}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                name="email"
                value={form.email}
                onChange={handleInputChange}
                sx={inputStyles}
              />
              <TextField
                label="Password"
                variant="filled"
                type="password"
                fullWidth
                name="password"
                value={form.password}
                onChange={handleInputChange}
                sx={inputStyles}
              />
              <Button
                variant="contained"
                sx={{ bgcolor: '#C19A54', color: '#000', fontWeight: 'bold' }}
                onClick={handleLoginSubmit}
              >
                Login
              </Button>
            </Stack>
          )}

          {tab === 1 && (
            <Stack spacing={2}>
              <TextField
                label="First Name"
                name="firstName"
                variant="filled"
                fullWidth
                onChange={handleInputChange}
                sx={inputStyles}
              />
              <TextField
                label="Last Name"
                name="lastName"
                variant="filled"
                fullWidth
                onChange={handleInputChange}
                sx={inputStyles}
              />
              <TextField
                label="Short Bio"
                name="bio"
                variant="filled"
                fullWidth
                multiline
                rows={2}
                onChange={handleInputChange}
                sx={inputStyles}
              />
              <Button
                component="label"
                variant="outlined"
                sx={{
                  borderColor: '#ccc',
                  color: '#ccc',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: '#C19A54',
                    color: '#C19A54',
                  },
                }}
              >
                Upload Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  name="profilePic"
                  onChange={handleInputChange}
                />
              </Button>
              <TextField
                label="Email"
                name="email"
                variant="filled"
                fullWidth
                onChange={handleInputChange}
                sx={inputStyles}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="filled"
                fullWidth
                onChange={handleInputChange}
                sx={inputStyles}
              />
              <Button
                variant="contained"
                sx={{ bgcolor: '#C19A54', color: '#000', fontWeight: 'bold' }}
                onClick={handleRegisterSubmit}
              >
                Register
              </Button>
            </Stack>
          )}
        </Box>
      </Modal>
    </>
  );
}
