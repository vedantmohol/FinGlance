import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Table,
  Avatar,
  Input,
  HStack,
  Icon,
  Text,
  VStack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { FiSearch, FiCalendar } from "react-icons/fi";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useColorModeValue } from "@/components/ui/color-mode";

interface Transaction {
  id: string | number;
  amount: number;
  user_id: string;
  user_profile: string;
  date: string;
  category: string;
  status: string;
}

const userNames: Record<string, string> = {
  user_001: "Matheus Ferrero",
  user_002: "Floyd Miles",
  user_003: "Jerome Bell",
  user_004: "Jacob Bethell",
};

const formatDateString = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const defaultColumns = [
  { label: "Name", key: "userName" },
  { label: "Date", key: "date" },
  { label: "Category", key: "category" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" },
];

const Transaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCols, setSelectedCols] = useState<string[]>(
    defaultColumns.map((col) => col.key)
  );
  const bg = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transaction/getTransactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((txn) => {
    const date = new Date(txn.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (
      (!search ||
        userNames[txn.user_id]
          ?.toLowerCase()
          .includes(search.toLowerCase())) &&
      (!start || date >= start) &&
      (!end || date <= end)
    );
  });

  const toggleColumn = (col: string) => {
    setSelectedCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const downloadCSV = () => {
    const mappedData = filteredTransactions.map((txn) => ({
      userName: userNames[txn.user_id] || txn.user_id,
      date: formatDateString(txn.date),
      category: txn.category,
      amount:
        txn.category === "Revenue" ? `+${txn.amount}` : `-${txn.amount}`,
      status: txn.status,
    }));

    const filteredData = mappedData.map((row) =>
      Object.fromEntries(
        Object.entries(row).filter(([key]) => selectedCols.includes(key))
      )
    );

    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box bg={bg} p={5} borderRadius="lg" shadow="md">
      <Card.Root>
        <CardHeader>
          <HStack justify="space-between" align="center" mb={4} flexWrap="wrap">
            <Heading size="md">Transactions</Heading>
            <HStack gap={4} flexWrap="wrap">
              <Box position="relative">
                <Input
                  pl="2.5rem"
                  placeholder="Search for anything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  width="250px"
                  bg={bg}
                />
                <Icon
                  as={FiSearch}
                  position="absolute"
                  left="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  color="gray.400"
                />
              </Box>
              <HStack>
                <Icon as={FiCalendar} boxSize={5} color="gray.400" />
                <Input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  bg={bg}
                />
                <Input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                  bg={bg}
                />
              </HStack>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack align="start" mb={4} gap={2}>
            <Text fontWeight="semibold" fontSize="sm">
              Select Required Columns
            </Text>
            <HStack wrap="wrap" gap={4} align="start">
              {defaultColumns.map((col) => {
                const isChecked = selectedCols.includes(col.key);
                return (
                  <Checkbox.Root key={col.key}>
                    <Checkbox.HiddenInput
                      checked={isChecked}
                      onChange={() => toggleColumn(col.key)}
                    />
                    <Checkbox.Control />
                    <Checkbox.Label>{col.label}</Checkbox.Label>
                  </Checkbox.Root>
                );
              })}
            </HStack>
            <Button colorScheme="blue" size="sm" onClick={downloadCSV}>
              Download CSV
            </Button>
          </VStack>

          <Table.Root size="md">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Date</Table.ColumnHeader>
                <Table.ColumnHeader>Amount</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredTransactions.map((txn) => {
                const isRevenue = txn.category === "Revenue";
                const sign = isRevenue ? "+" : "-";
                const color = isRevenue ? "green.400" : "yellow.400";
                const statusColor =
                  txn.status === "Paid" ? "green.500" : "yellow.500";
                const name = userNames[txn.user_id] || txn.user_id;

                return (
                  <Table.Row key={txn.id}>
                    <Table.Cell>
                      <HStack>
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name={name} />
                          <Avatar.Image src={txn.user_profile} />
                        </Avatar.Root>
                        <Text>{name}</Text>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell>{formatDateString(txn.date)}</Table.Cell>
                    <Table.Cell color={color} fontWeight="bold">
                      {sign}${Math.round(txn.amount)}
                    </Table.Cell>
                    <Table.Cell>
                      <Box
                        bg={statusColor}
                        color="white"
                        px={2}
                        py={0.5}
                        borderRadius="md"
                        fontSize="sm"
                        textAlign="center"
                        maxW="fit-content"
                        mx="auto"
                      >
                        {txn.status === "Paid" ? "Completed" : "Pending"}
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </CardBody>
      </Card.Root>
    </Box>
  );
};

export default Transaction;