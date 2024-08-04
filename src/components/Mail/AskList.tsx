import styled from '@emotion/styled';
import { mailSend } from '@/types';

export const AskList = ({ randomInput }: { randomInput: mailSend }) => {
  return (
    <AskListWrapper>
      <AskListItemWrapper>
        <AskListItem>메일 작성 목적을 입력해 주세요</AskListItem>
        <InputListItem visible={!!randomInput.content}>{randomInput.content || ' '}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>보내는 사람의 이름을 입력해 주세요</AskListItem>
        <InputListItem visible={!!randomInput.sender}>{randomInput.sender || ' '}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>보내는 사람의 학과를 입력해 주세요</AskListItem>
        <InputListItem visible={!!randomInput.department}>
          {randomInput.department || ' '}
        </InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>보내는 사람의 학번을 입력해 주세요</AskListItem>
        <InputListItem visible={!!randomInput.studentId}>
          {randomInput.studentId || ' '}
        </InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>강의명을 입력해 주세요</AskListItem>
        <InputListItem visible={!!randomInput.subject}>{randomInput.subject || ' '}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>받는 사람의 이름을 입력해주세요</AskListItem>
        <InputListItem visible={!!randomInput.receiver}>
          {randomInput.receiver || ' '}
        </InputListItem>
      </AskListItemWrapper>
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

const InputListItem = styled.div<{ visible: boolean }>`
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
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
