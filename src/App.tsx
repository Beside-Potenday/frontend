import { Routes } from './routes';
import { MailProvider } from './Provider/MailContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles/variants/index';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MailProvider>
          <Routes />
        </MailProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
