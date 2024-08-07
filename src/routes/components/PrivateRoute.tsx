import { useAuth } from '@/Provider/Auth';
import { RouterPath } from '../path';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { authInfo } = useAuth();

  if (authInfo) {
    return <Navigate to={RouterPath.login} />;
  }

  return <Outlet />;
};
