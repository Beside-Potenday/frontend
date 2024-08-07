import styled from '@emotion/styled';

export const Login = () => {
  return (
    <Wrapper>
      <img src="/images/loginLogo.svg" alt="로그인 이미지" />
      <a href="https://alphamail.site/google/login">
        <LoginButton>
          <img src="/images/googleIcon.svg" alt="구글 아이콘"></img>구글 계정으로 로그인
        </LoginButton>
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 630px;
  height: 670px;
`;

const LoginButton = styled.button`
  display: flex;
  width: 473px;
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
