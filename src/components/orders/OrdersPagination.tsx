import React from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LeftArrowIcon from '../icons/LeftArrowIcon';
import RightArrowIcon from '../icons/RightArrowIcon';

const PaginationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`
}));

const PageButton = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  minWidth: '32px',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? theme.palette.grey[100] 
      : theme.palette.grey[800]
  }
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? theme.palette.grey[100] 
      : theme.palette.grey[800]
  }
}));

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const OrdersPagination: React.FC<OrdersPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <PaginationContainer>
      <ArrowButton 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        size="small"
      >
        <LeftArrowIcon width={6} height={11} color="currentColor" />
      </ArrowButton>
      
      {getVisiblePages().map((page, index) => (
        <PageButton
          key={index}
          active={page === currentPage}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          sx={{ cursor: typeof page === 'number' ? 'pointer' : 'default' }}
        >
          {page}
        </PageButton>
      ))}
      
      <ArrowButton 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        size="small"
      >
        <RightArrowIcon width={6} height={11} color="currentColor" />
      </ArrowButton>
    </PaginationContainer>
  );
};

export default OrdersPagination;