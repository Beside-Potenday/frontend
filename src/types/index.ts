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

export interface LoginResponse {
  accessToken: string;
  name: string;
  picture: string;
  email: string;
}

export type AuthInfo = LoginResponse;

export interface AuthContextType {
  authInfo?: AuthInfo;
  updateAuthInfo: (auth: AuthInfo) => void;
}

export interface MailPostData {
  subject: string;
  body: string;
  job: string;
}

export interface MailGetData {
  sender: string;
  body: string;
  year: string;
  month: string;
  day: string;
  job: string;
}

export interface MailListResponse {
  totalPages: number;
  content: Array<{ subject: string; body: string; createDate: string }>;
  pageable: { pageNumber: number; pageSize: number };
}

export interface MailGoData {
  to: string;
  from: string;
  subject: string;
  body: string;
}
