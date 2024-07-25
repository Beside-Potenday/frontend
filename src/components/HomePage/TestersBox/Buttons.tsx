import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RouterPath } from '@/routes/path';
import { useMail } from '@/Provider/MailContext';

interface ButtonsProps {
  handleList: () => void;
  randomInput: {
    mailPurpose: string;
    senderDepartment: string;
    senderId: string;
    courseName: string;
  };
}

export const Buttons = ({ handleList, randomInput }: ButtonsProps) => {
  const mailContext = useMail();

  console.log(randomInput);

  if (!mailContext) {
    throw new Error('MailContext not found');
  }
  const { handleMail } = mailContext;

  const setMailInput = () => {
    handleMail({
      mailBox: {
        mailPurpose: randomInput.mailPurpose,
        senderDepartment: randomInput.senderDepartment,
        senderId: randomInput.senderId,
        courseName: randomInput.courseName,
      },
    });
  };

  return (
    <>
      <GoButton onClick={handleList}>예시 변경</GoButton>
      <Link to={RouterPath.mail} state={randomInput}>
        <GoButton onClick={setMailInput}>메일 생성하기</GoButton>
      </Link>
    </>
  );
};

const GoButton = styled(Button)`
  display: flex;
  width: 116px;
  height: 65px;
  justify-content: center;
  align-items: center;
  background: #cacaca;
`;
