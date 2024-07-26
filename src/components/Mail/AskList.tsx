import styled from '@emotion/styled';

interface PurposeButtonProps {
  selected: boolean;
}

interface RandomInputProps {
  randomInput: {
    mailPurpose: string;
    senderDepartment: string;
    senderId: string;
    courseName: string;
  };
}

const purposes = [
  { id: '질문', label: '🙋🏻‍♂️질문' },
  { id: '과제 제출', label: '📚과제 제출' },
  { id: '성적 정정', label: '💯성적 정정' },
  { id: '병결 요청', label: '💧병결 요청' },
  { id: '상담 요청', label: '📝상담 요청' },
];

export const AskList = ({ randomInput }: RandomInputProps) => {
  return (
    <AskListWrapper>
      <AskListItemWrapper>
        <AskListItem>메일 작성 목적을 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.mailPurpose}</InputListItem>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
          {purposes.map((purpose) => (
            <PurposeButton key={purpose.id} selected={randomInput.mailPurpose === purpose.id}>
              {purpose.label}
            </PurposeButton>
          ))}
        </div>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>보내는 사람의 학과를 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.senderDepartment}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>보내는 사람의 학번을 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.senderId}</InputListItem>
      </AskListItemWrapper>
      <AskListItemWrapper>
        <AskListItem>강의명을 입력해 주세요</AskListItem>
        <InputListItem>{randomInput.courseName}</InputListItem>
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

const PurposeButton = styled.div<PurposeButtonProps>`
  display: flex;
  height: 30px;
  width: auto;
  padding: 10px 10px;
  justify-ontent: center;
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
