import { Img } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Grid, GridItem, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { mockData } from '@/types/mock';
import { Link } from 'react-router-dom';
import { RouterPath } from '@/routes/path';

interface StudentProps {
  isActive: boolean;
}

interface PurposeButtonProps {
  selected: boolean;
}

const purposes = [
  { id: '질문', label: '🙋🏻‍♂️질문' },
  { id: '과제 제출', label: '📚과제 제출' },
  { id: '성적 정정', label: '💯성적 정정' },
  { id: '병결 요청', label: '💧병결 요청' },
  { id: '상담 요청', label: '📝상담 요청' },
];

export const TestersBox = () => {
  const [isActive, setIsActive] = useState(false);
  const [randomInput, setRandomInput] = useState({
    mailPurpose: '질문',
    senderDepartment: '컴퓨터공학과',
    senderId: '2020123456',
    courseName: '자료구조',
  });

  const handleList = () => {
    const randomIndex = Math.floor(Math.random() * mockData.length);
    setRandomInput(mockData[randomIndex]);
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Img src="/images/testerslogo.svg" style={{ marginBottom: '10px' }}></Img>
        <ContentWrapper>
          <Grid
            w="100%"
            h="100%"
            templateRows="106px 80px 582px"
            templateColumns={{ base: 'repeat(1, 1fr)' }}
          >
            <GridItem rowSpan={1}></GridItem>
            <GridItem
              rowSpan={1}
              background={'white'}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  width: '100%',
                  paddingTop: '33px',
                }}
              >
                <Student isActive={isActive} onClick={() => setIsActive(!isActive)}>
                  대학생
                </Student>
                <Office>
                  직장인
                  <HoverImage src="/images/hoveroffice.svg" alt="Hover Image" />
                </Office>
              </div>
              <Bar></Bar>
            </GridItem>
            <GridItem rowSpan={1}>
              <Grid
                w="100%"
                h="100%"
                templateRows={{ base: 'repeat(1, 1fr)' }}
                templateColumns={{ base: 'repeat(3, 1fr)' }}
              >
                <GridItem colSpan={2}>
                  <AskList>
                    <AskListItemWrapper>
                      <AskListItem>메일 작성 목적을 입력해 주세요</AskListItem>
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                        {purposes.map((purpose) => (
                          <PurposeButton
                            key={purpose.id}
                            selected={randomInput.mailPurpose === purpose.id}
                          >
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
                  </AskList>
                </GridItem>
                <GridItem
                  colSpan={1}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                  flexDirection={'column'}
                  marginRight="56px"
                  marginBottom="25px"
                >
                  <GoButton onClick={handleList}>예시 변경</GoButton>
                  <Link to={RouterPath.mail} state={randomInput}>
                    <GoButton>메일 생성하기</GoButton>
                  </Link>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </ContentWrapper>
      </LogoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 768px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(106, 185, 242, 0.3);
  overflow: hidden;
`;
const Bar = styled.div`
  background: var(--Grey300, #e5e5ea);
  width: 1080px;
  height: 3px;
  position: absolute;
  bottom: 24px;
`;

const Student = styled.div<StudentProps>`
  margin-left: 167px;
  cursor: pointer;
  box-shadow: ${(props) => (props.isActive ? '0 3px 0 0 #6AB9F2' : 'none')};
  position: relative;
  z-index: 2;
  bottom: -1px;
`;

const Office = styled.div`
  margin-left: 44px;
  position: relative;
  z-index: 2;
  bottom: -1px;
  &:hover > img {
    visibility: visible;
  }
`;

const HoverImage = styled.img`
  visibility: hidden;
  position: relative;
  top: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 174px;
  height: 34px;
  flex-shrink: 0;
  z-index: 3;
`;

const GoButton = styled(Button)`
  display: flex;
  width: 116px;
  height: 65px;
  justify-content: center;
  align-items: center;
  background: #cacaca;
`;

const AskList = styled.div`
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
