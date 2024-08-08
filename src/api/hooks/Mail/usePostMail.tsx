import { MailPostData } from '@/types';
import axios from 'axios';
import { BASE_URL } from '../..';
import { useMutation } from '@tanstack/react-query';

export const postMailPath = () => `${BASE_URL}/save-email`;

const createApiClient = () => {
  const token = sessionStorage.getItem('accessToken');

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const postMail = async (mailInput: MailPostData) => {
  try {
    const apiClient = createApiClient();
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
      alert('📨 저장이 완료되었습니다!');
    },
    onError: (error) => {
      alert('⚠️ 저장에 실패하였습니다');
    },
  });
  return { mutate };
};
