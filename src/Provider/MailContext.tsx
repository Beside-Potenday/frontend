import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { MailInput } from '@/types';

export type mailSendUniv = {
  sender: string;
  content: string;
  department: string;
  studentId: string;
  subject: string;
  receiver: string;
};

export type mailSendBusiness = {
  content: string;
  sender: string;
  company: string;
  department: string;
  additional: string;
  name: string;
};

interface MailContextProps {
  mailInput: MailInput;
  handleMail: (mailBox: MailInput) => void;
  isActive: 'univ' | 'business';
  onIsActive: (state: 'univ' | 'business') => void;
  resetMailInputUniv: () => void;
  resetMailInputBusiness: () => void;
}

export const MailContext = createContext<MailContextProps | null>(null);

export const MailProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState<'univ' | 'business'>('univ');
  const [mailInput, setMailInput] = useState<MailInput>({
    sender: '',
    content: '',
    department: '',
    studentId: '',
    subject: '',
    receiver: '',
  });

  const handleMail = (mailBox: MailInput) => {
    setMailInput(mailBox);
  };

  const resetMailInputUniv = () => {
    setMailInput({
      content: '',
      sender: '',
      company: '',
      department: '',
      additional: '',
      receiver: '',
    });
  };

  const resetMailInputBusiness = () => {
    setMailInput({
      sender: '',
      content: '',
      department: '',
      studentId: '',
      subject: '',
      receiver: '',
    });
  };

  const onIsActive = (state: 'univ' | 'business') => {
    setIsActive(state);
    if (state === 'business') {
      resetMailInputBusiness();
    } else {
      resetMailInputUniv();
    }
  };

  return (
    <MailContext.Provider
      value={{
        mailInput,
        handleMail,
        isActive,
        onIsActive,
        resetMailInputUniv,
        resetMailInputBusiness,
      }}
    >
      {children}
    </MailContext.Provider>
  );
};

export const useMail = () => {
  const context = useContext(MailContext);
  if (!context) {
    throw new Error('useMail must be used within a MailProvider');
  }
  return context;
};
