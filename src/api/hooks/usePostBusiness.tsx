import { useMutation } from '@tanstack/react-query';
import { mailSendBusiness, mailResponseData } from '@/types';
import { BASE_URL } from '..';
import axios from 'axios';

export const postBusinessPath = () => `${BASE_URL}/api/mails/business`;

export const postBusiness = async (mailData: mailSendBusiness): Promise<mailResponseData> => {
  const response = await axios.post<mailResponseData>(postBusinessPath(), mailData);
  return response.data;
};

export const usePostBusiness = () => {
  const { mutate: businessMutate, status: businessStatus } = useMutation<
    mailResponseData,
    Error,
    mailSendBusiness
  >({
    mutationFn: postBusiness,
    retry: 3,
    onError: (error) => {
      console.error('API call failed:', error);
    },
  });

  return { businessMutate, businessStatus };
};
