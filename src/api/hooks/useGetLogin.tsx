import { useQuery } from '@tanstack/react-query';
import { LoginResponse } from '@/types';
import { BASE_URL } from '..';
import axios from 'axios';

export type AuthResponse = {
  code: string;
};

export const getLoginPath = (code: string) => `${BASE_URL}/google/login/redirect?code=${code}`;

export const getLogin = async ({ code }: AuthResponse): Promise<LoginResponse> => {
  try {
    const response = await axios.get<LoginResponse>(getLoginPath(code));
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const useGetLogin = (params: AuthResponse) => {
  return useQuery<LoginResponse, Error, LoginResponse, [string, string]>({
    queryKey: ['getLogin', params.code],
    queryFn: () => getLogin(params),
  });
};
