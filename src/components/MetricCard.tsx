import React from 'react';
import { Card, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { formatNumber, formatPercentage } from '../utils/formatters';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  border: 'none',
  boxShadow: 'none',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const ChangeIndicator = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(0.5)
}));

const ChangeText = styled(Typography)<{ isPositive: boolean }>(({ theme, isPositive }) => ({
  fontSize: '12px',
  fontWeight: 400,
  color: isPositive ? theme.palette.success.main : theme.palette.error.main
}));

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  backgroundColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, backgroundColor }) => {
  const isPositive = change >= 0;
  
  return (
    <StyledCard sx={{ backgroundColor: backgroundColor || 'background.paper' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
        <MetricValue>
          {title === 'Revenue' ? `$${value}` : formatNumber(value)}
        </MetricValue>
        <ChangeIndicator direction="row">
          <ChangeText isPositive={isPositive}>
            {formatPercentage(change)}
          </ChangeText>
          {isPositive ? (
            <TrendingUpIcon sx={{ fontSize: 13, color: 'success.main' }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 13, color: 'error.main' }} />
          )}
        </ChangeIndicator>
      </Stack>
    </StyledCard>
  );
};

export default MetricCard;