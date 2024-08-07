import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetLogin } from '@/api/hooks/useGetLogin';
import { RouterPath } from '@/routes/path';
import { useAuth } from '@/Provider/Auth';

export const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const code = query.get('code');

  const { data, error, isLoading } = useGetLogin({ code: code || '' });
  const { updateAuthInfo } = useAuth();

  useEffect(() => {
    if (data && !error) {
      console.log('data', data);

      updateAuthInfo({
        accessToken: data.accessToken,
        picture: data.picture,
        name: data.name,
        email: data.email,
      });
      sessionStorage.setItem('authToken', data.accessToken);
      sessionStorage.setItem('name', data.name);
      sessionStorage.setItem('picture', data.picture);
      sessionStorage.setItem('email', data.email);
      navigate(RouterPath.home);
    } else if (error) {
      console.error('Login failed:', error);
      // 로그인 실패 시 로그인 페이지로 리디렉션하거나 사용자에게 알리는 로직 추가
      navigate(RouterPath.login);
    }
  }, [data, error, navigate, updateAuthInfo]);

  return <div>{isLoading ? <h1>Logging in...</h1> : error ? <h1>Login failed!</h1> : null}</div>;
};
