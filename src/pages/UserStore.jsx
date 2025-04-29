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
import ProfileHeader from '../components/ProfileHeader';
import { useNavigate } from 'react-router-dom';

export default function UserStore() {
  const navigate = useNavigate();

  // Safely pull current user from localStorage
  const storedUser = localStorage.getItem('user');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

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
    if (!currentUser) {
      navigate('/admin-login'); // Redirect to login if no user
      return;
    }

    const fetchBottles = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        const data = await res.json();
        setAllProducts(data);

        const myBottles = data.filter((b) => b.seller_id === currentUser.id);
        setUserProducts(myBottles);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      }
    };

    fetchBottles();
  }, [currentUser, navigate]);

  const handleAddBottle = () => {
    if (!currentUser) return; // protect

    const newBottleWithSeller = { ...newBottle, seller_id: currentUser.id };
    setUserProducts(prevProducts => [...prevProducts, newBottleWithSeller]);
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
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#121212', py: 6 }}>
      <Container maxWidth="lg">
        {/* Profile Header */}
        <ProfileHeader
          name={currentUser?.name}
          location={currentUser?.location || 'Unknown'}
          bio={currentUser?.bio || 'No bio yet.'}
          avatarUrl={currentUser?.avatar_url || 'https://i.pravatar.cc/150'}
        />

        {/* Manage Bottles Section */}
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
            placeholder="Search to Add"
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

        {/* Your Bottles Listing */}
        <Typography variant="h5" fontWeight="bold" mb={2} color="#fff">
          Your Bottles
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

        {/* Search Add Results */}
        {search && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" mb={2} color="#fff">
              Search Results
            </Typography>
            <Grid container spacing={2}>
              {filteredSearchResults.slice(0, 8).map((product, idx) => (
                <Grid item xs={6} sm={4} md={3} key={idx}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                      setUserProducts(prev => [...prev, { ...product, seller_id: currentUser.id }])
                    }
                    sx={{
                      borderColor: '#C19A54',
                      color: '#C19A54',
                      '&:hover': {
                        bgcolor: '#C19A54',
                        color: '#000',
                      },
                    }}
                  >
                    ➕ {product.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
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
