import { Box, Typography, Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { marketplace } from '../data/userData';

export default function Marketplace() {
  return (
    <Box sx={{ borderBottom: '1px solid #444', pb: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Marketplace Listings
      </Typography>
      <Grid container spacing={2}>
        {marketplace.map((item, index) => (
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
                  borderRadius: 2,
                }}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="#eb9f1c">
                  {item.price}
                </Typography>
                <Chip
                  label={item.condition}
                  size="small"
                  sx={{ mt: 1, backgroundColor: '#3a3a3a', color: '#fff' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
