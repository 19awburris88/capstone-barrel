import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { wishlist } from '../data/userData';

export default function Wishlist() {
  return (
    <Box sx={{ borderBottom: '1px solid #444', pb: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Wishlist
      </Typography>
      <Grid container spacing={2}>
        {wishlist.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#292929',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                color: '#fff',
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                  height: 180,
                  objectFit: 'contain',
                  backgroundColor: '#1e1e1e',
                  p: 1,
                }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Est. Price: {item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
