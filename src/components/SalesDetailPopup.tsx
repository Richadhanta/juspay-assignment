import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Box,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import type { SalesBreakdownData } from '../types/dashboard';
import { formatCurrency } from '../utils/formatters';

/**
 * Sales Detail Popup Component
 * Shows detailed information when clicking on pie chart sections
 */

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    minWidth: 320,
    maxWidth: 480,
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
      minWidth: 280,
      maxWidth: 'calc(100vw - 32px)'
    }
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 2),
  }
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2)
}));

const ColorDot = styled('div')<{ color: string }>(({ color, theme }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  backgroundColor: color,
  boxShadow: `0 0 0 2px ${color}20`,
  [theme.breakpoints.down('sm')]: {
    width: 14,
    height: 14,
  }
}));

const MetricRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

interface SalesDetailPopupProps {
  open: boolean;
  onClose: () => void;
  selectedData: SalesBreakdownData | null;
  totalSales: number;
  color: string;
}

const SalesDetailPopup: React.FC<SalesDetailPopupProps> = ({
  open,
  onClose,
  selectedData,
  totalSales,
  color
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!selectedData) return null;

  const percentage = totalSales ? ((selectedData.value / totalSales) * 100).toFixed(1) : '0.0';
  const averageOrderValue = selectedData.value / Math.max(1, Math.floor(selectedData.value / 50)); // Mock calculation

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Sales Details
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ 
            color: 'text.secondary',
            '&:hover': { backgroundColor: 'action.hover' }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <CategoryHeader>
          <ColorDot color={color} />
          <Typography 
            variant="h5" 
            sx={{ 
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {selectedData.category}
          </Typography>
        </CategoryHeader>

        <Stack spacing={2}>
          <MetricRow>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              Total Revenue
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                fontSize: isMobile ? '1.1rem' : '1.25rem'
              }}
            >
              {formatCurrency(selectedData.value)}
            </Typography>
          </MetricRow>

          <Divider />

          <MetricRow>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              Percentage of Total Sales
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600,
                color: color,
                fontSize: isMobile ? '1rem' : '1.1rem'
              }}
            >
              {percentage}%
            </Typography>
          </MetricRow>

          <MetricRow>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              Average Order Value
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
                fontSize: isMobile ? '1rem' : '1.1rem'
              }}
            >
              {formatCurrency(averageOrderValue)}
            </Typography>
          </MetricRow>

          <MetricRow>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
            >
              Estimated Orders
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
                fontSize: isMobile ? '1rem' : '1.1rem'
              }}
            >
              {Math.floor(selectedData.value / averageOrderValue).toLocaleString()}
            </Typography>
          </MetricRow>

          <Divider />

          <Box 
            sx={{ 
              backgroundColor: `${color}10`,
              padding: theme.spacing(2),
              borderRadius: theme.spacing(1),
              border: `1px solid ${color}20`
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                textAlign: 'center'
              }}
            >
              This channel contributes <strong>{percentage}%</strong> to your total sales revenue
            </Typography>
          </Box>
        </Stack>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SalesDetailPopup;