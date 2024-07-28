import React, { useState } from 'react';
import { useMail } from '@/Provider/MailContext';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { mailSend } from '@/types';

interface MailModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
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
  '메일 작성 목적을 선택해 주세요',
  '보내는 사람의 이름을 입력해 주세요',
  '보내는 사람의 학과를 입력해 주세요',
  '보내는 사람의 학번을 입력해 주세요',
  '강의명을 입력해 주세요',
  '받는 사람의 이름을 입력해 주세요',
];

const inputNames: (keyof mailSend)[] = [
  'content',
  'sender',
  'department',
  'studentId',
  'subject',
  'receiver',
];

const placeholderTexts = [
  '글자 수 제한: 5자 이상~300자 이하',
  '홍길동',
  '컴퓨터공학과',
  '',
  '컴퓨터프로그래밍',
  '김알파',
];

const warningTexts = {
  content: ['메일 작성 목적을 선택하거나 입력해주세요', '5자 이상~300자 이하로 입력해주세요'],
  studentId: '숫자만 입력 가능해요',
};

export const MailModal = ({ isOpen, onClose, handleConfirm }: MailModalProps) => {
  const { handleMail } = useMail();
  const [mailInput, setMailInput] = useState<mailSend>({
    ...mailInputInitialState,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false); // 포커스 상태 관리

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMailInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEmptyInput(false);
    setWarningMessage(null);
  };

  const validateInput = () => {
    const value = mailInput[inputNames[currentIndex]].trim();
    if (currentIndex === 0) {
      if (value === '') {
        setWarningMessage(warningTexts.content[0]);
        return false;
      } else if (value !== '질문' && (value.length < 5 || value.length > 300)) {
        setWarningMessage(warningTexts.content[1]);
        return false;
      }
    } else if (currentIndex === 3) {
      if (!/^\d+$/.test(value)) {
        setWarningMessage(warningTexts.studentId);
        return false;
      }
    }
    return true;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentIndex < inputNames.length - 1) {
      if (validateInput()) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsEmptyInput(true);
      }
    }
  };

  const handleNextClick = () => {
    if (currentIndex < inputNames.length - 1) {
      if (validateInput()) {
        setCurrentIndex(currentIndex + 1);
        setIsEmptyInput(false);
      } else {
        setIsEmptyInput(true);
      }
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsEmptyInput(false);
      setWarningMessage(null);
    }
  };

  const handleSubmit = () => {
    if (currentIndex < inputNames.length - 1) {
      if (validateInput()) {
        setCurrentIndex(currentIndex + 1);
        setIsEmptyInput(false);
      } else {
        setIsEmptyInput(true);
      }
    } else {
      const anyFieldFilled = Object.values(mailInput).some((value) => value.trim() !== '');
      if (!anyFieldFilled) {
        alert('입력값이 모두 공백일 수는 없습니다.');
        setMailInput(mailInputInitialState);
        setCurrentIndex(0);
        setIsEmptyInput(false);
        setWarningMessage(null);
      } else {
        handleMail(mailInput);
        handleConfirm();
        onClose();
      }
    }
  };

  const handleOptionClick = (value: string) => {
    setMailInput((prev) => ({
      ...prev,
      content: value,
    }));
    setIsEmptyInput(false);
    setWarningMessage(null);
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
        {currentIndex > 0 && (
          <ArrowUpButtonWrapper>
            <ArrowUpButton onClick={handlePrevClick} />
          </ArrowUpButtonWrapper>
        )}
        <CustomModalHeader>{modalHeaderContent[currentIndex]}</CustomModalHeader>
        <CustomModalBody>
          {currentIndex === 0 && (
            <ButtonContainer>
              <OptionButton onClick={() => handleOptionClick('질문')}>🙋🏻‍♂️ 질문</OptionButton>
              <OptionButton onClick={() => handleOptionClick('과제 제출')}>
                📚 과제 제출
              </OptionButton>
              <OptionButton onClick={() => handleOptionClick('성적 정정')}>
                💯 성적 정정
              </OptionButton>
              <OptionButton onClick={() => handleOptionClick('병결 요청')}>
                💧 병결 요청
              </OptionButton>
              <OptionButton onClick={() => handleOptionClick('상담 요청')}>
                📝 상담 요청
              </OptionButton>
            </ButtonContainer>
          )}
          <StyledInput
            type="text"
            name={inputNames[currentIndex]}
            value={mailInput[inputNames[currentIndex]]}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder={isFocused ? '' : placeholderTexts[currentIndex]} // 포커스 상태에 따라 placeholder 설정
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isEmptyInput && warningMessage && <WarningText>{warningMessage}</WarningText>}
        </CustomModalBody>
        <CustomModalFooter>
          {currentIndex < inputNames.length - 1 ? (
            <ArrowButton onClick={handleNextClick} />
          ) : (
            <StyledButton onClick={handleSubmit}>
              <PenIcon />
              생성하기
            </StyledButton>
          )}
        </CustomModalFooter>
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 1080px !important;
  max-width: 1080px !important;
  height: 240px !important;
  max-height: 240px !important;
  border: 3px solid transparent;
  border-radius: 20px;
  background-clip: padding-box;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);

  &:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 20px; /* Same as border-radius */
    padding: 3px; /* Adjust as per the border width */
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const ArrowUpButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const CustomModalHeader = styled(ModalHeader)`
  margin-top: 10px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CustomModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CustomModalFooter = styled(ModalFooter)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: -20px;
  margin-bottom: 10px;
  display: flex;
  gap: 20px;
`;

const OptionButton = styled(Button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 17px;
  border-radius: 50px;
  background-clip: padding-box;
  background: white;
  color: black;
  gap: 6px;

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
    border-radius: 50px;
    padding: 1.5px;
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const StyledInput = styled(Input)`
  margin-top: 10px;
  margin-bottom: -10px;
  width: 701px;
  height: 60px;
  border-radius: 10px;
  background-color: #f2f2f7;
  padding: 0 16px;
  text-align: center;
  caret-color: black; // 커서 색상 설정
  caret-width: 2px; // 커서 굵기 설정
`;

const WarningText = styled(Text)`
  color: red;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: -15px;
`;

const ArrowButton = styled(Button)`
  background: none;
  box-shadow: none;
  width: 24px;
  height: 24px;
  padding: 0;

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid #000;
    margin: auto;
  }
`;

const ArrowUpButton = styled(Button)`
  background: none;
  box-shadow: none;
  width: 24px;
  height: 24px;
  padding: 0;

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #000;
    margin: auto;
  }
`;

const StyledButton = styled(Button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 17px;
  width: 120px;
  height: 40px;
  border-radius: 50px;
  background-clip: padding-box;
  background: white;
  color: black;
  gap: 6px;

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
    border-radius: 50px;
    padding: 2px;
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const PenIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url('/images/penIcon.svg');
  background-size: cover;
`;

export default MailModal;
