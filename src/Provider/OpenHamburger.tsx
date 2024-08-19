import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { OpenHamburgerContextType } from '@/types';

export const OpenHamburgerContext = createContext<OpenHamburgerContextType | undefined>(undefined);

export const OpenHamburgerProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  const handleIsReady = (state: boolean) => {
    setIsReady(state);
  };

  useEffect(() => {
    setIsReady(false);
  }, []);

  return (
    <OpenHamburgerContext.Provider value={{ isReady, handleIsReady }}>
      {children}
    </OpenHamburgerContext.Provider>
  );
};

export const useOpenHamburger = () => {
  const context = useContext(OpenHamburgerContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
