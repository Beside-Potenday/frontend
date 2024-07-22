import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { Button } from "@chakra-ui/react"
import { breakpoints } from "@/styles/variants"

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
}

export const Header = () => {
  return (
    <Wrapper>
      <Container>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Link to={"/"}>
            <Logo src="/images/logo.svg" />
          </Link>
          <MidWrapper onClick={() => scrollToSection("section2")}> 시스템 체험</MidWrapper>
          <MidWrapper onClick={() => scrollToSection("section3")}> 기능 살펴보기</MidWrapper>
        </div>
        <Link to={"/mail"} style={{ display: "flex", alignItems: "center" }}>
          <AiButton>AI 메일 생성하기</AiButton>
        </Link>
      </Container>
    </Wrapper>
  )
}

export const HEADER_HEIGHT = "80px"

const Wrapper = styled.header`
  z-index: 100;
  height: ${HEADER_HEIGHT};
  padding: 16px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: transparent;
`

const Logo = styled.img`
  height: 48px;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  justify-content: space-between;
`

const AiButton = styled(Button)`
  height: 20px;
  width: 96px;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid var(--black, #6ab9f2);
`
const MidWrapper = styled.div`
  cursor: pointer;
  margin: 0px 20px;
  @media (max-width: ${breakpoints.md}) {
    display: none;
  }
`
