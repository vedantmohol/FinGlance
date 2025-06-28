import ColorModeToggle from '@/components/ColorModeToggle';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Box, Button, Heading, Text, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.50', 'rgba(26, 28, 34, 1)');

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      px={4}
    >
      <ColorModeToggle />
      <Stack gap={6} align="center">
        <Heading as="h1" size="2xl" color="blue.600" textAlign="center">
          Welcome to FinGlance
        </Heading>

        <Text fontSize="lg" color="gray.600" textAlign="center">
          Your secure and smart financial analytics dashboard.
        </Text>

        <Stack direction="column" gap={4} align="center" display="flex flex-col">
          <Button colorScheme="blue" m={3} onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="outline" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;