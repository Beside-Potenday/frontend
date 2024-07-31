import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import { mailSend } from '@/types';

interface MailContextProps {
  mailInput: mailSend;
  handleMail: (mailBox: mailSend) => void;
  isActive: string;
  onIsActive: (state: string) => void;
}

export const MailContext = createContext<MailContextProps | null>(null);

export const MailProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState('univ');
  const [mailInput, setMailInput] = useState<mailSend>({
    sender: '',
    content: '',
    department: '',
    studentId: '',
    subject: '',
    receiver: '',
  });

  const handleMail = (mailBox: mailSend) => {
    setMailInput({
      sender: mailBox.sender,
      content: mailBox.content,
      department: mailBox.department,
      studentId: mailBox.studentId,
      subject: mailBox.subject,
      receiver: mailBox.receiver,
    });
  };

  const onIsActive = (state: string) => {
    setIsActive(state);
  };

  return (
    <MailContext.Provider value={{ mailInput, handleMail, isActive, onIsActive }}>
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
