import React, { useState } from 'react';
import { useMail } from '@/Provider/MailContext';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { mailSend } from '@/types';

interface MailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mailInputInitialState: mailSend = {
  content: '',
  sender: '',
  department: '',
  studentId: '',
  subject: '',
  receiver: '',
};

const modalHeaderContent = [
  '메일 작성 목적을 입력해 주세요',
  '보내는 사람의 이름을 입력해 주세요',
  '보내는 사람의 학과를 입력해 주세요',
  '보내는 사람의 학번을 입력해 주세요',
  '강의명을 입력해 주세요',
  '받는 사람의 이름을 입력해주세요',
];

const inputNames: (keyof mailSend)[] = [
  'content',
  'sender',
  'department',
  'studentId',
  'subject',
  'receiver',
];

export const MailModal = ({ isOpen, onClose }: MailModalProps) => {
  const { handleMail } = useMail();
  const [mailInput, setMailInput] = useState<mailSend>(mailInputInitialState);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMailInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentIndex < inputNames.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handleSubmit = () => {
    handleMail(mailInput);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      trapFocus={false}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <CustomModalContent>
        <ModalCloseButton />
        <ModalHeader>{modalHeaderContent[currentIndex]}</ModalHeader>
        <ModalBody>
          <StyledInput
            type="text"
            name={inputNames[currentIndex]}
            value={mailInput[inputNames[currentIndex]]}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={`${modalHeaderContent[currentIndex].split(' ')[0]}을(를) 입력해 주세요`}
          />
        </ModalBody>
        {currentIndex === inputNames.length - 1 && (
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              확인
            </Button>
          </ModalFooter>
        )}
      </CustomModalContent>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  & .chakra-modal__content-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CustomModalContent = styled(ModalContent)`
  border-radius: 8px;
  padding: 20px;
  width: 1080px !important; /* 너비를 1080px로 설정 */
  max-width: 1080px !important; /* 최대 너비를 1080px로 설정 */
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

export default MailModal;
