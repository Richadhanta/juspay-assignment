import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ProductData } from '../types/dashboard';
import { formatCurrency } from '../utils/formatters';

const TableContainer_Styled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  boxShadow: 'none'
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  padding: theme.spacing(1, 0),
  fontSize: '12px',
  fontWeight: 400
}));

const HeaderCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 400
}));

const DataCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.text.primary
}));

interface ProductsTableProps {
  data: ProductData[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data }) => {
  return (
    <TableContainer_Styled>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Top Selling Products
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Price</HeaderCell>
              <HeaderCell>Quantity</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product, index) => (
              <TableRow key={index}>
                <DataCell>{product.name}</DataCell>
                <DataCell>{formatCurrency(product.price)}</DataCell>
                <DataCell>{product.quantity}</DataCell>
                <DataCell>{formatCurrency(product.amount)}</DataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableContainer_Styled>
  );
};

export default ProductsTable;