import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Header, HEADER_HEIGHT } from './Header/HeaderWithout';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@/styles/variants';
import { HeaderMobile } from './Header/Mobile/HeaderMobile';

export const NoFooterLayout = () => {
  const isMobile = useMediaQuery({ query: `(max-width : ${breakpoints.md})` });
  return (
    <Wrapper>
      {isMobile ? <HeaderMobile isMain={false} /> : <Header />}
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InnerWrapper = styled.div`
  width: 100%;
  padding-top: ${HEADER_HEIGHT};
  position: relative;
  background-color: transparent;
`;
