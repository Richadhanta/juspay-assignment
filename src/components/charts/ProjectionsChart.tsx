import React from 'react';
import { Paper, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { styled } from '@mui/material/styles';
import type { ProjectionDataPoint } from '../../types/dashboard';

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

interface ProjectionsChartProps {
  data: ProjectionDataPoint[];
}

const ProjectionsChart: React.FC<ProjectionsChartProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const chartData = data.map(item => ({
    month: item.month,
    actual: item.actual / 1000, // Convert to thousands for better display
    projected: item.projected / 1000
  }));

  return (
    <ChartContainer>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          fontWeight: 600
        }}
      >
        Projections vs Actuals
      </Typography>
      
      <ResponsiveChartWrapper>
        <BarChart
          dataset={chartData}
          xAxis={[{ 
            scaleType: 'band', 
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
              dataKey: 'actual',
              label: 'Actual',
              color: '#a8c5da'
            },
            {
              dataKey: 'projected',
              label: 'Projected',
              color: '#e5ecf6'
            }
          ]}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top' as const, horizontal: isMobile ? 'center' as const : 'right' as const },
              labelStyle: {
                fontSize: isMobile ? 10 : 12,
                fill: 'rgba(28, 28, 28, 0.80)'
              }
            }
          }}
          margin={{ 
            left: isMobile ? 35 : 60, 
            right: isMobile ? 10 : 20, 
            top: isMobile ? 40 : 60, 
            bottom: isMobile ? 35 : 60 
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

export default ProjectionsChart;