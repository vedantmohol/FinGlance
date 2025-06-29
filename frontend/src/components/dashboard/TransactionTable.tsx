import { Box, Card, CardHeader, CardBody, Heading, Table, Avatar, Input, HStack, Icon, Text, Flex } from "@chakra-ui/react";
import { FiSearch, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { Link } from "react-router-dom";

interface Transaction {
  id: string | number;
  amount: number;
  user_id: string;
  user_profile: string;
  date: string;
  category: string;
  status: string;
}

interface Props {
  transactions: Transaction[];
}

const userNames: Record<string, string> = {
  user_001: "Matheus Ferrero",
  user_002: "Floyd Miles",
  user_003: "Jerome Bell",
  user_004: "Jacob Bethell",
};

const formatDateString = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const TransactionTable = ({ transactions }: Props) => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const bg = useColorModeValue('gray.100', 'gray.900');
  const lg = useColorModeValue('gray.100', 'gray.700');

  const filteredTransactions = transactions.filter(txn => {
    const date = new Date(txn.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (
      (!search || userNames[txn.user_id]?.toLowerCase().includes(search.toLowerCase())) &&
      (!start || date >= start) &&
      (!end || date <= end)
    );
  });

  return (
    <Box p={5}>
      <Card.Root bg={bg} borderRadius="lg">
        <CardHeader>
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            gap={4}
            justify="space-between"
          >
            <Heading fontSize="xl" mb={4}>
              Transactions
            </Heading>
            <HStack gap={4} mb={4} flexWrap="wrap">
              <HStack>
                <Icon as={FiSearch} boxSize={5} color="gray.400" />
                <Input
                  placeholder="Search for anything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  width="250px"
                  bg={lg}
                />
              </HStack>
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
          </Flex>
        </CardHeader>
        <CardBody>
          <Table.Root size="md">
            <Table.Header>
              <Table.Row bg={lg}>
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
                        px={3}
                        py={1}
                        borderRadius="md"
                        fontSize="sm"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        minW="90px"
                        textAlign="center"
                      >
                        {txn.status === "Paid" ? "Completed" : "Pending"}
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
          <Box textAlign="right" mt={4}>
            <Link to="/transactions">
              <Text
                color="blue.500"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ textDecoration: "underline" }}
              >
                See all
              </Text>
            </Link>
          </Box>
        </CardBody>
      </Card.Root>
    </Box>
  );
};

export default TransactionTable;
