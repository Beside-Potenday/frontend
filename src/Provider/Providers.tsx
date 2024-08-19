import { AuthProvider } from '@/Provider/Auth';
import { MailProvider } from '@/Provider/MailContext';
import { OpenHamburgerProvider } from './OpenHamburger';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <OpenHamburgerProvider>
      <MailProvider>
        <AuthProvider>{children}</AuthProvider>
      </MailProvider>
    </OpenHamburgerProvider>
  );
};

export default Providers;
