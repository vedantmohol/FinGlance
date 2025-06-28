import ColorModeToggle from '@/components/ColorModeToggle';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Box, Button, Field, Fieldset, Input, Stack, Alert, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [alertMsg, setAlertMsg] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | 'info' | null>(null);
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.50', 'rgba(26, 28, 34, 1)');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok){
        throw new Error(data.message || 'Registration failed');
      } 

      setStatus('success');
      setAlertMsg('Registration successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setStatus('error');
      setAlertMsg(err.message);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={20}
      p={6}
      borderWidth={1}
      bg={bg}
      borderRadius="md"
    >
      <ColorModeToggle />

      <form onSubmit={handleSubmit}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack gap={4}>
            <Fieldset.Legend
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center"
            >
              Register
            </Fieldset.Legend>

            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Field.Root>

            <Flex justify="space-between" align="center">
              <Button colorScheme="blue" type="submit">
                Register
              </Button>

              <Link
                to="/login"
                style={{ color: "#3182ce", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2B6CB0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3182ce")}
              >
                Already have an account?
              </Link>

            </Flex>
              {status && (
                <Alert.Root status={status}>
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>{alertMsg}</Alert.Title>
                  </Alert.Content>
                </Alert.Root>
              )}
          </Stack>
        </Fieldset.Root>
      </form>
    </Box>
  );
};

export default Register;
