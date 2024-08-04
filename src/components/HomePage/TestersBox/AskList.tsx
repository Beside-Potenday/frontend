import React from 'react';
import styled from '@emotion/styled';
import { mailSend } from '@/types';

interface AskListProps {
  randomInput: mailSend;
}

const purposes = [
  { id: '질문', label: '🙋🏻‍♂️질문' },
  { id: '과제 제출', label: '📚과제 제출' },
  { id: '성적 정정', label: '💯성적 정정' },
  { id: '병결 요청', label: '💧병결 요청' },
  { id: '상담 요청', label: '📝상담 요청' },
];

export const AskList = ({ randomInput }: AskListProps) => {
  return (
    <AskListWrapper>
      <AskListItemWrapper>
        <AskListItem>메일 작성 목적을 입력해 주세요</AskListItem>
        <InputListItem style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
          {purposes.map((purpose) => (
            <PurposeButton key={purpose.id} selected={randomInput.content === purpose.id}>
              {purpose.label}
            </PurposeButton>
          ))}
        </InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>보내는 사람의 이름을 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.sender}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>보내는 사람의 학과를 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.department}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>보내는 사람의 학번을 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.studentId}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>강의명을 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.subject}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>받는 사람의 이름을 입력해주세요</AskListItem>
        <InputListItem>{randomInput.receiver}</InputListItem>
      </AskListItemWrapper>
    </AskListWrapper>
  );
};

const AskListWrapper = styled.div`
  width: 768px;
  height: auto;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(165, 165, 165, 0.2);
  display: flex;
  flex-direction: column;
  padding-left: 36px;
  padding-top: 46px;
  padding-bottom: 46px;
  gap: 40px;
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
