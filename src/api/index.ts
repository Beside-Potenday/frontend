import { QueryClient } from '@tanstack/react-query';

export const BASE_URL = 'https://alphamail.site';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 쿼리 실패 시 재시도 횟수
      refetchOnMount: true, // 컴포넌트가 마운트될 때 쿼리를 다시 가져올지 여부
      refetchOnReconnect: true, // 네트워크가 다시 연결될 때 쿼리를 다시 가져올지 여부
      refetchOnWindowFocus: true, // 창에 다시 포커스가 맞춰질 때 쿼리를 다시 가져올지 여부
    },
  },
});
