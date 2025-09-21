import React from 'react';
import { Paper, Typography, Stack, Chip, useMediaQuery, useTheme, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/material/styles';
import type { ChartDataPoint } from '../../types/dashboard';
import { formatCurrency } from '../../utils/formatters';

const ChartContainer = styled(Paper)(({ theme }) => ({
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

const HeaderContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  spacing: 2,
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
  }
}));

const LegendContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    width: '100%'
  }
}));

const LegendChip = styled(Chip)(({ theme }) => ({
  fontSize: '11px',
  fontWeight: 400,
  height: 24,
  '& .MuiChip-avatar': {
    width: 6,
    height: 6,
    borderRadius: '50%'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '9px',
    height: 20,
    width: '100%',
    justifyContent: 'flex-start',
    '& .MuiChip-label': {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(1),
    }
  }
}));

const ResponsiveChartWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 300,
  [theme.breakpoints.down('md')]: {
    height: 280,
  },
  [theme.breakpoints.down('sm')]: {
    height: 250,
  }
}));

interface RevenueChartProps {
  data: ChartDataPoint[];
  currentWeek: number;
  previousWeek: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, currentWeek, previousWeek }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const chartData = data.map(item => ({
    month: item.month,
    current: item.current / 1000, // Convert to thousands
    previous: item.previous / 1000
  }));

  return (
    <ChartContainer>
      <HeaderContainer>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            fontWeight: 600,
            minWidth: 'fit-content'
          }}
        >
          Revenue
        </Typography>
        
        {!isMobile && (
          <Typography sx={{ color: 'text.disabled', alignSelf: 'center' }}>
            |
          </Typography>
        )}
        
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
      </HeaderContainer>
      
      <ResponsiveChartWrapper>
        <LineChart
          dataset={chartData}
          xAxis={[{ 
            scaleType: 'point', 
            dataKey: 'month',
            tickLabelStyle: {
              fontSize: isMobile ? 10 : 12,
              fill: 'rgba(28, 28, 28, 0.60)'
            }
          }]}
          yAxis={[{
            label: 'Value (K)',
            labelStyle: { 
              fontSize: isMobile ? 10 : 12, 
              fill: 'rgba(28, 28, 28, 0.40)' 
            },
            tickLabelStyle: {
              fontSize: isMobile ? 9 : 11,
              fill: 'rgba(28, 28, 28, 0.60)'
            }
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
          margin={{ 
            left: isMobile ? 35 : 60, 
            right: isMobile ? 10 : 20, 
            top: 20, 
            bottom: isMobile ? 35 : 60 
          }}
          slotProps={{
            line: {
              strokeWidth: isMobile ? 1.5 : 2
            },
            mark: {
              size: isMobile ? 3 : 6
            },
            legend: { hidden: true } // Hide default legend since we have custom
          }}
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiChartsAxis-root': {
              '& .MuiChartsAxis-line': {
                stroke: 'rgba(28, 28, 28, 0.12)'
              }
            },
            '& .MuiChartsGrid-root': {
              '& line': {
                stroke: 'rgba(28, 28, 28, 0.06)'
              }
            },
            touchAction: 'pan-x pan-y',
            userSelect: 'none'
          }}
        />
      </ResponsiveChartWrapper>
    </ChartContainer>
  );
};

export default RevenueChart;