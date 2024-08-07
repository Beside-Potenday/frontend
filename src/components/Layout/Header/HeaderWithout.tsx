import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { breakpoints } from '@/styles/variants';
import { useMail } from '@/Provider/MailContext';
import { RouterPath } from '@/routes/path';
import { useAuth } from '@/Provider/Auth';

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

  const { authInfo } = useAuth();

  return (
    <Wrapper>
      <Container>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {authInfo ? (
            <Link to={RouterPath.mypage}>
              <AuthWrapper>My Page</AuthWrapper>
            </Link>
          ) : (
            <Link to={RouterPath.login}>
              <AuthWrapper>Login</AuthWrapper>
            </Link>
          )}
        </div>

        <LogoLink to={RouterPath.home}>
          <Logo src="/images/logo.svg" />
        </LogoLink>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Link to={RouterPath.mail} style={{ display: 'flex', alignItems: 'center' }}>
            <AiButton onClick={handleMailInput}>AI 메일 생성하기</AiButton>
          </Link>
        </div>
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
  position: relative;
  display: flex;
  height: 40px;
  width: 136px;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: transparent;
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
  letter-spacing: -2%;
  background-clip: padding-box;

  &:hover {
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    color: white;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(to right, #6ab9f2, #7a89f0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const AuthWrapper = styled.div`
  cursor: pointer;
`;

const LogoLink = styled(Link)`
  margin-left: 250px;

  @media (max-width: ${breakpoints.md}) {
    margin-left: 100px;
  }
`;
