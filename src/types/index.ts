export type mailSend = {
  sender: string;
  receiver: string;
  department: string;
  studentId: string;
  subject: string;
  content: string;
};

export type mailResponseData = {
  title: string;
  content: string;
};
