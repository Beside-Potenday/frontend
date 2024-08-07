import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Header, HEADER_HEIGHT } from './Header/HeaderWithout';

export const NoFooterLayout = () => {
  return (
    <Wrapper>
      <Header />
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
