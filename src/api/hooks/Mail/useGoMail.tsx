import { MailGoData } from '@/types';
import axios from 'axios';
import { BASE_URL } from '../..';
import { useMutation } from '@tanstack/react-query';

export const postMailPath = () => `${BASE_URL}/send-email`;

const createApiClient = () => {
  const token = sessionStorage.getItem('accessToken');

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const goMail = async (mailGo: MailGoData) => {
  try {
    const apiClient = createApiClient();
    const response = await apiClient.post<string>(postMailPath(), mailGo);
    return response.data;
  } catch (error) {
    console.error('Error posting mail:', error);
    throw error;
  }
};

export const useGoMail = () => {
  const { mutate } = useMutation({
    mutationFn: goMail,
    onSuccess: (result) => {
      console.log('Mail send successfully:', result);
    },
    onError: (error) => {
      console.error('Error sending mail:', error);
    },
  });
  return { mutate };
};
