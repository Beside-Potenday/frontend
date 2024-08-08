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
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { mailSendUniv, mailSendBusiness } from '@/types';
import { usePostUniv } from '@/api/hooks/usePostUniv';
import { useForm, Controller } from 'react-hook-form';
import { usePostBusiness } from '@/api/hooks/usePostBusiness';
import {
  mailLetterInitialState,
  mailLetterInitialStateBusiness,
  placeholderTexts,
  placeholderTextsBusiness,
  modalHeaderContent,
  modalHeaderContentBusiness,
  currentInputNames,
  currentInputNamesBusiness,
  options,
  warningTextsBusiness,
  warningTextsUniv,
} from './MailModalData';
import { useAuth } from '@/Provider/Auth';
import { usePostMail } from '@/api/hooks/Mail/usePostMail';
import { useGoMail } from '@/api/hooks/Mail/useGoMail';

interface MailModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface OptionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean; // selected prop 추가
}

export const MailModal = ({ isOpen, onOpen, onClose }: MailModalProps) => {
  const { handleMail } = useMail();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [firstInput, setFirstInput] = useState('');
  const { isActive, handleMailResult, mailResult } = useMail();
  const [noError, setNoError] = useState(false);
  const { authInfo } = useAuth();

  const { mutate: mailmutate } = usePostMail();
  const { mutate: mailGo } = useGoMail();

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
    formState: { errors, isValid },
  } = useForm<mailSendUniv | mailSendBusiness>({
    mode: 'onChange',
    defaultValues: isActive === 'univ' ? mailLetterInitialState : mailLetterInitialStateBusiness,
  });

  const setMailInputUniv = (data: mailSendUniv) => {
    setIsLoading(true);
    handleMail(data);
    setIsHide(true);

    const univData: mailSendUniv = {
      sender: data.sender,
      receiver: data.receiver,
      department: data.department,
      studentId: data.studentId,
      subject: data.subject,
      content: data.content,
    };

    console.log(univData);

    univMutate(
      { ...(univData as unknown as mailSendUniv) },
      {
        onSuccess: (data) => {
          console.log(data);
          setTitle(data.title || '메일 생성 성공');
          setContent(data.content || '메일이 성공적으로 생성되었습니다.');
          setIsSubmitted(true);
          setIsLoading(false);
          setNoError(true);
          handleMailResult({
            subject: data.title,
            body: data.content,
            job: 'univ',
          });
        },
        onError: (error) => {
          setTitle('메일 생성 실패');
          setContent('메일 생성 중 오류가 발생했습니다.');
          setIsSubmitted(true);
          setIsLoading(false);
          setNoError(false);
        },
      },
    );
    setIsHide(!isHide);
  };

  const setMailInputBusiness = (data: mailSendBusiness) => {
    setIsLoading(true);
    handleMail(data);
    setIsHide(true);

    const businessData: mailSendBusiness = {
      sender: data.sender,
      receiver: data.receiver,
      company: data.company,
      department: data.department,
      additional: data.additional,
      content: data.content,
    };

    console.log(businessData);

    businessMutate(
      { ...(businessData as unknown as mailSendBusiness) },
      {
        onSuccess: (data) => {
          console.log(data);
          setTitle(data.title || '메일 생성 성공');
          setContent(data.content || '메일이 성공적으로 생성되었습니다.');
          setIsSubmitted(true);
          setIsLoading(false);
          setNoError(true);

          handleMailResult({
            subject: data.title,
            body: data.content,
            job: 'business',
          });
        },
        onError: (error) => {
          setTitle('메일 생성 실패');
          setContent('메일 생성 중 오류가 발생했습니다.');
          setIsSubmitted(true);
          setIsLoading(false);
          setNoError(false);
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
      if (currentIndex < currentcurrentInputNames.length - 1) {
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
        await setValue(currentcurrentInputNames[currentIndex], combinedValue, {
          shouldValidate: true,
        });
      } else {
        await setValue(currentcurrentInputNames[currentIndex], inputValue, {
          shouldValidate: true,
        });
      }
      await handleNextClick(inputValue);
      return;
    }
  };

  const handlePutMail = () => {
    if (authInfo) {
      mailmutate({ ...mailResult });
      alert('📨 저장이 완료되었습니다!');
    } else {
      alert('로그인 후 메일을 저장 할 수 있습니다.');
    }
    onClose();
  };

  const handleGoMail = () => {
    const recipientEmail = prompt('받는 사람의 이메일 주소를 입력해 주세요:');

    if (authInfo) {
      const myMailAddress = sessionStorage.getItem('email');

      if (recipientEmail) {
        const mailGoContent = {
          to: recipientEmail,
          from: myMailAddress as string,
          subject: mailResult.subject,
          body: mailResult.body,
        };
        mailGo({ ...mailGoContent });
        alert('📨 메일을 보냈습니다!');
      } else {
        alert('유효한 이메일 주소를 입력해 주세요.');
      }
    } else {
      alert('로그인 후 메일을 보낼할 수 있습니다.');
    }

    onClose();
  };

  useEffect(() => {
    setIsFocused(false);
    setValue(currentcurrentInputNames[currentIndex], '', { shouldValidate: true });
  }, [currentIndex, setValue, currentcurrentInputNames]);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 상태 초기화
      setCurrentIndex(0);
      setIsSubmitted(false);
      setIsLoading(false);
      setTitle('');
      setContent('');
      setIsFocused(false);
      setIsHide(false);
      setFirstInput('');
    }
  }, [isOpen]);

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
        {currentIndex > 0 && !isLoading && !isSubmitted && (
          <ArrowUpButtonWrapper>
            <ArrowUpButton onClick={handlePrevClick} />
          </ArrowUpButtonWrapper>
        )}
        <CustomModalHeader>
          {isSubmitted ? title : isLoading ? '' : currentModalHeaderContent[currentIndex]}
        </CustomModalHeader>
        <CustomModalBody>
          {isSubmitted ? (
            <Text>{content}</Text>
          ) : (
            <>
              {isLoading ? (
                <VideoContainer>
                  <video src="/images/loading.mp4" autoPlay loop muted playsInline>
                    Your browser does not support the video tag.
                  </video>
                  <OverlayImage src="/images/loading.svg" alt="Loading" />
                </VideoContainer>
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
                    name={currentcurrentInputNames[currentIndex]}
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
                          if (isActive === 'univ' && !/^\d+$/.test(value) && value.trim() !== '') {
                            return (currentWarningTexts as typeof warningTextsUniv).studentId;
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
                            setValue(currentcurrentInputNames[currentIndex], e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                          onKeyDown={handleKeyDown}
                        />
                        {errors && (
                          <WarningText>
                            {isActive === 'univ'
                              ? (errors as any)[currentcurrentInputNames[currentIndex]]?.message
                              : (errors as any)[currentcurrentInputNames[currentIndex]]?.message}
                          </WarningText>
                        )}
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
            {currentIndex < currentcurrentInputNames.length - 1 ? (
              <ArrowButton onClick={() => handleNextClick('')} />
            ) : (
              <StyledButton
                onClick={handleSubmit((data) => {
                  console.log('Form submitted', data);
                  if (isActive === 'univ') {
                    setMailInputUniv(data as mailSendUniv);
                  } else {
                    setMailInputBusiness(data as mailSendBusiness);
                  }
                })}
                disabled={!isValid}
              >
                <PenIcon />
                생성하기
              </StyledButton>
            )}
          </CustomModalFooter>
        )}
        {isSubmitted && noError && (
          <ModalFooter gap={10}>
            <Button colorScheme="blue" onClick={handlePutMail}>
              저장하기
            </Button>
            <Button colorScheme="blue" onClick={handleGoMail}>
              메일 보내기
            </Button>
          </ModalFooter>
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

const OverlayImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101; /* Ensure the overlay is above the video */
`;

const VideoContainer = styled.div`
  position: relative; /* Add this line */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: auto;
  }
`;

export default MailModal;
