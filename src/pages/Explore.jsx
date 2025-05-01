import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Modal,
  Button,
  Stack,
} from '@mui/material';
import Navbar from '../components/Navbar';
import ProductFilterSidebar from '../components/ProductFilterSidebar';
import blantonImage from '../assets/blanton.png';

export default function Explore() {
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    price: [0, 2500],
    proof: [80, 140],
  });
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBottles = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        const data = await res.json();

        console.log('✅ Raw product data from API:', data);

        const enhanced = data.map((bottle) => ({
          ...bottle,
          image: bottle.image && bottle.image.startsWith('http') ? bottle.image : blantonImage,
        }));

        console.log('🖼️ Enhanced product data with images:', enhanced);

        setAllProducts(enhanced);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      }
    };

    fetchBottles();
  }, []);

  const filteredProducts = allProducts;

  const handleCardClick = (bottle) => {
    setSelectedBottle(bottle);
    setIsModalOpen(true);
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#121212' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#fff">
          Explore Bottles
        </Typography>

        <Stack direction="row" spacing={3}>
          {/* Sidebar - smaller width */}
          <Box sx={{ width: 260 }}>
            <ProductFilterSidebar filters={filters} setFilters={setFilters} />
          </Box>

          {/* Grid - 3 clean columns */}
          <Box sx={{ flexGrow: 1 }}>
            {filteredProducts.length === 0 ? (
              <Typography color="#aaa">No bottles match your filters.</Typography>
            ) : (
              <Grid container columns={3} spacing={3}>
                {filteredProducts.map((bottle, index) => (
                  <Grid key={index} sx={{ gridColumn: 'span 1' }}>
                    <Card
                      onClick={() => handleCardClick(bottle)}
                      sx={{
                        width: 240,
                        height: 380,
                        mx: 'auto',
                        backgroundColor: '#1e1e1e',
                        color: '#fff',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        cursor: 'pointer',
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
                          height: 200,
                          objectFit: 'contain',
                          backgroundColor: '#1a1a1a',
                          p: 1,
                        }}
                      />
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap>
                          {bottle.name}
                        </Typography>
                        <Typography variant="body2" color="#ccc">
                          ${bottle.price}
                        </Typography>
                        <Typography variant="body2" color="#ccc">
                          Proof: {bottle.proof}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Stack>
      </Container>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#1e1e1e',
            color: '#fff',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedBottle && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {selectedBottle.name}
              </Typography>
              <img
                src={selectedBottle.image}
                alt={selectedBottle.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'contain',
                  backgroundColor: '#1a1a1a',
                  padding: '8px',
                }}
              />
              <Typography variant="body2" mt={2}>
                ${selectedBottle.price}
              </Typography>
              <Typography variant="body2">Proof: {selectedBottle.proof}</Typography>
              <Typography variant="body2" mb={2}>
                {selectedBottle.description || 'No description available.'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  window.location.href = `http://localhost:3001/api/checkout/create-checkout-session/${selectedBottle.id}`;
                }}
              >
                Buy Now
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
