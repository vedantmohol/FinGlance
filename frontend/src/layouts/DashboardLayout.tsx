import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" minH="100vh" bg="gray.800" color="white">
        <Header />
        <Box px={6} py={4}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
