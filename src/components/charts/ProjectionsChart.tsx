import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { styled } from '@mui/material/styles';
import type { ProjectionDataPoint } from '../../types/dashboard';

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  boxShadow: 'none'
}));

interface ProjectionsChartProps {
  data: ProjectionDataPoint[];
}

const ProjectionsChart: React.FC<ProjectionsChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    month: item.month,
    actual: item.actual / 1000, // Convert to thousands for better display
    projected: item.projected / 1000
  }));

  return (
    <ChartContainer>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Projections vs Actuals
      </Typography>
      <Stack sx={{ width: '100%', height: 300 }}>
        <BarChart
          dataset={chartData}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          yAxis={[{
            label: 'Value (K)',
            labelStyle: { fontSize: 12, fill: 'rgba(28, 28, 28, 0.40)' }
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
              position: { vertical: 'top', horizontal: 'right' }
            }
          }}
          margin={{ left: 60, right: 20, top: 60, bottom: 60 }}
        />
      </Stack>
    </ChartContainer>
  );
};

export default ProjectionsChart;