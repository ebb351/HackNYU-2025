import { useState, useEffect } from 'react';

type AuthState = {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (value: boolean) => void;
};

// Singleton pattern to ensure we have only one instance of auth state
let authInstance: AuthState | null = null;

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (!authInstance) {
      authInstance = {
        isAuthenticated: null,
        setIsAuthenticated: (value: boolean) => {
          authInstance!.isAuthenticated = value;
          setIsAuthenticated(value);
        },
      };
    }

    // Initial auth check
    const checkAuth = async () => {
      // Replace this with your actual authentication check
      // For example, check for a valid token in AsyncStorage
      await new Promise(resolve => setTimeout(resolve, 1000));
      authInstance.setIsAuthenticated(false);
    };

    checkAuth();

    // Sync local state with singleton instance
    setIsAuthenticated(authInstance.isAuthenticated);
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated: authInstance?.setIsAuthenticated ?? setIsAuthenticated,
  };
};