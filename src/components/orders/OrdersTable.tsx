import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Stack,
  Box,
  TableSortLabel,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import type { OrderData, OrderStatus } from '../../types/orders';
import { formatOrderId, formatOrderDate } from '../../utils/orderFormatters';
import StatusBadge from './StatusBadge';
import UserCell from './UserCell';
import ActionMenu from './ActionMenu';
import CalendarDateIcon from '../icons/CalendarDateIcon';
import ExternalIcon from '../icons/ExternalIcon';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 0
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  padding: theme.spacing(1.5, 2),
  fontSize: '12px',
  fontWeight: 400,
  borderBottom: `1px solid ${theme.palette.grey[200]}`
}));

const HeaderCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 400,
  borderBottom: 'none',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? theme.palette.grey[100] 
      : theme.palette.grey[800]
  }
}));

const DataCell = styled(StyledTableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.grey[200]}`
}));

const CheckboxCell = styled(DataCell)({
  width: 48,
  paddingLeft: 16,
  paddingRight: 8
});

const ActionCell = styled(DataCell)(({ theme }) => ({
  width: 48,
  paddingLeft: 8,
  paddingRight: 16,
  borderBottom: `1px solid ${theme.palette.grey[300]}`
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(28, 28, 28, 0.04)' 
      : 'rgba(255, 255, 255, 0.04)',
    '& .action-menu': {
      opacity: 1
    }
  }
}));

const ActionMenuContainer = styled(Box)({
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  '&.action-menu': {
    opacity: 0
  }
});

interface OrdersTableProps {
  orders: OrderData[];
  selectedOrders: string[];
  onSelectionChange: (orderIds: string[]) => void;
  onSort?: (column: keyof OrderData) => void;
  sortBy?: keyof OrderData;
  sortDirection?: 'asc' | 'desc';
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  selectedOrders,
  onSelectionChange,
  onSort,
  sortBy,
  sortDirection
}) => {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(orders.map(order => order.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedOrders, orderId]);
    } else {
      onSelectionChange(selectedOrders.filter(id => id !== orderId));
    }
  };

  const handleSort = (column: keyof OrderData) => {
    if (onSort) {
      onSort(column);
    }
  };

  const isAllSelected = orders.length > 0 && selectedOrders.length === orders.length;
  const isIndeterminate = selectedOrders.length > 0 && selectedOrders.length < orders.length;

  const getSortIcon = (column: keyof OrderData) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? 
      <ArrowUpwardIcon sx={{ fontSize: 14, ml: 0.5 }} /> : 
      <ArrowDownwardIcon sx={{ fontSize: 14, ml: 0.5 }} />;
  };

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <CheckboxCell>
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={(e) => handleSelectAll(e.target.checked)}
                size="small"
                sx={{ 
                  color: 'text.disabled',
                  '&.Mui-checked': { color: 'text.primary' }
                }}
              />
            </CheckboxCell>
            <HeaderCell onClick={() => handleSort('id')}>
              <Stack direction="row" alignItems="center">
                Order ID
                {getSortIcon('id')}
              </Stack>
            </HeaderCell>
            <HeaderCell onClick={() => handleSort('user')}>
              <Stack direction="row" alignItems="center">
                User
                {getSortIcon('user')}
              </Stack>
            </HeaderCell>
            <HeaderCell onClick={() => handleSort('project')}>
              <Stack direction="row" alignItems="center">
                Project
                {getSortIcon('project')}
              </Stack>
            </HeaderCell>
            <HeaderCell onClick={() => handleSort('address')}>
              <Stack direction="row" alignItems="center">
                Address
                {getSortIcon('address')}
              </Stack>
            </HeaderCell>
            <HeaderCell onClick={() => handleSort('date')}>
              <Stack direction="row" alignItems="center">
                Date
                {getSortIcon('date')}
              </Stack>
            </HeaderCell>
            <HeaderCell onClick={() => handleSort('status')}>
              <Stack direction="row" alignItems="center">
                Status
                {getSortIcon('status')}
              </Stack>
            </HeaderCell>
            <ActionCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <StyledTableRow key={`${order.id}-${index}`}>
              <CheckboxCell>
                <Checkbox
                  checked={selectedOrders.includes(order.id)}
                  onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                  size="small"
                  sx={{ 
                    color: 'text.disabled',
                    '&.Mui-checked': { color: 'text.primary' }
                  }}
                />
              </CheckboxCell>
              <DataCell>
                <Typography variant="body2">
                  {formatOrderId(order.id)}
                </Typography>
              </DataCell>
              <DataCell>
                <UserCell name={order.user.name} avatar={order.user.avatar} />
              </DataCell>
              <DataCell>
                <Typography variant="body2">{order.project}</Typography>
              </DataCell>
              <DataCell>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography variant="body2">{order.address}</Typography>
                  {order.address === 'Nest Lane Olivette' && (
                    <ExternalIcon width={11} height={13} color="currentColor" />
                  )}
                </Stack>
              </DataCell>
              <DataCell>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <CalendarDateIcon width={12} height={13} color="currentColor" />
                  <Typography variant="body2">
                    {formatOrderDate(order.date)}
                  </Typography>
                </Stack>
              </DataCell>
              <DataCell>
                <StatusBadge status={order.status} />
              </DataCell>
              <ActionCell>
                <ActionMenuContainer className="action-menu">
                  <ActionMenu
                    onView={() => console.log('View order', order.id)}
                    onEdit={() => console.log('Edit order', order.id)}
                    onDelete={() => console.log('Delete order', order.id)}
                  />
                </ActionMenuContainer>
              </ActionCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default OrdersTable;