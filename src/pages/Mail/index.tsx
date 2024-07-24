import styled from '@emotion/styled';
import { Grid, GridItem } from '@chakra-ui/react';
import { Header } from '@/components/Mail/Header';
import { useState } from 'react';
import { AskList } from '@/components/Mail/AskList';

import { useMail } from '@/Provider/MailContext';

export const MailPage = () => {
  const [isActive, setIsActive] = useState(false);
  const mailContext = useMail();

  if (!mailContext) {
    throw new Error('MailContext not found');
  }
  const { mailInput } = mailContext;

  console.log(mailInput);

  const onIsActive = () => {
    setIsActive(!isActive);
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
                  <AskList randomInput={mailInput}></AskList>
                </GridItem>
                <GridItem
                  colSpan={1}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                  flexDirection={'column'}
                  marginRight="56px"
                  marginBottom="25px"
                ></GridItem>
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
