import { AuthContextType, AuthInfo } from '@/types';
import { Spinner } from '@chakra-ui/react';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);

  const updateAuthInfo = (auth: AuthInfo) => {
    if (auth) {
      setAuthInfo(auth);
    }
  };

  const handleAuthInfo = () => {
    const authToken = sessionStorage.getItem('accessToken');
    if (authToken) {
      const email = sessionStorage.getItem('email') || '';
      const name = sessionStorage.getItem('name') || '';
      const picture = sessionStorage.getItem('picture') || '';
      setAuthInfo({
        accessToken: authToken,
        email: email,
        name: name,
        picture: picture,
      });
    }
  };

  useEffect(() => {
    handleAuthInfo();
    setIsReady(true);
  }, []);

  if (!isReady) return <Spinner />;

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
