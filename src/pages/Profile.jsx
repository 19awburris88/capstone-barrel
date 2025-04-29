import { Grid, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import Collection from '../components/Collection';
import Wishlist from '../components/Wishlist';
import Marketplace from '../components/Marketplace';
import Reviews from '../components/Reviews';
import Badges from '../components/Badges';

export default function Profile() {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Box
          sx={{
            width: '95%',
            maxWidth: '1600px',
          }}
        >
          <Box mb={6}>
            <ProfileHeader />
          </Box>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="flex-start"
          >
            {/* LEFT COLUMN */}
            <Grid item xs={12} md={6}>
              <Box mb={4}>
                <Collection />
              </Box>
              <Box>
                <Marketplace />
              </Box>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid item xs={12} md={6}>
              <Box mb={4}>
                <Wishlist />
              </Box>
              <Box mb={4}>
                <Reviews />
              </Box>
              <Box>
                <Badges />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
