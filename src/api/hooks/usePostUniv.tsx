import { useMutation } from '@tanstack/react-query';
import { mailSend, mailResponseData } from '@/types';
import { BASE_URL } from '..';
import axios from 'axios';

export const postUnivPath = () => `${BASE_URL}/api/mails/univ`;

export const postUniv = async (mailData: mailSend): Promise<mailResponseData> => {
  const real = {
    sender: 'sender@example.com',
    receiver: 'receiver@example.com',
    department: 'Computer Science',
    studentId: '2020123456',
    subject: 'Data Structures',
    content: 'This is the content of the email.',
  };
  const response = await axios.post<mailResponseData>(postUnivPath(), real);
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
