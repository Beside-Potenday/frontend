import { MailPostData } from '@/types';
import axios from 'axios';
import { BASE_URL } from '../..';
import { useMutation } from '@tanstack/react-query';

export const postMailPath = () => `${BASE_URL}/save-email`;
const token = sessionStorage.getItem('accessToken');

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const postMail = async (mailInput: MailPostData) => {
  try {
    const response = await apiClient.post<number>(postMailPath(), mailInput);
    return response.data;
  } catch (error) {
    console.error('Error posting mail:', error);
    throw error;
  }
};

export const usePostMail = () => {
  const { mutate } = useMutation({
    mutationFn: postMail,
    onSuccess: (result) => {
      console.log('Mail posted successfully:', result);
    },
    onError: (error) => {
      console.error('Error posting mail:', error);
    },
  });
  return { mutate };
};
