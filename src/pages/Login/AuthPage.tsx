import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetLogin } from '@/api/hooks/useGetLogin';
import { RouterPath } from '@/routes/path';

export const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const code = query.get('code');

  const { data, error, isLoading } = useGetLogin({ code: code || '' });

  useEffect(() => {
    if (data && !error) {
      sessionStorage.setItem('authToken', data.accessToken);
      navigate(RouterPath.home);
    }
  }, [data, error, navigate]);

  return <div>{isLoading ? <h1>Logging in...</h1> : error ? <h1>Login failed!</h1> : null}</div>;
};
