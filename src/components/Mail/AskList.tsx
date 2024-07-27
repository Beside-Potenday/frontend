import styled from '@emotion/styled';
import { mailSend } from '@/types';

export const AskList = ({ randomInput }: { randomInput: mailSend }) => {
  return (
    <AskListWrapper>
      <AskListItemWrapper>
        <AskListItem>메일 작성 목적을 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.content}</InputListItem>
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
  width: 568px;
  height: 100%;
  flex-shrink: 0;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.04);
  margin-left: 120px;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  padding-left: 36px;
  padding-top: 86px;
  gap: 40px;
`;

const AskListItem = styled.div`
  color: var(--Grey700, #6f6f71);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.35px;
`;

const AskListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputListItem = styled.div`
  color: var(--Grey800, #3c3c3f);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.4px;
`;
