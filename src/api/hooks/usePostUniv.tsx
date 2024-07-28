import { useMutation } from '@tanstack/react-query';
import { mailSend, mailResponseData } from '@/types';
import { BASE_URL } from '..';
import axios, { AxiosError } from 'axios';

export const postUnivPath = () => `${BASE_URL}/api/mails/univ`;

export const postUniv = async (mailData: mailSend): Promise<mailResponseData> => {
  const response = await axios.post<mailResponseData>(postUnivPath(), mailData);
  return response.data;
};

export const usePostUniv = () => {
  const mutation = useMutation<mailResponseData, AxiosError, mailSend>({
    mutationFn: postUniv,
    retry: 3,
    onError: (error) => {
      console.error('API call failed:', error);
    },
  });

  return mutation;
};
