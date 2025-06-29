import { Box, Flex, Text, chakra } from '@chakra-ui/react';
import { FaWallet, FaPiggyBank, FaChartLine } from 'react-icons/fa';
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { useColorModeValue } from '../ui/color-mode';

const icons = {
  balance: FaWallet,
  revenue: FaCircleDollarToSlot,
  expenses: FaChartLine,
  savings: FaPiggyBank,
};

interface Props {
  title: string;
  amount: number;
  iconType: keyof typeof icons;
}

export default function SummaryBox({ title, amount, iconType }: Props) {
  const IconComponent = icons[iconType];
  const Icon = chakra(IconComponent);
  const bg = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box bg={bg} p={5} borderRadius="lg" shadow="md">
      <Flex align="center" justify="space-between">
        <Icon boxSize={8} color="green.400"/>
        <Box color={useColorModeValue('black', 'white')}>
          <Text fontSize="lg" fontWeight="bold">{title}</Text>
          <Text fontSize="2xl" fontWeight="extrabold">
            ${Math.round(amount).toLocaleString()}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}