import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../utils/authenticationManager';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  // Show a loading state while checking authentication
  if (isAuthenticated === null) {
    return <Stack.Screen options={{ title: 'Loading...' }} />;
  }

  // Redirect to the main app if authenticated
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/Dashboard" />;
  }

  // Show the auth screen if not authenticated
  return <Stack screenOptions={{ headerShown: false }} />;
}