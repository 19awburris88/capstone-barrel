import { Grid, Paper, Typography } from '@mui/material';
import { stats } from '../data/adminData';

const cardData = [
  { label: 'Total Products', value: stats.totalProducts },
  { label: 'Total Users', value: stats.totalUsers },
  { label: 'Total Orders', value: stats.totalOrders },
];

export default function SummaryCards() {
  return (
    <Grid container spacing={3}>
      {cardData.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: '#1e1e1e',
              p: 3,
              borderRadius: 2,
              color: '#fff',
              textAlign: 'left',
            }}
          >
            <Typography variant="subtitle2" color="#ccc" gutterBottom>
              {stat.label}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
