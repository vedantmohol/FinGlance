import { Box, Flex, Icon, Text, VStack} from "@chakra-ui/react";
import { MdDashboard, MdAccountBalanceWallet, MdMessage, MdSettings, MdPerson } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useColorModeValue } from "./ui/color-mode";
import logo from '@/assets/logo.png';

const navItems = [
  { label: "Dashboard", icon: MdDashboard, path: "/dashboard" },
  { label: "Transactions", icon: MdAccountBalanceWallet, path: "/transactions" },
  { label: "Wallet", icon: GiWallet, path: "/wallet" },
  { label: "Analytics", icon: TbDeviceAnalytics , path: "/analytics" },
  { label: "Personal", icon: MdPerson, path: "/personal" },
  { label: "Message", icon: MdMessage, path: "/message" },
  { label: "Setting", icon: MdSettings, path: "/setting" },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const bg = useColorModeValue("gray.100", "gray.900");
  const activeBg = useColorModeValue("blue.100", "gray.700");

  return (
    <Box
      w={{ base: "60px", md: "220px" }}
      bg={bg}
      h="100vh"
      position="sticky"
      top="0"
      borderRight="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      px={3}
      py={5}
    >
      <Flex
        align="center"
        justify={{ base: "center", md: "center" }}
        gap={2}
        mb={8}
      >
        <Box boxSize="32px">
          <img
            src={logo}
            alt="Penta Logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" >
          Penta
        </Text>
      </Flex>

      <VStack gap={4} align="stretch">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Flex
                align="center"
                gap={3}
                p={3}
                borderRadius="md"
                bg={isActive ? activeBg : "transparent"}
                color={isActive ? "green.400" : "inherit"}
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
                transition="0.2s ease"
              >
                <Icon as={item.icon} fontSize="xl" />
                <Text
                  display={{ base: "none", md: "block" }}
                  fontWeight="medium"
                >
                  {item.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
