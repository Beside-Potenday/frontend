import { Img } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';

import { AskList } from './AskList';
import { Header } from './Header';
import { Buttons } from './Buttons';
import { breakpoints } from '@/styles/variants';
import { useMail } from '@/Provider/MailContext';
import { mockDataUniv } from '@/types/mock/mockUniv';
import { mockDataBusiness } from '@/types/mock/mockBusiness';
import { MailInput } from '@/types';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const TestersBox = () => {
  const [randomInput, setRandomInput] = useState<MailInput>({
    sender: '홍길동',
    content: '질문',
    department: '컴퓨터공학과',
    studentId: '2020123456',
    subject: '자료구조',
    receiver: '안지선',
  });
  const { isActive, onIsActive } = useMail();
  const isMobile = useMediaQuery({ query: `(max-width : ${breakpoints.md})` });

  const handleListUniv = () => {
    const randomIndex = Math.floor(Math.random() * mockDataUniv.length);
    setRandomInput(mockDataUniv[randomIndex]);
  };

  const handleListBusiness = () => {
    const randomIndex = Math.floor(Math.random() * mockDataBusiness.length);
    setRandomInput(mockDataBusiness[randomIndex]);
  };

  useEffect(() => {
    if (isActive === 'univ') {
      handleListUniv();
    } else {
      handleListBusiness();
    }
  }, [isActive]);

  return (
    <Wrapper>
      <LogoWrapper>
        {isMobile ? (
          <Img src="/images/mobileTestersLogo.svg" style={{ marginBottom: '-50px' }} />
        ) : (
          <Img src="/images/testerslogo.svg" style={{ marginBottom: '-50px' }} />
        )}
        <ContentWrapper>
          <Grid
            w="100%"
            h="100%"
            templateRows={{ base: 'auto 1fr', md: '106px 780px' }}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
            gap={5}
          >
            <MedeaItems
              rowSpan={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Header isActive={isActive} onIsActive={onIsActive}></Header>
            </MedeaItems>
            <GridItem colSpan={1}>
              <Grid
                w="100%"
                h="100%"
                templateRows={{ base: 'auto auto auto', md: 'repeat(1, 1fr)' }}
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
                gap={{ base: '20px', md: '0' }}
              >
                <GridItem colSpan={{ base: 1, md: 2 }} marginLeft={'0px'}>
                  <AskList randomInput={randomInput} />
                </GridItem>
                <GridItem
                  colSpan={1}
                  display={'flex'}
                  justifyContent={{ base: 'center', md: 'space-between' }}
                  alignItems={{ base: 'center', md: 'flex-end' }}
                  flexDirection={{ base: 'column', md: 'column' }}
                  position={'relative'}
                  width={'fit-content'}
                  marginLeft={{ base: '0px', md: '-10px' }}
                >
                  <Buttons
                    handleListUniv={handleListUniv}
                    handleListBusiness={handleListBusiness}
                    randomInput={randomInput}
                  />
                  <ImageWrapper src="/images/exampleImage2.svg" />
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
  @media (max-width: ${breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    margin: 0px;
    padding: 0px;
  }
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

const ImageWrapper = styled.img`
  @media (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`;
