import { Box, Typography, Chip, Stack } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { badges } from '../data/userData';

const badgeIcons = {
  trophy: <EmojiEventsIcon fontSize="small" />,
  fire: <LocalFireDepartmentIcon fontSize="small" />,
};

export default function Badges() {
  return (
    <Box sx={{ borderBottom: '1px solid #444', pb: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Achievements
      </Typography>
      <Stack direction="row" spacing={2}>
        {badges.map((badge, index) => (
          <Chip
            key={index}
            icon={badgeIcons[badge.icon] || null}
            label={badge.label}
            sx={{
              backgroundColor: '#333',
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
