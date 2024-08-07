import { BASE_URL } from '@/api';
import axios from 'axios';
import { MailListResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const getMailPath = (page: number, size: number) =>
  `${BASE_URL}/emails?page=${page}&size=${size}`;

const createApiClient = () => {
  const token = sessionStorage.getItem('accessToken');
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      Job: 'univ',
    },
  });
};

const getMailUniv = async (page: number, size: number) => {
  try {
    const apiClient = createApiClient();
    const response = await apiClient.get<MailListResponse>(getMailPath(page, size));
    return response.data;
  } catch (error) {
    console.error('Error fetching mail:', error);
    throw error;
  }
};

export const useGetMailUniv = (page: number, size: number) => {
  const {
    data: univData,
    isLoading: univLoading,
    isError: univError,
  } = useQuery({ queryKey: ['emails', page, size], queryFn: () => getMailUniv(page, size) });

  return { univData, univLoading, univError };
};
