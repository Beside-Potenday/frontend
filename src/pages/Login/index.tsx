import styled from '@emotion/styled';
import { Box, ChakraProvider, Image, Text } from '@chakra-ui/react';

export const Login = () => {
  return (
    <ChakraProvider>
      <Wrapper>
        <CenterBox>
          <Card>
            <Image src="/images/loginLogo.svg" alt="로그인 이미지" />
            <DescriptionText>
              간편하게 로그인하고 알파메일에서 제공하는 다양한 기능을 이용해보세요!
            </DescriptionText>
            <Image src="/images/personIcon.svg" alt="사람 그림" mb={8} />
            <a href="https://alphamail.site/google/login">
              <LoginButton>
                <Image src="/images/googleIcon.svg" alt="구글 아이콘" />
                구글 계정으로 로그인
              </LoginButton>
            </a>
            <AgreementText>
              <Text as="span" fontWeight="bold">alphamail의 이용약관</Text>과 <Text as="span" fontWeight="bold">개인정보 처리방침</Text>에 동의합니다.
            </AgreementText>
          </Card>
        </CenterBox>
      </Wrapper>
    </ChakraProvider>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e5f3ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterBox = styled.div`
  width: 45vw;
  height: 80vh;
  background-color: rgba(165, 165, 165, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Card = styled(Box)`
  width: 43vw;
  height: 77vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 40px; 
`;

const LoginButton = styled.button`
  display: flex;
  width: 20vw;
  height: 50px;
  padding: 0px 19px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 5px;
  background: var(--Grey900, #1c1c1e);
  color: #fff;

  /* Title5/Inter/Bold/16pt/-2% */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.32px;
`;

const DescriptionText = styled(Text)`
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 30px;
  text-align: center;
  color: #6f6f71;
`;

const AgreementText = styled(Text)`
  font-size: 12px;
  color: #6F6F71;
  margin-top: 20px;
  text-align: center;
`;

export default Login;
