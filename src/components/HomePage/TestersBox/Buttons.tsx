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
          setTitle(data.title || '메일 생성 성공');
          setContent(data.content || '메일이 성공적으로 생성되었습니다.');
        },
        onError: (error) => {
          console.error('API call failed:', error);
          setTitle('메일 생성 실패');
          setContent('메일 생성 중 오류가 발생했습니다.');
        },
      },
    );
  };

  return (
    <>
      <ButtonContainer>
        <ExampleButton onClick={handleList}>
          <ExampleChangeIcon />
          예시 변경
        </ExampleButton>
        <HoverImage1 src="/images/exampleChange.svg" alt="Hover Image" />
      </ButtonContainer>
      <ButtonContainer>
        <MailButton onClick={setMailInput}>
          <MakeMailIcon />
          메일 생성하기
        </MailButton>
        <HoverImage2 src="/images/makeMail.svg" alt="Hover Image" />
      </ButtonContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {status === 'pending' ? '메일 생성 중...조금만 기다려 주세요!' : title}
          </ModalHeader>
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

const ButtonContainer = styled.div`
  position: relative;

  &:hover img {
    display: block;
  }
`;

const ExampleButton = styled(Button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 37px;
  width: 215px;
  height: 60px;
  border-radius: 60px;
  background: white;
  color: black;
  gap: 6px;
  font-size: 20px;
  margin-top: 120px;
  margin-right: 70px;

  &:hover {
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    color: white;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 60px;
    padding: 2px;
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const MailButton = styled(Button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 37px;
  width: 215px;
  height: 60px;
  border-radius: 60px;
  font-size: 20px;
  background: white;
  color: black;
  gap: 6px;
  margin-bottom: 120px;
  margin-right: 70px;

  &:hover {
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    color: white;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 60px;
    padding: 2px;
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const ExampleChangeIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url('/images/exampleChangeIcon.svg');
  background-size: cover;
`;

const MakeMailIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url('/images/makeMailIcon.svg');
  background-size: cover;
`;

const HoverImage1 = styled.img`
  display: none;
  position: absolute;
  width: 174px;
  height: 34px;
  flex-shrink: 0;
  z-index: 3;
  margin-top: -100px;
  margin-right: 90px;
`;

const HoverImage2 = styled.img`
  display: none;
  position: absolute;
  width: 174px;
  height: 34px;
  flex-shrink: 0;
  z-index: 3;
  margin-top: -220px;
  margin-right: 90px;
`;
