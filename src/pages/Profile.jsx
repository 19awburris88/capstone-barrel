import { Container, Grid, Box } from '@mui/material';
import ProfileHeader from '../components/ProfileHeader';
import Collection from '../components/Collection';
import Wishlist from '../components/Wishlist';
import Marketplace from '../components/Marketplace';
import Reviews from '../components/Reviews';
import Badges from '../components/Badges';

export default function Profile() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Full-width profile header */}
      <Box mb={6}>
        <ProfileHeader />
      </Box>

      {/* 2-column grid, centered */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={5.5}>
          <Box>
            <Collection />
          </Box>
          <Box>
            <Marketplace />
          </Box>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={5.5}>
          <Box>
            <Wishlist />
          </Box>
          <Box>
            <Reviews />
          </Box>
          <Box>
            <Badges />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
