import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { HEADER_HEIGHT } from '../HeaderWithout';
import { RouterPath } from '@/routes/path';
import { useOpenHamburger } from '@/Provider/OpenHamburger';
import { HeaderSlide } from './HeaderSlide';

export const HeaderMobile = ({ isMain }: { isMain: boolean }) => {
  const { isReady, handleIsReady } = useOpenHamburger();

  return (
    <Wrapper isMain={isMain}>
      <LogoLink to={RouterPath.home}>
        <Logo src="/images/logo.svg" />
      </LogoLink>
      <img
        style={{ cursor: 'pointer' }}
        src="/images/menuHamburger.svg"
        alt="메뉴 버튼"
        onClick={() => handleIsReady(!isReady)}
      />
      <HeaderSlide isReady={isReady} handleIsReady={handleIsReady} />
    </Wrapper>
  );
};

const Wrapper = styled.header<{ isMain: boolean }>`
  z-index: 100;
  height: ${HEADER_HEIGHT};
  padding: 16px 40px;

  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(90deg, #e6e9ff 0%, #e5f3ff 100%);
  box-shadow: 0px 2px 18px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;

  position: ${(props) => (props.isMain ? 'sticky' : 'fixed')};
`;

const LogoLink = styled(Link)`
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 48px;
  cursor: pointer;
`;
