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
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import { useNavigate } from 'react-router-dom';
import blantonImage from '../assets/blanton.png'; // ✅ Import local image

export default function UserStore() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');

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
      navigate('/admin-login');
      return;
    }

    const fetchBottles = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        const data = await res.json();

        const enhanced = data.map((bottle) => ({
          ...bottle,
          image: bottle.image && bottle.image.startsWith('http') ? bottle.image : blantonImage,
        }));

        setAllProducts(enhanced);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      }
    };

    fetchBottles();
  }, [adminToken, navigate]);

  // 🔥 Correct live search filtering
  const filteredProducts = allProducts.filter((bottle) =>
    bottle.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddBottle = () => {
    const newBottleWithImage = { ...newBottle, image: newBottle.image || blantonImage };
    setAllProducts((prev) => [...prev, newBottleWithImage]);
    setShowAddModal(false);
    setNewBottle({ name: '', price: '', proof: '', image: '' });
  };

  const handleEditBottle = () => {
    const updated = [...allProducts];
    updated[editIndex] = { ...newBottle, image: newBottle.image || blantonImage };
    setAllProducts(updated);
    setShowEditModal(false);
    setNewBottle({ name: '', price: '', proof: '', image: '' });
    setEditIndex(null);
  };

  const handleDeleteBottle = (index) => {
    const updated = [...allProducts];
    updated.splice(index, 1);
    setAllProducts(updated);
  };

  const openEditModal = (index) => {
    setNewBottle(filteredProducts[index]);
    setEditIndex(index);
    setShowEditModal(true);
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#121212' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <ProfileHeader
          name="Admin User"
          location="Admin Access"
          bio="Manage all bottle listings."
          avatarUrl="https://i.pravatar.cc/150?u=admin"
        />

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

        <Typography variant="h5" fontWeight="bold" mb={2} color="#fff">
          All Bottles
        </Typography>

        {filteredProducts.length === 0 ? (
          <Typography color="#aaa">No bottles match your search.</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((bottle, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    width: 280, // ✅ FIXED width
                    height: 420, // ✅ FIXED height
                    mx: 'auto',
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={bottle.image}
                    alt={bottle.name}
                    sx={{
                      height: 220,
                      objectFit: 'contain',
                      backgroundColor: '#1a1a1a',
                      p: 1,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap>
                      {bottle.name}
                    </Typography>
                    <Typography variant="body2" color="#ccc">
                      {bottle.price}
                    </Typography>
                    <Typography variant="body2" color="#ccc">
                      Proof: {bottle.proof}
                    </Typography>
                  </CardContent>

                  <Stack direction="row" spacing={1} mt={2} sx={{ px: 1 }}>
                    <Button
                      fullWidth
                      onClick={() => openEditModal(index)}
                      variant="outlined"
                      sx={{
                        borderColor: '#C19A54',
                        color: '#C19A54',
                        '&:hover': {
                          bgcolor: '#C19A54',
                          color: '#000',
                        },
                      }}
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
      </Container>

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
    </Box>
  );
}
