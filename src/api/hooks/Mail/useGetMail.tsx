import { BASE_URL } from '@/api';
import axios from 'axios';
import { MailListResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const getMailPath = (page: number, size: number) =>
  `${BASE_URL}/emails?page=${page}&size=${size}`;

const createApiClient = (job: string) => {
  const token = sessionStorage.getItem('accessToken');
  console.log(job);
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      Job: job,
    },
  });
};

const getMail = async (page: number, size: number, job: string) => {
  try {
    const apiClient = createApiClient(job);
    const response = await apiClient.get<MailListResponse>(getMailPath(page, size));
    return response.data;
  } catch (error) {
    console.error('Error fetching mail:', error);
    throw error;
  }
};

export const useGetMail = (page: number, size: number, job: string) => {
  const {
    data: mailData,
    isLoading: mailLoading,
    isError: mailError,
    refetch,
  } = useQuery({
    queryKey: ['emails', page, size, job],
    queryFn: () => getMail(page, size, job),
    enabled: !!job, // job이 존재할 때만 쿼리 실행
    retry: 1, // 에러 시 1번만 재시도
  });

  return { mailData, mailLoading, mailError, refetch };
};
