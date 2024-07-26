import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface MailBoxProps {
  mailBox: {
    mailPurpose: string;
    senderDepartment: string;
    senderId: string;
    courseName: string;
  };
}

interface MailContextProps {
  mailInput: {
    mailPurpose: string;
    senderDepartment: string;
    senderId: string;
    courseName: string;
  };
  handleMail: (props: MailBoxProps) => void;
}

export const MailContext = createContext<MailContextProps | null>(null);

export const MailProvider = ({ children }: { children: ReactNode }) => {
  const [mailInput, setMailInput] = useState({
    mailPurpose: '',
    senderDepartment: '',
    senderId: '',
    courseName: '',
  });

  const handleMail = ({ mailBox }: MailBoxProps) => {
    setMailInput({
      mailPurpose: mailBox.mailPurpose,
      senderDepartment: mailBox.senderDepartment,
      senderId: mailBox.senderId,
      courseName: mailBox.courseName,
    });
  };

  return <MailContext.Provider value={{ mailInput, handleMail }}>{children}</MailContext.Provider>;
};

export const useMail = () => {
  const context = useContext(MailContext);
  if (!context) {
    throw new Error('useMail must be used within a MailProvider');
  }
  return context;
};
