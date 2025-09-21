import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ProductData } from '../types/dashboard';
import { formatCurrency } from '../utils/formatters';

const TableContainerStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  boxShadow: 'none',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const ResponsiveTableWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      height: 8,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[100],
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: 4,
      '&:hover': {
        backgroundColor: theme.palette.grey[500],
      },
    },
  }
}));

const StyledTable = styled(Table)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    minWidth: 600, // Ensure minimum width for horizontal scrolling
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  padding: theme.spacing(1.5, 1),
  fontSize: '12px',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 0.5),
    fontSize: '11px',
  }
}));

const HeaderCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
  }
}));

const DataCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 400
}));

const ProductNameCell = styled(DataCell)(({ theme }) => ({
  minWidth: 180,
  maxWidth: 220,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('md')]: {
    minWidth: 160,
    maxWidth: 200,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 140,
    maxWidth: 180,
  }
}));

const ScrollIndicator = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '11px',
    opacity: 0.8,
    fontWeight: 500,
  }
}));

interface ProductsTableProps {
  data: ProductData[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <TableContainerStyled>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          fontWeight: 600
        }}
      >
        Top Selling Products
      </Typography>
      
      <ResponsiveTableWrapper>
        <TableContainer>
          <StyledTable>
            <TableHead>
              <TableRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell align="right">Price</HeaderCell>
                <HeaderCell align="right">Quantity</HeaderCell>
                <HeaderCell align="right">Amount</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((product, index) => (
                <TableRow 
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.action?.hover || 'rgba(0, 0, 0, 0.04)',
                    }
                  }}
                >
                  <ProductNameCell title={product.name}>
                    {product.name}
                  </ProductNameCell>
                  <DataCell align="right">
                    {formatCurrency(product.price)}
                  </DataCell>
                  <DataCell align="right">
                    {product.quantity}
                  </DataCell>
                  <DataCell align="right">
                    {formatCurrency(product.amount)}
                  </DataCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </ResponsiveTableWrapper>
      
      {isMobile && (
        <ScrollIndicator>
          ← Scroll horizontally to see more →
        </ScrollIndicator>
      )}
    </TableContainerStyled>
  );
};

export default ProductsTable;