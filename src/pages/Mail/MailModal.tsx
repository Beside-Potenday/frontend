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

interface MailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mailInputInitialState = {
  mailPurpose: '',
  senderDepartment: '',
  senderId: '',
  courseName: '',
};

export const MailModal = ({ isOpen, onClose }: MailModalProps) => {
  const { handleMail } = useMail();
  const [mailInput, setMailInput] = useState(mailInputInitialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // 디버깅 로그 추가
    setMailInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleMail({ mailBox: mailInput });
    console.log('Submitted mailInput:', mailInput); // 디버깅 로그 추가
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
        <ModalHeader>메일 작성 목적을 입력해 주세요</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StyledInput
            type="text"
            name="mailPurpose"
            value={mailInput.mailPurpose}
            onChange={handleChange}
            placeholder="목적을 300자 이내로 작성해주세요"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            확인
          </Button>
        </ModalFooter>
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
