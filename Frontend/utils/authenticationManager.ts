// Frontend/utils/authenticationManager.ts
import { useState, useEffect } from 'react';
import { supabase } from './supabase'; // Adjust the path if needed
import type { Session } from '@supabase/supabase-js';

type AuthState = {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (value: boolean) => void;
};

// Using a singleton to share auth state across the app.
let authInstance: AuthState | null = null;

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Check for an existing session on mount.
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
          if (isMounted) setIsAuthenticatedState(false);
          return;
        }
        const authenticated = !!session;
        if (isMounted) setIsAuthenticatedState(authenticated);

        if (!authInstance) {
          authInstance = {
            isAuthenticated: authenticated,
            setIsAuthenticated: (value: boolean) => {
              authInstance!.isAuthenticated = value;
              if (isMounted) setIsAuthenticatedState(value);
            },
          };
        }
      } catch (err) {
        console.error('Unexpected error fetching session:', err);
        if (isMounted) setIsAuthenticatedState(false);
      }
    };

    getSession();

    // Listen for authentication state changes.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        const authenticated = !!session;
        if (isMounted) setIsAuthenticatedState(authenticated);
        if (authInstance) {
          authInstance.isAuthenticated = authenticated;
        }
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return {
    isAuthenticated,
    // This setter is now rarely needed since state is updated via Supabase;
    // your UI should call supabase.auth.signIn or signUp.
    setIsAuthenticated: authInstance?.setIsAuthenticated ?? setIsAuthenticatedState,
  };
};
