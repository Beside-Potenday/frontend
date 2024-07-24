import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Header, HEADER_HEIGHT } from './Header';

import { Footer } from './Footer';


export const Layout = () => {
  return (
    <Wrapper>
      <Header />
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

const InnerWrapper = styled.div`
  width: 100%;
  padding-top: ${HEADER_HEIGHT};
  position: relative;
  background-color: transparent;
`;
