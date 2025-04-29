import { Box, TextField, Typography, Slider, Divider } from '@mui/material';

export default function ProductFilterSidebar({ filters, setFilters }) {
  return (
    <Box
      sx={{
        width: 280,
        backgroundColor: '#1e1e1e',
        borderRadius: 3,
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        p: 4,
        color: 'white',
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        color="#C19A54"
        mb={3}
        sx={{ letterSpacing: 1 }}
      >
        Filter Bottles
      </Typography>

      {/* 🔍 Search */}
      <TextField
        fullWidth
        label="Search by Name"
        variant="filled"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        sx={{
          mb: 4,
          input: {
            color: '#fff',
            backgroundColor: '#2a2a2a',
            borderRadius: 1,
            padding: '10px 14px',
          },
          label: {
            color: '#bbb',
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
              border: '1px solid #C19A54',
            },
          },
        }}
      />

      <Divider sx={{ bgcolor: '#444', my: 3 }} />

      {/* 💵 Price Range */}
      <Typography variant="subtitle2" color="#aaa" gutterBottom>
        Price Range (${filters.price[0]} – ${filters.price[1]})
      </Typography>
      <Slider
        value={filters.price}
        onChange={(_, newValue) => setFilters({ ...filters, price: newValue })}
        min={0}
        max={2500}
        step={50}
        sx={{
          color: '#C19A54',
          mb: 4,
          '& .MuiSlider-thumb': {
            border: '2px solid #C19A54',
          },
        }}
      />

      {/* 🔥 Proof Range */}
      <Typography variant="subtitle2" color="#aaa" gutterBottom>
        Proof Range ({filters.proof[0]} – {filters.proof[1]})
      </Typography>
      <Slider
        value={filters.proof}
        onChange={(_, newValue) => setFilters({ ...filters, proof: newValue })}
        min={80}
        max={140}
        step={1}
        sx={{
          color: '#03dac6',
          '& .MuiSlider-thumb': {
            border: '2px solid #03dac6',
          },
        }}
      />
    </Box>
  );
}
