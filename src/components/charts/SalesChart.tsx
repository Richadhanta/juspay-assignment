import React from 'react';
import { Paper, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import type { SalesBreakdownData } from '../../types/dashboard';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '@mui/material/styles';

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  border: 'none',
  boxShadow: 'none'
}));

const LegendItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(6),
  marginBottom: theme.spacing(1.5)
}));

const Dot = styled('span')<{ color: string }>(({ color }) => ({
  display: 'inline-block',
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: 8,
  marginTop: 2
}));

const CenterLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  pointerEvents: 'none'
}));

interface SalesChartProps {
  data: SalesBreakdownData[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const theme = useTheme();
  
  const colorMap = {
    'Direct': theme.palette.primary.main,
    'Affilliate': theme.palette.success.main,
    'Sponsored': theme.palette.info.main,
    'E-mail': theme.palette.error.main
  };

  // Transform data for MUI X Charts PieChart
  const chartData = data.map((item, index) => ({
    id: index,
    value: item.value,
    label: item.category,
    color: colorMap[item.category]
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const mainPercent = total ? ((data[0].value / total) * 100).toFixed(1) : '0.0';

  return (
    <ChartContainer>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Total Sales
      </Typography>
      <Stack alignItems="center" sx={{ mb: 2 }}>
        <Box sx={{ width: 160, height: 160, position: 'relative' }}>
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: 56,
                outerRadius: 80,
                paddingAngle: 2,
                cornerRadius: 0,
                startAngle: 0,
                endAngle: 360,
                cx: 80,
                cy: 80
              }
            ]}
            width={160}
            height={160}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
          />
          <CenterLabel>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '18px', 
                fontWeight: 600, 
                color: 'text.primary' 
              }}
            >
              {mainPercent}%
            </Typography>
          </CenterLabel>
        </Box>
      </Stack>
      <Stack spacing={1.2}>
        {data.map((item) => (
          <LegendItem key={item.category}>
            <Box display="flex" alignItems="center">
              <Dot color={colorMap[item.category]} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', minWidth: 70 }}>
                {item.category}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 400, color: 'text.primary', minWidth: 60, textAlign: 'right' }}>
              {formatCurrency(item.value)}
            </Typography>
          </LegendItem>
        ))}
      </Stack>
    </ChartContainer>
  );
};

export default SalesChart;