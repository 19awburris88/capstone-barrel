import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
} from '@mui/material';
import Navbar from '../components/Navbar';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/users');
        const data = await res.json();

        const enhanced = data.map((user, index) => ({
          ...user,
          profilePic:
            user.profilePic || `https://i.pravatar.cc/300?img=${index + 5}`,
        }));

        setUsers(enhanced);
      } catch (err) {
        console.error('❌ Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      {/* ⬅️ Add clean page padding and center content */}
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 6, maxWidth: '1600px', mx: 'auto' }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Explore Users
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {users.slice(0, 32).map((user, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#1e1e1e',
                  borderRadius: 2,
                  color: '#fff',
                  height: '100%',
                  minHeight: 400,
                }}
              >
                {/* ✅ Use the correct 'name' field from seed.js */}
                <CardHeader
                  title={user.name || 'Unnamed'}
                  titleTypographyProps={{ fontWeight: 'bold', fontSize: '1rem' }}
                  sx={{ padding: 2, backgroundColor: '#2a2a2a' }}
                />

                <CardMedia
                  component="img"
                  image={user.profilePic}
                  alt={user.name}
                  sx={{
                    height: 220,
                    objectFit: 'cover',
                    backgroundColor: '#1a1a1a',
                  }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    {user.bio || 'No bio available.'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
