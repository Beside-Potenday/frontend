import { AuthContextType, AuthInfo } from '@/types';
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  const updateAuthInfo = useCallback((auth: AuthInfo) => {
    setAuthInfo((prevAuth) => {
      if (JSON.stringify(prevAuth) !== JSON.stringify(auth)) {
        return auth;
      }
      return prevAuth;
    });
  }, []);

  const handleAuthInfo = useCallback(() => {
    const authToken = sessionStorage.getItem('accessToken');
    if (authToken) {
      const email = sessionStorage.getItem('email') || '';
      const name = sessionStorage.getItem('name') || '';
      const picture = sessionStorage.getItem('picture') || '';
      updateAuthInfo({
        accessToken: authToken,
        email,
        name,
        picture,
      });
    } else {
      setAuthInfo(undefined);
    }
  }, [updateAuthInfo]);

  useEffect(() => {
    handleAuthInfo();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        handleAuthInfo();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleAuthInfo]);

  return (
    <AuthContext.Provider value={{ authInfo, updateAuthInfo }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
