import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import ProductModal from '../components/ProductModal';
import ProductFilterSidebar from '../components/ProductFilterSidebar';

export default function Explore() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    price: [0, 2500],
    proof: [80, 150],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        const data = await res.json();
        console.log('🍾 Raw products from backend:', data);

        const enhanced = data.map((product, index) => ({
          ...product,
          image: product.image || `https://loremflickr.com/300/400/whiskey,bottle?lock=${index}`,
        }));

        console.log('🧪 Enhanced products:', enhanced);
        setProducts(enhanced);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(filters.search.toLowerCase());
    const priceValue = parseFloat((product.price || '').replace('$', '')) || 0;
    const proofValue = parseFloat(product.proof) || 0;
    const matchesPrice = priceValue >= filters.price[0] && priceValue <= filters.price[1];
    const matchesProof = proofValue >= filters.proof[0] && proofValue <= filters.proof[1];
    return matchesSearch && matchesPrice && matchesProof;
  });

  if (!products.length) {
    return (
      <Box sx={{ p: 4, color: 'white' }}>
        <Typography variant="h6">No products loaded. Check your fetch.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff', display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: 280, p: 4 }}>
        <ProductFilterSidebar filters={filters} setFilters={setFilters} />
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Explore Bottles
        </Typography>

        <Grid container spacing={3}>
          {filteredProducts.slice(0, 32).map((product, index) => (
            <Grid key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#1e1e1e',
                  borderRadius: 2,
                  color: '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedProduct(product)}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: 220,
                    width: 300,
                    objectFit: 'contain',
                    backgroundColor: '#1a1a1a',
                    p: 1,
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </Box>
  );
}
