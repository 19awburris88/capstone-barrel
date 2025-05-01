import { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Stack,
} from '@mui/material';

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/users');
        const data = await res.json();

        console.log('👥 Users response:', data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error('❌ Unexpected user response format:', data);
        }
      } catch (err) {
        console.error('❌ Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
  };

  const handleEdit = (index) => {
    alert(`Edit User: ${users[index].name} (coming soon!)`);
  };

  if (!Array.isArray(users)) {
    return <Typography color="error">No user data loaded.</Typography>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: '#1e1e1e',
        borderRadius: 2,
        p: 2,
        color: '#fff',
        overflowX: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ccc' }}>Name</TableCell>
            <TableCell sx={{ color: '#ccc' }}>Location</TableCell>
            <TableCell sx={{ color: '#ccc' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>{user.name}</TableCell>
              <TableCell sx={{ color: '#ccc' }}>{user.location}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleEdit(idx)}
                    sx={{
                      borderColor: '#C19A54',
                      color: '#C19A54',
                      '&:hover': {
                        bgcolor: '#C19A54',
                        color: '#000',
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}