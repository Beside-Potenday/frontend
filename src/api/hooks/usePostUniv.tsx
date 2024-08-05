import { useMutation } from '@tanstack/react-query';
import { mailSendUniv, mailResponseData } from '@/types';
import { BASE_URL } from '..';
import axios from 'axios';

export const postUnivPath = () => `${BASE_URL}/api/mails/univ`;

export const postUniv = async (mailData: mailSendUniv): Promise<mailResponseData> => {
  const response = await axios.post<mailResponseData>(postUnivPath(), mailData);
  return response.data;
};

export const usePostUniv = () => {
  const { mutate: univMutate, status: univStatus } = useMutation<
    mailResponseData,
    Error,
    mailSendUniv
  >({
    mutationFn: postUniv,
    retry: 3,
    onError: (error) => {
      console.error('API call failed:', error);
    },
  });

  return { univMutate, univStatus };
};
