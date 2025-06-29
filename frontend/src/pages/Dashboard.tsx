import { useEffect, useState } from 'react';
import { SimpleGrid, Spinner, Box } from '@chakra-ui/react';
import SummaryBox from '@/components/dashboard/SummaryBox';
import ChartCard from '@/components/dashboard/ChartCard';
import LatestTransactions from '@/components/dashboard/LatestTransactions';

interface Summary {
  balance: number;
  revenue: number;
  expenses: number;
  savings: number;
}

function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, txnRes] = await Promise.all([
          fetch('/api/transaction/getSummary'),
          fetch('/api/transaction/getTransactions'),
        ]);

        const summaryData = await summaryRes.json();
        const txnData = await txnRes.json();

        setSummary(summaryData);
        setTransactions(txnData);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !summary) return <Spinner size="xl" />;

  return (
    <Box>
      <SimpleGrid columns={[1, 2, 2, 4]} gap={6} mb={8}>
        <SummaryBox
          title="Balance"
          amount={summary.balance}
          iconType="balance"
        />
        <SummaryBox
          title="Revenue"
          amount={summary.revenue}
          iconType="revenue"
        />
        <SummaryBox
          title="Expenses"
          amount={summary.expenses}
          iconType="expenses"
        />
        <SummaryBox
          title="Savings"
          amount={summary.savings}
          iconType="savings"
        />
      </SimpleGrid>

      <SimpleGrid columns={10} gap={6} mb={8}>
        <Box gridColumn={{ base: "1 / -1", md: "span 7" }}>
          <ChartCard transactions={transactions} />
        </Box>
        <Box gridColumn={{ base: "1 / -1", md: "span 3" }}>
          <LatestTransactions transactions={transactions.slice(0, 3)} />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
