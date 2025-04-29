import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Button,
  TextField,
  Modal,
  Stack,
} from '@mui/material';
import Navbar from '../components/Navbar'; // ✅ Import Navbar
import ProfileHeader from '../components/ProfileHeader';
import { useNavigate } from 'react-router-dom';

export default function UserStore() {
  const navigate = useNavigate();

  // 🔒 Check if admin token exists
  const adminToken = localStorage.getItem('adminToken');

  const [userProducts, setUserProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newBottle, setNewBottle] = useState({
    name: '',
    price: '',
    proof: '',
    image: '',
  });

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin-login'); // Redirect non-admins to login
      return;
    }

    const fetchBottles = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        const data = await res.json();
        setAllProducts(data);
        setUserProducts(data); // Admin sees all products
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      }
    };

    fetchBottles();
  }, [adminToken, navigate]);

  const handleAddBottle = () => {
    const newBottleWithAdmin = { ...newBottle };
    setUserProducts(prev => [...prev, newBottleWithAdmin]);
    setShowAddModal(false);
    setNewBottle({ name: '', price: '', proof: '', image: '' });
  };

  const handleEditBottle = () => {
    const updated = [...userProducts];
    updated[editIndex] = { ...newBottle };
    setUserProducts(updated);
    setShowEditModal(false);
    setNewBottle({ name: '', price: '', proof: '', image: '' });
    setEditIndex(null);
  };

  const handleDeleteBottle = (index) => {
    const updated = [...userProducts];
    updated.splice(index, 1);
    setUserProducts(updated);
  };

  const openEditModal = (index) => {
    setNewBottle(userProducts[index]);
    setEditIndex(index);
    setShowEditModal(true);
  };

  const filteredSearchResults = allProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#121212' }}>
      {/* ✅ Add Navbar here */}
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Admin Profile Header */}
        <ProfileHeader
          name="Admin User"
          location="Admin Access"
          bio="Manage all bottle listings."
          avatarUrl="https://i.pravatar.cc/150?u=admin"
        />

        {/* Manage Bottles */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 4 }}>
          <Button
            variant="outlined"
            onClick={() => setShowAddModal(true)}
            sx={{
              borderColor: '#C19A54',
              color: '#C19A54',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#C19A54',
                color: '#000',
              },
            }}
          >
            ➕ Add New Bottle
          </Button>

          <TextField
            variant="outlined"
            placeholder="Search Bottles"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              input: { color: 'white' },
              label: { color: '#bbb' },
              bgcolor: '#1e1e1e',
              borderRadius: 1,
            }}
          />
        </Box>

        {/* Bottles Grid */}
        <Typography variant="h5" fontWeight="bold" mb={2} color="#fff">
          All Bottles
        </Typography>

        {userProducts.length === 0 ? (
          <Typography color="#aaa">No bottles listed yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {userProducts.map((bottle, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={bottle.image}
                    alt={bottle.name}
                    sx={{ height: 200, objectFit: 'contain', backgroundColor: '#1a1a1a', p: 1 }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {bottle.name}
                    </Typography>
                    <Typography variant="body2" color="#ccc">
                      {bottle.price}
                    </Typography>
                    <Typography variant="body2" color="#ccc">
                      Proof: {bottle.proof}
                    </Typography>
                  </CardContent>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      fullWidth
                      onClick={() => openEditModal(index)}
                      sx={{
                        borderColor: '#C19A54',
                        color: '#C19A54',
                        '&:hover': {
                          bgcolor: '#C19A54',
                          color: '#000',
                        },
                      }}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => handleDeleteBottle(index)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add/Edit Modal */}
        <Modal
          open={showAddModal || showEditModal}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setEditIndex(null);
            setNewBottle({ name: '', price: '', proof: '', image: '' });
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: '#1e1e1e',
              p: 4,
              borderRadius: 2,
              mx: 'auto',
              mt: 10,
              color: 'white',
            }}
          >
            <Typography variant="h6" mb={3}>
              {showEditModal ? 'Edit Bottle' : 'Add New Bottle'}
            </Typography>

            <Stack spacing={2}>
              <TextField
                variant="filled"
                label="Bottle Name"
                value={newBottle.name}
                onChange={(e) => setNewBottle({ ...newBottle, name: e.target.value })}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
              <TextField
                variant="filled"
                label="Price"
                value={newBottle.price}
                onChange={(e) => setNewBottle({ ...newBottle, price: e.target.value })}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
              <TextField
                variant="filled"
                label="Proof"
                value={newBottle.proof}
                onChange={(e) => setNewBottle({ ...newBottle, proof: e.target.value })}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
              <TextField
                variant="filled"
                label="Image URL"
                value={newBottle.image}
                onChange={(e) => setNewBottle({ ...newBottle, image: e.target.value })}
                sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
              />
              <Button
                variant="contained"
                onClick={showEditModal ? handleEditBottle : handleAddBottle}
                sx={{ bgcolor: '#C19A54', color: '#000', fontWeight: 'bold' }}
              >
                {showEditModal ? 'Save Changes' : 'Add Bottle'}
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}
