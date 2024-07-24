import { Routes } from './routes';
import { MailProvider } from './Provider/MailContext';

const App = () => {
  return (
    <MailProvider>
      <Routes />
    </MailProvider>
  );
};

export default App;
