import { Box, Flex, Heading, IconButton, Input, InputGroup, Text, Portal } from '@chakra-ui/react';
import { Avatar, Menu } from '@chakra-ui/react';
import { AiOutlineSearch, AiOutlineBell } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import ColorModeToggle from '@/components/ColorModeToggle';
import { useColorModeValue } from './ui/color-mode';
import { signoutSuccess } from '@/redux/user/userSlice';

const getPageTitle = (path: string) => {
  const map: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/transactions': 'Transactions',
    '/wallet': 'Wallet',
    '/analytics': 'Analytics',
    '/personal': 'Personal',
    '/message': 'Message',
    '/setting': 'Setting',
  };
  return map[path] || 'Dashboard';
};

const Header = () => {
  const path = useLocation().pathname;
  const title = getPageTitle(path);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || 'Logout failed');
      } else {
        dispatch(signoutSuccess());
        navigate('/login');
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="10"
      w="full"
      px={6}
      py={4}
      align="center"
      justify="space-between"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderBottom="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Heading fontSize="xl" fontWeight="semibold" color={useColorModeValue('black', 'white')}>
        {title}
      </Heading>

      <ColorModeToggle />

      <Flex align="center" gap={4} mr={9}>

      <InputGroup
        maxW="300px"
        mx={4}
        startElement={<AiOutlineSearch color="gray" />}
      >
        <Input
          placeholder="Search..."
          bg={useColorModeValue("white", "gray.700")}
        />
      </InputGroup>

        <IconButton aria-label="Notifications" variant="ghost" size="md">
          <AiOutlineBell />
        </IconButton>

        {currentUser && (
          <Menu.Root positioning={{ placement: "bottom-end" }}>
            <Menu.Trigger rounded="full" focusRing="outside">
              <Avatar.Root size="sm" cursor="pointer">
                <Avatar.Fallback name={currentUser.user.username} />
                <Avatar.Image src={currentUser.user.profilePicture} />
              </Avatar.Root>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content bg={useColorModeValue("white", "gray.700")}>
                  <Box px={3} py={2}>
                    <Text fontSize="sm" fontWeight="bold">
                      @{currentUser.user.username}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {currentUser.user.email}
                    </Text>
                  </Box>
                  <Menu.Item value="profile" cursor="pointer">Profile</Menu.Item>
                  <Menu.Item value="logout" onSelect={handleSignout} cursor="pointer">Logout</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;