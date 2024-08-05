export type mailSendUniv = {
  sender: string;
  receiver: string;
  department: string;
  studentId: string;
  subject: string;
  content: string;
};

export type mailSendBusiness = {
  content: string;
  sender: string;
  company: string;
  department: string;
  additional: string;
  receiver: string;
};

export type mailResponseData = {
  title: string;
  content: string;
};

export interface AskListProps {
  randomInput: mailSendUniv | mailSendBusiness;
}

export interface Question {
  ask: string;
  input: string;
}

export type MailInput = mailSendUniv | mailSendBusiness;
