import { useMutation } from '@tanstack/react-query';
import { mailSend, mailResponseData } from '@/types';
import apiClient from '../apiClient';
export const postUnivPath = () => `/mails/univ`;

export const postUniv = async (mailData: mailSend): Promise<mailResponseData> => {
  const response = await apiClient.post(postUnivPath(), mailData);
  return response.data;
};

export const usePostUniv = () => {
  const mutation = useMutation<mailResponseData, Error, mailSend>({
    mutationFn: postUniv,
  });

  return mutation;
};
