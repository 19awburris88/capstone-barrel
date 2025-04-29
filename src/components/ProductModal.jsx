import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material';

export default function ProductModal({ product, onClose }) {
  const handleBuyNow = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // ✅ Redirect to Stripe
      } else {
        alert('⚠️ Checkout failed to initialize.');
      }
    } catch (err) {
      console.error('❌ Stripe Checkout Error:', err);
      alert('❌ Something went wrong. Try again.');
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          color: '#fff',
          width: 400,
          mx: 'auto',
          mt: 10,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {product.name}
        </Typography>

        <img
          src={product.image || 'https://via.placeholder.com/300x400'}
          alt={product.name}
          style={{
            width: '100%',
            objectFit: 'contain',
            backgroundColor: '#121212',
            marginBottom: '1rem',
            borderRadius: 8,
          }}
        />

        <Typography variant="body2" color="#ccc" mb={1}>
          {product.description || 'No description available.'}
        </Typography>
        <Typography variant="body2" color="#ccc">
          Proof: {product.proof || 'N/A'}
        </Typography>
        <Typography variant="body2" color="#ccc">
          Seller: {product.seller || 'Unknown'}
        </Typography>

        <Divider sx={{ my: 2, borderColor: '#333' }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          {product.price}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleBuyNow}
          sx={{
            bgcolor: '#C19A54',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#e6b87e',
            },
          }}
        >
          Buy It Now
        </Button>
      </Box>
    </Modal>
  );
}
