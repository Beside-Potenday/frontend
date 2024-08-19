import { Routes } from './routes';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles/variants/index';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api';
import Providers from './Provider/Providers';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Providers>
          <Routes />
        </Providers>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
