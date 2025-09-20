import React from 'react';
import { 
  Stack, 
  IconButton, 
  TextField, 
  InputAdornment,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '../icons/SearchIcon';
import AddIcon from '../icons/AddIcon';
import FilterLinesIcon from '../icons/FilterLinesIcon';
import SortArrowsIcon from '../icons/SortArrowsIcon';

const ToolbarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  border: 'none',
  boxShadow: 'none'
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(0.5),
    fontSize: '14px',
    '& fieldset': {
      border: 'none'
    },
    '&:hover fieldset': {
      border: 'none'
    },
    '&.Mui-focused fieldset': {
      border: 'none'
    }
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1.5),
    color: theme.palette.text.primary
  }
}));

interface OrdersToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddOrder?: () => void;
  onFilter?: () => void;
  onSort?: () => void;
}

const OrdersToolbar: React.FC<OrdersToolbarProps> = ({
  searchQuery,
  onSearchChange,
  onAddOrder,
  onFilter,
  onSort
}) => {
  return (
    <ToolbarContainer>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton size="small" onClick={onAddOrder}>
            <AddIcon width={12} height={12} color="currentColor" />
          </IconButton>
          <IconButton size="small" onClick={onFilter}>
            <FilterLinesIcon width={18} height={9} color="currentColor" />
          </IconButton>
          <IconButton size="small" onClick={onSort}>
            <SortArrowsIcon width={14} height={14} color="currentColor" />
          </IconButton>
        </Stack>
        
        <SearchField
          placeholder="Search"
          size="small"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ width: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon width={16} height={16} color="currentColor" />
              </InputAdornment>
            )
          }}
        />
      </Stack>
    </ToolbarContainer>
  );
};

export default OrdersToolbar;