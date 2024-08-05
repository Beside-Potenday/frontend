import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import { Header } from '@/components/Mail/Header';
import { AskList } from '@/components/Mail/AskList';
import { useMail } from '@/Provider/MailContext';
import { MailModal } from '@/components/Mail/MailModal';
import { breakpoints } from '@/styles/variants';

export const MailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달을 처음에 열리게 설정
  const mailContext = useMail();

  if (!mailContext) {
    throw new Error('MailContext not found');
  }
  const { mailInput } = mailContext;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <Wrapper>
      <LogoWrapper>
        <ContentWrapper>
          <Grid
            w="100%"
            h="100%"
            templateRows={{ base: '106px 780px' }}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
          >
            <MedeaItems
              rowSpan={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Header
                isActive={mailContext.isActive}
                onIsActive={mailContext.onIsActive}
                onOpen={openModal}
                onClose={closeModal}
              />
            </MedeaItems>

            <GridItem colSpan={1}>
              <Grid templateColumns="repeat(3, 1fr)" h="100%">
                <GridItem colSpan={{ base: 1, md: 2 }}>
                  <AskList randomInput={mailInput}></AskList>
                </GridItem>
                <GridItem
                  colSpan={1}
                  display={'flex'}
                  justifyContent={{ base: 'center', md: 'space-between' }}
                  alignItems={{ base: 'center', md: 'flex-end' }}
                  flexDirection={{ base: 'row', md: 'column' }}
                >
                  <ImageWrapper src="/images/exampleImage.svg" />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </ContentWrapper>
      </LogoWrapper>
      <AnimatedMailModal isOpen={isModalOpen} onClose={closeModal} />
    </Wrapper>
  );
};

const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AnimatedMailModal = styled(MailModal)`
  ${fadeIn}
  animation: fadeIn 0.5s ease-out forwards;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--Blue100, #e5f3ff);
`;

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(0, 148, 255, 0.2) 0%,
    rgba(0, 148, 255, 0) 100%
  );
  border-radius: 1244px;
`;

const ContentWrapper = styled(Box)`
  width: 100%;
  height: 100%;
`;

const MedeaItems = styled(Grid)`
  @media (${breakpoints.md}) {
    display: none;
  }
`;

const ImageWrapper = styled.img``;
