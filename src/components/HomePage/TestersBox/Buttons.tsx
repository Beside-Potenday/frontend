import styled from '@emotion/styled';
import { useMail } from '@/Provider/MailContext';
import { mailSend } from '@/types';
import { usePostUniv } from '@/api/hooks/usePostUniv';
import { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from '@chakra-ui/react';

interface ButtonsProps {
  handleList: () => void;
  randomInput: mailSend;
}

export const Buttons = ({ handleList, randomInput }: ButtonsProps) => {
  const mailContext = useMail();

  console.log(randomInput);

  if (!mailContext) {
    throw new Error('MailContext not found');
  }

  const { mutate, status } = usePostUniv();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const onClose = () => {
    setIsOpen(false);
  };

  const setMailInput = () => {
    setIsOpen(true);

    mutate(
      { ...mailContext.mailInput },
      {
        onSuccess: (data) => {
          setTitle(data.title || '메일 전송 성공'); // 기본 값 설정
          setContent(data.content || '메일이 성공적으로 전송되었습니다.'); // 기본 값 설정
        },
        onError: (error) => {
          console.error('API call failed:', error);
          setTitle('메일 전송 실패');
          setContent('메일 전송 중 오류가 발생했습니다.');
        },
      },
    );
  };

  return (
    <>
      <GoButton onClick={handleList}>예시 변경</GoButton>
      <GoButton onClick={setMailInput}>메일 생성하기</GoButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{status === 'pending' ? '메일 전송 중...' : title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{status === 'pending' ? <Spinner /> : <p>{content}</p>}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
