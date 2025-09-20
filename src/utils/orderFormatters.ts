import { OrderStatus } from '../types/orders';

export const formatOrderId = (id: string): string => {
  return id.startsWith('#') ? id : `#${id}`;
};

export const formatOrderDate = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `A minute ago`;
  if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  if (diffInMinutes < 2880) return 'Yesterday';
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const formatStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.IN_PROGRESS:
      return '#95a4fc';
    case OrderStatus.COMPLETE:
      return '#a1e3cb';
    case OrderStatus.PENDING:
      return '#b1e3ff';
    case OrderStatus.APPROVED:
      return '#ffe999';
    case OrderStatus.REJECTED:
      return'rgba(83, 82, 82, 1)';
    default:
      return '#95a4fc';
  }
};

export const formatStatusTextColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.IN_PROGRESS:
      return '#8a8cd9';
    case OrderStatus.COMPLETE:
      return '#4aa785';
    case OrderStatus.PENDING:
      return '#59a8d4';
    case OrderStatus.APPROVED:
      return '#ffc555';
    case OrderStatus.REJECTED:
      return 'rgba(83, 82, 82, 1)';
    default:
      return '#8a8cd9';
  }
};