import { AuthContextType, AuthInfo } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  const updateAuthInfo = (auth: AuthInfo) => {
    if (auth) {
      setAuthInfo(auth);
    }
  };

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
