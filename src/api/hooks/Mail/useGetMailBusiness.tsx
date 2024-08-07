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
      Job: 'business',
    },
  });
};

const getMailBusiness = async (page: number, size: number) => {
  try {
    console.log('business', page, size);
    const apiClient = createApiClient();
    const response = await apiClient.get<MailListResponse>(getMailPath(page, size));
    return response.data;
  } catch (error) {
    console.error('Error fetching mail:', error);
    throw error;
  }
};

export const useGetMailBusiness = (page: number, size: number) => {
  const {
    data: businessData,
    isLoading: businessLoading,
    isError: businessError,
  } = useQuery({ queryKey: ['emails', page, size], queryFn: () => getMailBusiness(page, size) });
  return { businessData, businessLoading, businessError };
};
