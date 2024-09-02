import React from 'react';
import styled from '@emotion/styled';
import { AskListProps, Question } from '@/types';
import { useMail } from '@/Provider/MailContext';
import { useState, useEffect } from 'react';
import { breakpoints } from '@/styles/variants';

const purposes = [
  { id: '질문', label: '🙋🏻‍♂️질문' },
  { id: '과제 제출', label: '📚과제 제출' },
  { id: '성적 정정', label: '💯성적 정정' },
  { id: '병결 요청', label: '💧병결 요청' },
  { id: '상담 요청', label: '📝상담 요청' },
];

export const AskList = ({ randomInput }: AskListProps) => {
  const { isActive } = useMail();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (isActive === 'business' && 'company' in randomInput) {
      setQuestions([
        { ask: '메일 작성 목적을 선택해 주세요', input: randomInput.content },
        { ask: '보내는 사람의 이름을 입력해 주세요', input: randomInput.sender },
        { ask: '소속 회사명을 입력해 주세요', input: randomInput.company },
        { ask: '소속 부서를 입력해 주세요', input: randomInput.department },
        { ask: '추가 기재사항을 입력해 주세요', input: randomInput.additional },
        { ask: '받는 사람의 이름을 입력해 주세요', input: randomInput.receiver },
      ]);
    } else if (isActive !== 'business' && 'studentId' in randomInput) {
      setQuestions([
        { ask: '메일 작성 목적을 선택해 주세요', input: randomInput.content },
        { ask: '보내는 사람의 이름을 입력해 주세요', input: randomInput.sender },
        { ask: '보내는 사람의 학과를 입력해 주세요', input: randomInput.department },
        { ask: '보내는 사람의 학번을 입력해 주세요', input: randomInput.studentId },
        { ask: '강의명을 입력해 주세요', input: randomInput.subject },
        { ask: '받는 사람의 이름을 입력해주세요', input: randomInput.receiver },
      ]);
    }
  }, [isActive, randomInput]);

  return (
    <AskListWrapper>
      {questions.map((question, index) => (
        <AskListItemWrapper key={index}>
          <AskListItem>{question.ask}</AskListItem>
          {isActive === 'univ' && index === 0 ? (
            <InputListItem
              className="input"
              style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}
            >
              {purposes.map((purpose) => (
                <PurposeButton key={purpose.id} selected={randomInput.content === purpose.id}>
                  {purpose.label}
                </PurposeButton>
              ))}
            </InputListItem>
          ) : (
            <InputListItem>{question.input}</InputListItem>
          )}
        </AskListItemWrapper>
      ))}
    </AskListWrapper>
  );
};

const AskListWrapper = styled.div`
  width: 768px;
  height: 750px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(165, 165, 165, 0.2);
  display: flex;
  flex-direction: column;
  padding-left: 36px;
  padding-top: 46px;
  padding-bottom: 86px;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.md}) {
    width: 100%;
    padding: 2px;
    gap: 5px;
    .input {
      align-items: center;
    }
  }
`;
const AskListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  gap: 16px;
`;

const AskListItem = styled.div`
  color: var(--Grey700, #6f6f71);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.35px;
  border-radius: 39px;
  background: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  width: fit-content;
  @media (max-width: ${breakpoints.md}) {
    font-size: 12px;
  }
`;

const InputListItem = styled.div`
  color: var(--Grey800, #3c3c3f);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.4px;
  border-radius: 39px;
  background: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  width: fit-content;
  margin-left: auto;
  margin-right: 16px;
  @media (max-width: ${breakpoints.md}) {
    font-size: 10px;
    display: flex;
    align-items: center;
  }
`;

const PurposeButton = styled.div<{ selected: boolean }>`
  display: flex;
  height: 30px;
  width: auto;
  padding: 10px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #6ab9f2;
  background: ${(props) => (props.selected ? '#E5E5EA' : '#fff')};
  color: #000;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.3px;
`;
