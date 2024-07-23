import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { breakpoints } from '@/styles/variants';

export const Footer: React.FC = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <Description>
          이메일 작성의 번거로움 단번에 해결하고 싶을 땐<br />
          AI 메일 생성 서비스, alpha mail
        </Description>
        <LinkWrapper>
          <StyledLink to="/terms">이용약관</StyledLink>
          <StyledLink2 to="/privacy">개인정보처리방침</StyledLink2>
          <StyledLink to="/contact">문의</StyledLink>
        </LinkWrapper>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  height: 300px;
  padding: 20px 40px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  text-align: center;
`;

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  color: #1c1c1e;
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
  letter-spacing: -0.02em;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 130px; /* 링크들 사이의 간격을 설정 */
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledLink = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #3c3c3f;
  font-weight: 400;
  line-height: 16.8px;
  letter-spacing: -0.025em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledLink2 = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #3c3c3f;
  font-weight: 700;
  line-height: 16.8px;
  letter-spacing: -0.02em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Footer;
