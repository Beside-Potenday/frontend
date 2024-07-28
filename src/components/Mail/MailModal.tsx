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
  Spinner,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { mailSend } from '@/types';
import { usePostUniv } from '@/api/hooks/usePostUniv';

interface MailModalProps {
  isOpen: boolean;
  onClose: () => void;
  randomInput: mailSend;
}

const mailLetterInitialState: mailSend = {
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
  '메일을 생성 중 입니다',
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

export const MailModal = ({ isOpen, onClose, randomInput }: MailModalProps) => {
  const { handleMail, mailInput } = useMail();
  const [mailLetter, setMailLetter] = useState<mailSend>({
    ...mailLetterInitialState,
    ...randomInput,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false); // 포커스 상태 관리

  const { mutate } = usePostUniv();

  const handleConfirm = () => {
    setIsLoading(true);
    mutate(
      { ...mailInput },
      {
        onSuccess: (data) => {
          setTitle(data.title || '메일 생성 성공');
          setContent(data.content || '메일이 성공적으로 생성되었습니다.');
          setIsSubmitted(true);
          setIsLoading(false); // 로딩 종료
        },
        onError: (error) => {
          console.error('API call failed:', error);
          setTitle('메일 생성 실패');
          setContent('메일 생성 중 오류가 발생했습니다.');
          setIsSubmitted(true);
          setIsLoading(false); // 로딩 종료
        },
      },
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMailLetter((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEmptyInput(false);
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
    if (e.key === 'Enter') {
      if (currentIndex < inputNames.length - 1) {
        if (mailLetter[inputNames[currentIndex]].trim() === '') {
          setIsEmptyInput(true);
        } else {
          setCurrentIndex(currentIndex + 1);
          setIsEmptyInput(false);
        }
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
    setIsEmptyInput(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (currentIndex < inputNames.length - 1) {
      if (mailLetter[inputNames[currentIndex]].trim() === '') {
        setIsEmptyInput(true);
      } else {
        setCurrentIndex(currentIndex + 1);
        setIsEmptyInput(false);
      }
    } else {
      const allFieldsEmpty = Object.values(mailLetter).some((value) => value.trim() === '');
      if (allFieldsEmpty) {
        alert('입력값이 공백일 수는 없습니다.');
        setMailLetter(mailLetterInitialState);
        setCurrentIndex(0);
        setIsEmptyInput(false);
      } else {
        handleMail(mailLetter);
        handleConfirm();
      }
    }
  };

  const handleOptionClick = (value: string) => {
    setMailLetter((prev) => ({
      ...prev,
      content: value,
    }));
    setIsEmptyInput(false);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={() => {
        setIsSubmitted(false);
        setIsLoading(false);
        onClose();
      }}
      isCentered
      trapFocus={false}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <CustomModalContent>
        {currentIndex > 0 && !isSubmitted && (
          <ArrowUpButtonWrapper>
            <ArrowUpButton onClick={handlePrevClick} />
          </ArrowUpButtonWrapper>
        )}
        <CustomModalHeader>
          {isSubmitted
            ? title
            : isLoading
            ? '메일 생성 중 입니다...'
            : modalHeaderContent[currentIndex]}
        </CustomModalHeader>
        <CustomModalBody>
          {isSubmitted ? (
            <Text>{content}</Text>
          ) : (
            <>
              {isLoading ? (
                <Spinner size="xl" />
              ) : (
                <>
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
                    value={mailLetter[inputNames[currentIndex]]}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder={isFocused ? '' : placeholderTexts[currentIndex]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  {isEmptyInput && warningMessage && <WarningText>{warningMessage}</WarningText>}
                </>
              )}
            </>
          )}
        </CustomModalBody>
        <CustomModalFooter>
          {currentIndex !== 5 ? (
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
  margin-top: -15px;
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
`;

const WarningText = styled(Text)`
  color: red;
  font-size: 15px;
  margin-top: 10px;
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
