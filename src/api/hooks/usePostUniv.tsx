import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { mailResponseData, mailSend } from '@/types';

export const postUnivPath = () => `/api/mails/univ`;

export const postUniv = async ({
  sender,
  content,
  department,
  studentId,
  subject,
  receiver,
}: mailSend) => {
  const response = await axios.post(postUnivPath(), {
    sender,
    content,
    department,
    studentId,
    subject,
    receiver,
  });
  return response.data;
};

export const usePostUniv = () => {
  return useMutation<mailResponseData, Error, mailSend>({
    mutationFn: postUniv,
    onSuccess: (data) => {},
  });
};
