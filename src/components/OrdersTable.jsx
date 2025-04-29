import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { orders } from '../data/adminData';

export default function OrdersTable() {
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
        Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ccc' }}>Order</TableCell>
            <TableCell sx={{ color: '#ccc' }}>User</TableCell>
            <TableCell sx={{ color: '#ccc' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>{order.order}</TableCell>
              <TableCell sx={{ color: '#ccc' }}>{order.user}</TableCell>
              <TableCell sx={{ color: '#ccc' }}>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
