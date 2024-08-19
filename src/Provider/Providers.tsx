import { AuthProvider } from '@/Provider/Auth';
import { MailProvider } from '@/Provider/MailContext';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <MailProvider>
      <AuthProvider>{children}</AuthProvider>
    </MailProvider>
  );
};

export default Providers;
