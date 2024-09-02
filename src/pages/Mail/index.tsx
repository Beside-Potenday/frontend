import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Header } from '@/components/Mail/Header';
import { AskList } from '@/components/Mail/AskList';
import { useMail } from '@/Provider/MailContext';
import { MailModal } from '@/components/Mail/MailModal';
import { breakpoints } from '@/styles/variants';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { MobileSwiper } from '@/components/Mail/MobileSwiper';

export const MailPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen, setAlertOpen] = useState(true);
  const mailContext = useMail();
  const { isActive } = useMail();
  const isMobile = useMediaQuery({ query: `(max-width : ${breakpoints.md})` });

  const location = useLocation();

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
    window.scrollTo(0, 0);
    if (location.state?.openModal) {
      setAlertOpen(true);
    }
  }, [location]);

  return (
    <Wrapper>
      <LogoWrapper>
        <ContentWrapper>
          <Grid
            w="100%"
            h="100%"
            templateRows={{ base: 'auto auto auto', md: '106px 780px' }}
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
            gap={2}
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
                <GridItem colSpan={{ base: 1, md: 2 }} display="flex" justifyContent="center">
                  <AskList randomInput={mailInput}></AskList>
                </GridItem>
                <GridItem
                  colSpan={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minWidth={{ base: 'auto', md: '400px' }} // md일 때만 400px로 설정
                >
                  {isMobile ? <MobileSwiper /> : <ImageWrapper src="/images/exampleImage.svg" />}
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </ContentWrapper>
      </LogoWrapper>
      <AnimatedMailModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <CustomAlert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)} />
    </Wrapper>
  );
};

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>✉️알파메일이 처음이신가요✉️</ModalHeader>
        <ModalBody>상단바에서 대학생, 직장인 중 해당되는 것을 눌러 메일을 생성해봐요!</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
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

const ImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  @media (max-width: ${breakpoints.md}) {
    width: 90%;
  }
`;
