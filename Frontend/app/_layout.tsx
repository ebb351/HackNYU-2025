import { Slot, useRouter, useSegments } from 'expo-router';
import { useAuth } from '../utils/authenticationManager';
import { useEffect } from 'react';

export default function RootLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === null) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to the home page.
      router.replace('/(tabs)/Dashboard');
    }
  }, [isAuthenticated, segments]);

  // Show a loading screen while checking authentication
  if (isAuthenticated === null) {
    return null; // Or a loading component
  }

  // Render the child routes
  return <Slot />;
}