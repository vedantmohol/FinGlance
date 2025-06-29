import { Box, Flex, Heading, Select, Portal, createListCollection, Text, HStack, Circle } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { useColorModeValue } from '../ui/color-mode';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
  transactions: any[];
}

const options = createListCollection({
  items: [
    { label: 'Daily', value: 'day' },
    { label: 'Monthly', value: 'month' },
    { label: 'Yearly', value: 'year' },
  ],
});

export default function ChartCard({ transactions }: Props) {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const [range, setRange] = useState('month');

  const labels = range === 'month'
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : range === 'day'
      ? Array.from({ length: 31 }, (_, i) => `${i + 1}`)
      : Array.from(new Set(transactions.map(t => new Date(t.date).getFullYear()))).map(String);

  const dataByRange = labels.map((label, i) => {
    const filtered = transactions.filter(t => {
      const d = new Date(t.date);
      if (range === 'month') return d.getMonth() === i;
      if (range === 'day') return d.getDate() === parseInt(label);
      return d.getFullYear() === parseInt(label);
    });

    const rev = filtered.filter(t => t.category === 'Revenue' && t.status === 'Paid');
    const exp = filtered.filter(t => t.category === 'Expense' && t.status === 'Paid');

    return {
      revenue: Math.round(rev.reduce((a, c) => a + c.amount, 0)),
      expense: Math.round(exp.reduce((a, c) => a + c.amount, 0)),
    };
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: dataByRange.map(d => d.revenue),
        borderColor: 'green',
        tension: 0.3,
        pointBackgroundColor: 'green',
      },
      {
        label: 'Expense',
        data: dataByRange.map(d => d.expense),
        borderColor: 'orange',
        tension: 0.3,
        pointBackgroundColor: 'orange',
      },
    ],
  };

  return (
    <Box p={5} bg={bg} borderRadius="lg" shadow="md">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Overview</Heading>
        <HStack gap={6} align="center">
          <HStack gap={1}>
            <Circle size="10px" bg="green.400" />
            <Text fontSize="sm">Revenue</Text>
          </HStack>
          <HStack gap={1}>
            <Circle size="10px" bg="orange.400" />
            <Text fontSize="sm">Expense</Text>
          </HStack>
          <Select.Root
            collection={options}
            value={[range]}
            onValueChange={(v) => setRange(v.value[0])}
            size="sm"
            width="150px"
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Range" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {options.items.map(option => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </HStack>
      </Flex>

      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              intersect: false,
              mode: 'index',
              callbacks: {
                label: (ctx: any) => `${ctx.dataset.label}: $${Math.round(ctx.parsed.y)}`,
              },
            },
            legend: { display: false },
          },
          interaction: { mode: 'nearest', axis: 'x', intersect: false },
          hover: {
            mode: 'index',
            intersect: false,
          },
        }}
      />
    </Box>
  );
}