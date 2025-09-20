import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { OrderStatus } from '../../types/orders';
import { formatStatusColor, formatStatusTextColor } from '../../utils/orderFormatters';

const StatusContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status'
})<{ status: OrderStatus }>(({ status, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '2px 8px',
  borderRadius: '4px',
  backgroundColor: 'transparent'
}));

const StatusDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status'
})<{ status: OrderStatus }>(({ status, theme }) => ({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: formatStatusColor(status)
}));

const StatusText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'status'
})<{ status: OrderStatus }>(({ status, theme }) => ({
  fontSize: '12px',
  fontWeight: 400,
  color: formatStatusTextColor(status)
}));

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <StatusContainer status={status}>
      <StatusDot status={status} />
      <StatusText status={status}>{status}</StatusText>
    </StatusContainer>
  );
};

export default StatusBadge;