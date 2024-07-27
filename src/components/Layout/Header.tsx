import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { breakpoints } from '@/styles/variants';
import { useMail } from '@/Provider/MailContext';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
  }
};

export const Header = () => {
  const mailContext = useMail();

  if (!mailContext) {
    throw new Error('MailContext not found');
  }
  const { handleMail } = mailContext;

  const handleMailInput = () => {
    handleMail({
      sender: '',
      content: '',
      department: '',
      studentId: '',
      subject: '',
      receiver: '',
    });
  };

  return (
    <Wrapper>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Link to={'/'}>
            <Logo src="/images/logo.svg" />
          </Link>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '47px' }}>
            <MidWrapper onClick={() => scrollToSection('section2')}> 시스템 체험</MidWrapper>
            <MidWrapper onClick={() => scrollToSection('section3')}> 기능 살펴보기</MidWrapper>
          </div>
        </div>
        <Link to={'/mail'} style={{ display: 'flex', alignItems: 'center' }}>
          <AiButton onClick={handleMailInput}>AI 메일 생성하기</AiButton>
        </Link>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = '80px';

const Wrapper = styled.header`
  z-index: 100;
  height: ${HEADER_HEIGHT};
  padding: 16px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(90deg, #e6e9ff 0%, #e5f3ff 100%);
  box-shadow: 0px 2px 18px 2px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 48px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  justify-content: space-between;
`;

const AiButton = styled(Button)`
  height: 40px;
  width: 136px;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid var(--black, #6ab9f2);
`;
const MidWrapper = styled.div`
  cursor: pointer;
  margin: 0px 20px;
  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`;
