import { Box, Card, CardHeader, CardBody, Heading, Text, List, Avatar, HStack, VStack, Flex,} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "../ui/color-mode";

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

const LatestTransactions = ({ transactions }: Props) => {
    const bg = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box>
      <Card.Root bg={bg}>
        <CardHeader>
          <Flex align="center" justify="space-between">
            <Heading size="md">Recent Transactions</Heading>
            <Link to="/transactions">
              <Text fontSize="sm" color="blue.500" mt={2}>
                See all
              </Text>
            </Link>
          </Flex>
        </CardHeader>
        <CardBody>
          <List.Root gap="4">
            {transactions.map((txn) => {
              const isRevenue = txn.category === "Revenue";
              const label = isRevenue ? "Transfers from" : "Transfers to";
              const name = userNames[txn.user_id] || txn.user_id;
              const color = isRevenue ? "green.400" : "yellow.400";
              const sign = isRevenue ? "+" : "-";

              return (
                <List.Item key={txn.id} style={{ listStyleType: "none" }}>
                  <HStack gap={4} align="center">
                    <Avatar.Root>
                      <Avatar.Fallback name={name} />
                      <Avatar.Image src={txn.user_profile} />
                    </Avatar.Root>
                    <VStack align="start" gap={0} flex="1">
                      <Text fontSize="sm" color="gray.400">
                        {label}
                      </Text>
                      <Text fontWeight="medium">{name}</Text>
                    </VStack>
                    <Text fontWeight="bold" color={color}>
                      {sign}${txn.amount.toFixed(2)}
                    </Text>
                  </HStack>
                </List.Item>
              );
            })}
          </List.Root>
        </CardBody>
      </Card.Root>
    </Box>
  );
};

export default LatestTransactions;
