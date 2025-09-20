import React, { useState, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from '../Sidebar';
import Header from '../Header';
import OrdersToolbar from './OrdersToolbar';
import OrdersTable from './OrdersTable';
import OrdersPagination from './OrdersPagination';
import type { OrderData, OrderFilters, OrderStatus } from '../../types/orders';

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  position: 'relative'
}));

const SidebarContainer = styled(Box)({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 1200
});

const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginLeft: '212px',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  [theme.breakpoints.down('lg')]: {
    marginLeft: 0,
  }
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backgroundColor: theme.palette.background.default
}));

const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flexGrow: 1,
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const TableContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1.5),
  overflow: 'hidden',
  border: 'none'
}));

interface OrdersPageProps {
  initialOrders: OrderData[];
  initialFilters?: Partial<OrderFilters>;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ 
  initialOrders, 
  initialFilters = {} 
}) => {
  const [filters, setFilters] = useState<OrderFilters>({
    search: '',
    status: null,
    sortBy: 'date',
    sortDirection: 'desc',
    page: 1,
    itemsPerPage: 10,
    ...initialFilters
  });

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...initialOrders];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(order =>
        order.id.toLowerCase().includes(searchLower) ||
        order.user.name.toLowerCase().includes(searchLower) ||
        order.project.toLowerCase().includes(searchLower) ||
        order.address.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(order => order.status === filters.status);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      // Handle different column types
      switch (filters.sortBy) {
        case 'user':
          aValue = a.user.name.toLowerCase();
          bValue = b.user.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        case 'id':
          aValue = a.id.toLowerCase();
          bValue = b.id.toLowerCase();
          break;
        case 'project':
          aValue = a.project.toLowerCase();
          bValue = b.project.toLowerCase();
          break;
        case 'address':
          aValue = a.address.toLowerCase();
          bValue = b.address.toLowerCase();
          break;
        default:
          aValue = a[filters.sortBy];
          bValue = b[filters.sortBy];
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
      }

      // Compare values
      if (aValue < bValue) return filters.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [initialOrders, filters]);

  // Paginate orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (filters.page - 1) * filters.itemsPerPage;
    const endIndex = startIndex + filters.itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, endIndex);
  }, [filteredAndSortedOrders, filters.page, filters.itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / filters.itemsPerPage);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleSort = (column: keyof OrderData) => {
    setFilters(prev => ({
      ...prev,
      sortBy: column,
      sortDirection: prev.sortBy === column && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectionChange = (orderIds: string[]) => {
    setSelectedOrders(orderIds);
  };

  return (
    <MainContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      
      <ContentArea>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        
        <MainContent>
          <Typography variant="h6" sx={{ mb: 3, fontSize: 14, fontWeight: 600 }}>
            Order List
          </Typography>
          
          <Stack spacing={1.5}>
            <OrdersToolbar
              searchQuery={filters.search}
              onSearchChange={handleSearchChange}
              onAddOrder={() => console.log('Add order')}
              onFilter={() => console.log('Filter orders')}
              onSort={() => console.log('Sort orders')}
            />
            
            <TableContainer>
              <OrdersTable
                orders={paginatedOrders}
                selectedOrders={selectedOrders}
                onSelectionChange={handleSelectionChange}
                onSort={handleSort}
                sortBy={filters.sortBy}
                sortDirection={filters.sortDirection}
              />
              
              <OrdersPagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </TableContainer>
          </Stack>
        </MainContent>
      </ContentArea>
    </MainContainer>
  );
};

export default OrdersPage;