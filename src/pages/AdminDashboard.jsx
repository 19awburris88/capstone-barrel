import { Box } from '@mui/material';
import SummaryCards from '../components/SummaryCards';
import ProductsTable from '../components/ProductsTable';
import UsersTable from '../components/UsersTable';
import OrdersTable from '../components/OrdersTable';

export default function AdminDashboard() {
  return (
    <Box minHeight="100vh" bgcolor="#121212" color="#fff" p={4}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Admin Dashboard
      </h1>

      <SummaryCards />

      <Box mt={4}>
        <ProductsTable />
      </Box>

      <Box
        sx={{
          width: '100vw',
        height: '100vh',
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          mt: 4,
        }}
      >
        <Box flex="1 1 50%">
          <UsersTable />
        </Box>
        <Box flex="1 1 50%">
          <OrdersTable />
        </Box>
      </Box>
    </Box>
  );
}
