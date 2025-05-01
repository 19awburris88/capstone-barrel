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

export default function ProductsTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleEdit = (index) => {
    alert(`Edit Product: ${products[index].name} (not built yet)`);
  };

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
        Products
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#ccc' }}>Name</TableCell>
            <TableCell sx={{ color: '#ccc' }}>Proof</TableCell>
            <TableCell sx={{ color: '#ccc' }}>Price</TableCell>
            <TableCell sx={{ color: '#ccc' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>{product.name}</TableCell>
              <TableCell sx={{ color: '#ccc' }}>{product.proof}</TableCell>
              <TableCell sx={{ color: '#ccc' }}>{product.price}</TableCell>
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
