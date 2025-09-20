import React from 'react';
import { Paper, Typography, Stack, Chip } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/material/styles';
import type { ChartDataPoint } from '../../types/dashboard';
import { formatCurrency } from '../../utils/formatters';

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  boxShadow: 'none'
}));

const LegendContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const LegendChip = styled(Chip)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 400,
  height: 22,
  '& .MuiChip-avatar': {
    width: 6,
    height: 6,
    borderRadius: '50%'
  }
}));

interface RevenueChartProps {
  data: ChartDataPoint[];
  currentWeek: number;
  previousWeek: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, currentWeek, previousWeek }) => {
  const chartData = data.map(item => ({
    month: item.month,
    current: item.current / 1000, // Convert to thousands
    previous: item.previous / 1000
  }));

  return (
    <ChartContainer>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h6">Revenue</Typography>
        <Typography sx={{ color: 'text.disabled' }}>|</Typography>
        <LegendContainer>
          <LegendChip
            avatar={<div style={{ backgroundColor: '#1c1c1c', width: 6, height: 6, borderRadius: '50%' }} />}
            label={`Current Week ${formatCurrency(currentWeek)}`}
            variant="outlined"
            size="small"
          />
          <LegendChip
            avatar={<div style={{ backgroundColor: '#a8c5da', width: 6, height: 6, borderRadius: '50%' }} />}
            label={`Previous Week ${formatCurrency(previousWeek)}`}
            variant="outlined"
            size="small"
          />
        </LegendContainer>
      </Stack>
      
      <Stack sx={{ width: '100%', height: 300 }}>
        <LineChart
          dataset={chartData}
          xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
          yAxis={[{
            label: 'Value (K)',
            labelStyle: { fontSize: 12, fill: 'rgba(28, 28, 28, 0.40)' }
          }]}
          series={[
            {
              dataKey: 'current',
              label: 'Current Week',
              color: '#1c1c1c',
              curve: 'catmullRom',
              connectNulls: true
            },
            {
              dataKey: 'previous',
              label: 'Previous Week',
              color: '#a8c5da',
              curve: 'catmullRom',
              connectNulls: true
            }
          ]}
          grid={{ horizontal: true }}
          margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
          slotProps={{
            line: {
              strokeWidth: 2
            }
          }}
        />
      </Stack>
    </ChartContainer>
  );
};

export default RevenueChart;