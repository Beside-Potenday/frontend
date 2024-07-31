import { Img } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import { mockData } from '@/types/mock';
import { AskList } from './AskList';
import { Header } from './Header';
import { Buttons } from './Buttons';
import { breakpoints } from '@/styles/variants';
import { useMail } from '@/Provider/MailContext';

export const TestersBox = () => {
  const [randomInput, setRandomInput] = useState({
    sender: '홍길동',
    content: '질문',
    department: '컴퓨터공학과',
    studentId: '2020123456',
    subject: '자료구조',
    receiver: '안지선',
  });
  const { isActive, onIsActive } = useMail();

  const handleList = () => {
    const randomIndex = Math.floor(Math.random() * mockData.length);
    setRandomInput(mockData[randomIndex]);
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Img src="/images/testerslogo.svg" style={{ marginBottom: '10px' }} />
        <ContentWrapper>
          <Grid
            w="100%"
            h="100%"
            templateRows={{ base: 'repeat(4, 1fr)', md: '106px 80px 752px' }}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
          >
            <MedeaItems rowSpan={1}></MedeaItems>
            <MedeaItems
              rowSpan={1}
              background={'white'}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Header isActive={isActive} onIsActive={onIsActive}></Header>
            </MedeaItems>
            <GridItem rowSpan={{ base: 3, md: 2 }}>
              <Grid
                w="100%"
                h="100%"
                templateRows={{ base: 'repeat(3, 1fr)', md: 'repeat(1, 1fr)' }}
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
              >
                <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 2, md: 1 }}>
                  <AskList randomInput={randomInput} />
                </GridItem>
                <GridItem
                  colSpan={1}
                  rowSpan={1}
                  display={'flex'}
                  justifyContent={{ base: 'center', md: 'space-between' }}
                  alignItems={{ base: 'center', md: 'flex-end' }}
                  flexDirection={{ base: 'row', md: 'column' }}
                  marginRight="56px"
                  marginBottom="25px"
                >
                  <Buttons handleList={handleList} randomInput={randomInput} />
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
  height: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(106, 185, 242, 0.3);
  overflow: hidden;
`;

const MedeaItems = styled(Grid)`
  @media (${breakpoints.md}) {
    display: none;
  }
`;
