import { Img } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import { mockData } from '@/types/mock';
import { AskList } from './AskList';
import { Header } from './Header';
import { Buttons } from './Buttons';

export const MailPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [randomInput, setRandomInput] = useState({
    mailPurpose: '질문',
    senderDepartment: '컴퓨터공학과',
    senderId: '2020123456',
    courseName: '자료구조',
  });

  const onIsActive = () => {
    setIsActive(!isActive);
  };

  const handleList = () => {
    const randomIndex = Math.floor(Math.random() * mockData.length);
    setRandomInput(mockData[randomIndex]);
  };

  return (
    <Wrapper>
      <LogoWrapper>
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
              <Header isActive={isActive} onIsActive={onIsActive}></Header>
            </GridItem>
            <GridItem rowSpan={1}>
              <Grid
                w="100%"
                h="100%"
                templateRows={{ base: 'repeat(1, 1fr)' }}
                templateColumns={{ base: 'repeat(3, 1fr)' }}
              >
                <GridItem colSpan={2}>
                  <AskList randomInput={randomInput}></AskList>
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
                  <Buttons handleList={handleList} randomInput={randomInput}></Buttons>
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
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 200px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 768px;
  background: #fff;
`;
