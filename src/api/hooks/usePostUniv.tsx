import { useMutation } from '@tanstack/react-query';
import { mailSend, mailResponseData } from '@/types';
import { BASE_URL } from '..';
import axios from 'axios';
import https from 'https';

export const postUnivPath = () => `${BASE_URL}/api/mails/univ`;

export const postUniv = async (mailData: mailSend): Promise<mailResponseData> => {
  const response = await axios.post(postUnivPath(), mailData, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // SSL 인증서 검증 비활성화 (주의!)
    }),
  });
  return response.data;
};

export const usePostUniv = () => {
  const mutation = useMutation<mailResponseData, Error, mailSend>({
    mutationFn: postUniv,
    retry: 3,
    onError: (error) => {
      console.error('API call failed:', error);
    },
  });

  return mutation;
};
