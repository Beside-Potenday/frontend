import React, { useState, useEffect } from 'react';
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
import { mailSendUniv, mailSendBusiness } from '@/types';
import { usePostUniv } from '@/api/hooks/usePostUniv';
import { useForm, Controller } from 'react-hook-form';
import { usePostBusiness } from '@/api/hooks/usePostBusiness';

interface MailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mailLetterInitialStateBusiness: mailSendBusiness = {
  content: '',
  sender: '',
  company: '',
  department: '',
  additional: '',
  receiver: '',
};

const currentInputNamesBusiness: (keyof mailSendBusiness)[] = [
  'content',
  'sender',
  'company',
  'department',
  'additional',
  'receiver',
];

const placeholderTextsBusiness = [
  '글자 수 제한: 5자 이상~300자 이하',
  '홍길동',
  '알파코',
  '인사팀',
  '추가 기재사항',
  '김알파',
];

const modalHeaderContentBusiness = [
  '메일 작성 목적을 선택해 주세요',
  '보내는 사람의 이름을 입력해 주세요',
  '소속 회사명을 입력해 주세요',
  '소속 부서를 입력해 주세요',
  '추가 기재사항을 입력해 주세요',
  '받는 사람의 이름을 입력해 주세요',
  '메일을 생성 중 입니다',
];

const mailLetterInitialState: mailSendUniv = {
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

const currentInputNames: (keyof mailSendUniv)[] = [
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

const options = [
  { label: '🙋🏻‍♂️ 질문', value: '질문' },
  { label: '📚 과제 제출', value: '과제 제출' },
  { label: '💯 성적 정정', value: '성적 정정' },
  { label: '💧 병결 요청', value: '병결 요청' },
  { label: '📝 상담 요청', value: '상담 요청' },
];

const warningTextsUniv = {
  content: ['메일 작성 목적을 선택하거나 입력해주세요', '5자 이상~300자 이하로 입력해주세요'],
  studentId: '숫자만 입력 가능해요',
};

const warningTextsBusiness = {
  content: ['메일 작성 목적을 입력해주세요', '5자 이상~300자 이하로 입력해주세요'],
};

interface OptionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean; // selected prop 추가
}

export const MailModal = ({ isOpen, onClose }: MailModalProps) => {
  const { handleMail } = useMail();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [firstInput, setFirstInput] = useState('');
  const { isActive } = useMail();

  const currentcurrentInputNames =
    isActive === 'univ' ? currentInputNames : currentInputNamesBusiness;
  const currentPlaceholderTexts = isActive === 'univ' ? placeholderTexts : placeholderTextsBusiness;
  const currentModalHeaderContent =
    isActive === 'univ' ? modalHeaderContent : modalHeaderContentBusiness;

  const handleOptionClick = (value: string) => {
    setFirstInput(value);
  };

  const { univMutate } = usePostUniv();
  const { businessMutate } = usePostBusiness();

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm<mailSendUniv | mailSendBusiness>({
    mode: 'onChange',
    defaultValues: isActive === 'univ' ? mailLetterInitialState : mailLetterInitialStateBusiness,
  });

  const setMailInputUniv = (data: mailSendUniv) => {
    setIsLoading(true);
    handleMail(data);
    setIsHide(true);

    univMutate(
      { ...(data as unknown as mailSendUniv) },
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
    setIsHide(!isHide);
  };

  const setMailInputBusiness = (data: mailSendBusiness) => {
    setIsLoading(true);
    handleMail(data);
    setIsHide(true);

    businessMutate(
      { ...(data as unknown as mailSendBusiness) },
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
    setIsHide(!isHide);
  };

  const handleNextClick = async (inputValue: string) => {
    const isValid = await trigger(currentcurrentInputNames[currentIndex]);

    if (currentIndex === 0 && firstInput && !inputValue) {
      setValue(currentcurrentInputNames[currentIndex], firstInput, { shouldValidate: true });
    }

    if (isValid) {
      if (currentIndex < currentInputNames.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFocused(false);
      }
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFocused(false);
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      const inputValue = (event.target as HTMLInputElement).value;
      if (currentIndex === 0 && firstInput) {
        event.preventDefault();
        const combinedValue = `${firstInput} : ${inputValue}`.trim();
        await setValue(currentInputNames[currentIndex], combinedValue, { shouldValidate: true });
      } else {
        await setValue(currentInputNames[currentIndex], inputValue, { shouldValidate: true });
      }
      await handleNextClick(inputValue);
      return;
    }
  };

  useEffect(() => {
    setIsFocused(false);
    setValue(currentInputNames[currentIndex], '', { shouldValidate: true });
  }, [currentIndex, setValue]);

  const currentWarningTexts = isActive === 'univ' ? warningTextsUniv : warningTextsBusiness;

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
            : currentModalHeaderContent[currentIndex]}
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
                  {currentIndex === 0 && isActive === 'univ' && (
                    <ButtonContainer>
                      {options.map((option) => (
                        <OptionButton
                          key={option.value}
                          onClick={() => handleOptionClick(option.value)}
                          selected={firstInput === option.value}
                        >
                          {option.label}
                        </OptionButton>
                      ))}
                    </ButtonContainer>
                  )}

                  <Controller
                    name={currentInputNames[currentIndex]}
                    control={control}
                    rules={{
                      validate: (value) => {
                        if (currentIndex === 0) {
                          if (!value && !firstInput) {
                            return currentWarningTexts.content[0];
                          }
                          if (value.length < 5 || value.length > 300) {
                            return currentWarningTexts.content[1];
                          }
                        }

                        if (currentIndex === 3) {
                          if (isActive === 'univ' && (!/^\d+$/.test(value) || '')) {
                            return (currentWarningTexts as typeof warningTextsUniv).studentId;
                          }
                          if (isActive === 'business' && value.length < 5) {
                            return currentWarningTexts.content[1];
                          }
                        }

                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          {...field}
                          placeholder={isFocused ? '' : currentPlaceholderTexts[currentIndex]}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          onChange={(e) => {
                            field.onChange(e);
                            setValue(currentInputNames[currentIndex], e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                          onKeyDown={handleKeyDown}
                        />
                      </>
                    )}
                  />
                </>
              )}
            </>
          )}
        </CustomModalBody>
        {!isHide && (
          <CustomModalFooter>
            {currentIndex < currentInputNames.length - 1 ? (
              <ArrowButton onClick={() => handleNextClick('')} />
            ) : (
              <StyledButton
                onClick={handleSubmit(() =>
                  isActive === 'univ' ? setMailInputUniv : setMailInputBusiness,
                )}
                disabled={!isValid}
              >
                <PenIcon />
                생성하기
              </StyledButton>
            )}
          </CustomModalFooter>
        )}
      </CustomModalContent>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  display: inline-flex;
  white-space: nowrap;
  margin: 10px;
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
  width: auto;
  height: auto;
  max-width: 1080px !important;
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
  white-space: pre-wrap;
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

const OptionButton = styled(Button)<OptionButtonProps>`
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

  background: ${(props) =>
    props.selected ? 'linear-gradient(to right, #6ab9f2, #7a89f0)' : '#fff'};

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
`;

// const WarningText = styled(Text)`
//   color: red;
//   font-size: 15px;
//   margin-top: 10px;
// `;

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
