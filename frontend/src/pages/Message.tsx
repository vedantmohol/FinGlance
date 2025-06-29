import { Box, Heading, Text, Center } from "@chakra-ui/react";

const Message = () => {
  return (
    <Center h="70vh">
      <Box textAlign="center">
        <Heading size="lg">Message Page</Heading>
        <Text fontSize="md" mt={2} color="gray.500">
          This page is under construction. Please check back later.
        </Text>
      </Box>
    </Center>
  );
};

export default Message;