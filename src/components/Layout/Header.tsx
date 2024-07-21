import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { Button } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Wrapper>
      <Container>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to={"/"}>
            <Logo src="/images/logo.svg" />
          </Link>
          <div style={{ margin: "30px 20px" }}> 시스템 체험</div>
          <div style={{ margin: "30px 20px" }}> 기능 살펴보기</div>
        </div>
        <Link to={"/mail"}>
          <AiButton>AI 메일 생성하기</AiButton>
        </Link>
      </Container>
    </Wrapper>
  )
}

export const HEADER_HEIGHT = "80px"

const Wrapper = styled.header`
  background: #3182ce;
  color: white;
  height: ${HEADER_HEIGHT};
  padding: 16px 40px;
`

const Logo = styled.img`
  height: 48px;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
