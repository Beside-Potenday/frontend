import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { HEADER_HEIGHT, MainHeader } from './Header/MainHeader';
import { UpperImage } from './UpperImage';
import { Box } from '@chakra-ui/react';

export const Layout = () => {
  return (
    <Wrapper>
      <TransparentOverlay />
      <HeaderPadding />
      <UpperImageWrapper>
        <UpperImage />
      </UpperImageWrapper>
      <HeaderWrapper>
        <MainHeader />
      </HeaderWrapper>
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const TransparentOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT};
  background: rgba(255, 255, 255, 0.3);
  z-index: 1;
`;

const HeaderPadding = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};
  background-color: #e5efff;
`;

const UpperImageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT});
`;

const HeaderWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const InnerWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: transparent;
`;
