import ColorModeToggle from '@/components/ColorModeToggle';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Box, Button, Field, Fieldset, Input, Stack, Alert, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '@/redux/user/userSlice';
import type { RootState } from '../redux/store';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.50', 'rgba(26, 28, 34, 1)');
  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Please fill out all fields.'));
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || 'Login failed'));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/dashboard');
    } catch (err: any) {
      dispatch(signInFailure(err.message));
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
              Login
            </Fieldset.Legend>

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

            <Stack direction="row" justify="space-between" align="center">
              <Button colorScheme="blue" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Login"}
              </Button>
              <Link
                to="/register"
                style={{ color: "#3182CE", textDecoration: "underline" }}
              >
                Don't have an account?
              </Link>
            </Stack>

            {error && (
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{error}</Alert.Title>
                </Alert.Content>
              </Alert.Root>
            )}
          </Stack>
        </Fieldset.Root>
      </form>
    </Box>
  );
};

export default Login;