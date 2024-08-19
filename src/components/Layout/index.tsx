import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { HEADER_HEIGHT, MainHeader } from './Header/MainHeader';
import { UpperImage } from './UpperImage';
import { HeaderMobile } from './Header/Mobile/HeaderMobile';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@/styles/variants';

export const Layout = () => {
  const isMobile = useMediaQuery({ query: `(max-width : ${breakpoints.md})` });

  return (
    <Wrapper>
      <UpperImageWrapper>
        <UpperImage />
      </UpperImageWrapper>
      <HeaderWrapper>{isMobile ? <HeaderMobile isMain={true} /> : <MainHeader />}</HeaderWrapper>
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

const UpperImageWrapper = styled.div`
  width: 100%;
  height: calc(100vh + ${HEADER_HEIGHT} - 80px);
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
