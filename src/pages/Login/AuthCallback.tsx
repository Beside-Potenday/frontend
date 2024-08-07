import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetLogin } from '@/api/hooks/useGetLogin';

const AuthCallback = () => {
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const { data } = useGetLogin({ code });

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const token = queryParams.get('access_token');

    if (token) {
      // 액세스 토큰을 상태에 저장하고 후속 작업 수행
      setCode(token);

      // 예를 들어, 사용자를 메인 페이지로 리디렉션
      navigate('/home');
    } else {
      setError('Failed to retrieve access token');
    }
    setLoading(false);
  }, [search, navigate]);

  if (loading) {
    return <p>Loading...</p>; // 로딩 화면 표시
  }

  if (error) {
    return <p>{error}</p>; // 오류 메시지 표시
  }

  return (
    <div>
      <h1>Authentication Successful</h1>
      <p>Access Token: {code}</p> {/* 액세스 토큰을 표시하거나 다른 작업 수행 */}
    </div>
  );
};

export default AuthCallback;
