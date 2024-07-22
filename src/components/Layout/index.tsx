import styled from "@emotion/styled"
import { Outlet } from "react-router-dom"
import { Header, HEADER_HEIGHT } from "./Header"
import { useLocation } from "react-router-dom"

interface WrapperProps {
  isMailPage: boolean
}

export const Layout = () => {
  const location = useLocation()
  const isMailPage = location.pathname === "/mail"

  return (
    <Wrapper isMailPage={isMailPage}>
      <Header />
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  position: relative;
  background: ${({ isMailPage }) =>
    isMailPage
      ? "white"
      : `radial-gradient(50% 50% at 75% 25%, #d8edfd 0%, rgba(216, 237, 253, 0) 100%),
         radial-gradient(50% 50% at 25% 25%, #dee2fd 0%, rgba(230, 233, 255, 0) 100%),
         linear-gradient(180deg, #e5efff 0%, #fff 100%)`};
`

const InnerWrapper = styled.div`
  width: 100%;
  padding-top: ${HEADER_HEIGHT};
  position: relative;
  background-color: transparent;
`
