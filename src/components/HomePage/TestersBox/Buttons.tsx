import styled from '@emotion/styled';
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
      { ...randomInput },
      {
        onSuccess: (data) => {
          console.log(data);
          setTitle(data.title || '메일 생성 성공');
          setContent(data.content || '메일이 성공적으로 생성되었습니다.');
        },
        onError: (error) => {
          setTitle('메일 생성 실패');
          setContent('메일 생성 중 오류가 발생했습니다.');
        },
      },
    );
  };

  return (
    <ButtonsWrapper>
      <ButtonContainer>
        <ExampleButton onClick={handleList}>
          <ExampleChangeIcon className="example-change-icon" /> 예시 변경
        </ExampleButton>
      </ButtonContainer>
      <ButtonContainer>
        <MailButton onClick={setMailInput}>
          <MakeMailIcon className="make-mail-icon" />
          메일 생성하기
        </MailButton>
      </ButtonContainer>
      <ModalWrapper>
        <StyledModal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          {status === 'pending' || status === 'error' ? (
            <SmallModalContent>
              <ModalHeader>
                {status === 'pending' ? '메일 생성 중...조금만 기다려 주세요!' : title}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {status === 'pending' ? <Spinner size="xl" /> : <p>{content}</p>}
              </ModalBody>
            </SmallModalContent>
          ) : (
            <LargeModalContent>
              <StyledModalHeader>{title}</StyledModalHeader>
              <ModalCloseButton />
              <StyledModalBody>
                <p>{content}</p>
              </StyledModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </LargeModalContent>
          )}
        </StyledModal>
      </ModalWrapper>
    </ButtonsWrapper>
  );
};

const ButtonsWrapper = styled.div`
  width: 95px;
  height: 265px;
  border-radius: 132.5px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExampleChangeIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('/images/exampleChangeIcon.svg');
  background-size: cover;
  transition: background-image 0.3s ease;
`;

const ExampleButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #707070;
  font-size: 14px;

  &:hover {
    .example-change-icon {
      background-image: url('/images/exampleChangeIconHover.svg');
    }
  }
`;

const MakeMailIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('/images/makeMailIcon.svg');
  background-size: cover;
  transition: background-image 0.3s ease;
`;

const MailButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #707070;
  font-size: 14px;

  &:hover {
    .make-mail-icon {
      background-image: url('/images/makeMailIconHover.svg');
    }
  }
`;

const SmallModalContent = styled(ModalContent)`
  width: auto;
  height: auto;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 15px 1px rgba(115, 128, 239, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LargeModalContent = styled(ModalContent)`
  width: auto;
  height: auto;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 15px 1px rgba(115, 128, 239, 0.3);
`;

const StyledModalHeader = styled(ModalHeader)`
  margin-top: 10px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  white-space: pre-wrap;
`;

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .chakra-modal__content-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
