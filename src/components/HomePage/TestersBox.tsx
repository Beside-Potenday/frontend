import { Img } from "@chakra-ui/react"
import styled from "@emotion/styled"

export const TestersBox = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Img src="/images/testerslogo.svg"></Img>
        <ContentWrapper>
          <div> hi </div>
        </ContentWrapper>
      </LogoWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`
const ContentWrapper = styled.div``
