import { Box, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';

const menuItems = ['Dashboard', 'Products', 'Users', 'Orders'];

export default function Sidebar() {
  const [active, setActive] = useState('Dashboard');

  return (
    <Box
      sx={{
        width: 220,
        minHeight: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        px: 2,
        py: 4,
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={4}>
        BARREL<br />EXCHANGE
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item}
            onClick={() => setActive(item)}
            sx={{
              mb: 1,
              borderRadius: 1,
              backgroundColor: active === item ? '#333' : 'transparent',
              '&:hover': {
                backgroundColor: '#2a2a2a',
              },
            }}
          >
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                fontWeight: active === item ? 'bold' : 'normal',
                color: active === item ? '#fff' : '#ccc',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
