import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import { Header } from '@/components/Mail/Header';
import { AskList } from '@/components/Mail/AskList';
import { useMail } from '@/Provider/MailContext';
import { MailModal } from '@/components/Mail/MailModal';
import { breakpoints } from '@/styles/variants';
import { useDisclosure } from '@chakra-ui/react';

export const MailPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mailContext = useMail();
  const { isActive } = useMail();

  if (!mailContext) {
    throw new Error('MailContext not found');
  }
  const { mailInput } = mailContext;

  const openModal = () => {
    if (isActive === 'univ') {
      mailContext.resetMailInputUniv();
    }
    if (isActive === 'business') {
      mailContext.resetMailInputBusiness();
    }
    onOpen();
  };

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Wrapper>
      <LogoWrapper>
        <ContentWrapper>
          <Grid
            w="100%"
            h="100%"
            templateRows={{ base: 'auto auto auto', md: '106px 780px' }}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
          >
            <MedeaItems
              rowSpan={{ base: 1, md: 1 }}
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

            <GridItem rowSpan={{ base: 2, md: 1 }}>
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                templateRows={{ base: 'auto auto', md: '1fr' }}
                h="100%"
                justifyContent="center"
                alignItems="center"
                maxWidth="1200px"
                margin="0 auto"
              >
                <GridItem
                  colSpan={{ base: 1, md: 2 }}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <AskList randomInput={mailInput}></AskList>
                </GridItem>
                <GridItem
                  colSpan={{ base: 1, md: 1 }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ImageWrapper src="/images/exampleImage.svg" />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </ContentWrapper>
      </LogoWrapper>
      <AnimatedMailModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
