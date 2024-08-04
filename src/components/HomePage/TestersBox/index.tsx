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
            templateRows={{ base: 'auto 1fr', md: '106px 80px 752px' }}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
          >
            <MedeaItems>
              <Header isActive={isActive} onIsActive={onIsActive}></Header>
            </MedeaItems>
            <GridItem>
              <Grid
                w="100%"
                h="100%"
                templateRows={{ base: 'auto auto auto', md: 'repeat(1, 1fr)' }}
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
                gap={{ base: '20px', md: '0' }}
              >
                <GridItem colSpan={{ base: 1, md: 2 }}>
                  <AskList randomInput={randomInput} />
                </GridItem>
                <GridItem
                  colSpan={1}
                  display={'flex'}
                  justifyContent={{ base: 'center', md: 'space-between' }}
                  alignItems={{ base: 'center', md: 'flex-end' }}
                  flexDirection={{ base: 'column', md: 'column' }}
                  marginRight={{ base: '0', md: '56px' }}
                  marginBottom={{ base: '0', md: '25px' }}
                  backgroundImage={'/images/exampleImage2.svg'}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  maxWidth={400}
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
  overflow: hidden;
`;

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const MedeaItems = styled(Grid)`
  @media (${breakpoints.md}) {
    display: none;
  }
`;
