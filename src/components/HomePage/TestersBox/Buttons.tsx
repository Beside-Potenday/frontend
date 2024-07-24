import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RouterPath } from '@/routes/path';

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
  return (
    <>
      <GoButton onClick={handleList}>예시 변경</GoButton>
      <Link to={RouterPath.mail} state={randomInput}>
        <GoButton>메일 생성하기</GoButton>
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
