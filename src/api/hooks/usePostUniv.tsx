import { useMutation } from '@tanstack/react-query';
import { mailSend, mailResponseData } from '@/types';
import { BASE_URL } from '..';
import axios from 'axios';
export const postUnivPath = () => `${BASE_URL}/api/mails/univ`;

export const postUniv = async (mailData: mailSend): Promise<mailResponseData> => {
  const response = await axios.post(postUnivPath(), mailData);
  return response.data;
};

export const usePostUniv = () => {
  const mutation = useMutation<mailResponseData, Error, mailSend>({
    mutationFn: postUniv,
  });

  return mutation;
};
