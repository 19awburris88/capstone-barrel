import { Box, Typography, Rating, Card, CardContent, Stack, Divider } from '@mui/material';
import { reviews } from '../data/userData';

export default function Reviews() {
  return (
    <Box sx={{ borderBottom: '1px solid #444', pb: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Reviews
      </Typography>
      <Stack spacing={2} divider={<Divider sx={{ borderColor: '#444' }} />}>
        {reviews.map((review, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: '#292929',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              color: '#fff',
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.name}
              </Typography>
              <Rating value={review.rating} precision={0.5} readOnly />
              <Typography variant="body2" mt={1} color="#fff">
                {review.comment}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
