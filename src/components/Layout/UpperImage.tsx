import { Image, Box, Text, VStack, keyframes, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const UpperImage = () => {
  const scrollDown = () => {
    const scrollAmount = window.innerHeight - window.scrollY;
    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <StyledWrapper>
      <TransparentOverlay />
      <ImageContainer>
        <VStack spacing={4} align="stretch">
          <LeftBubble>
            <BubbleText>메일 작성 한번 할 때마다 어떻게 써야할지 나만 막막해?</BubbleText>
          </LeftBubble>
          <LeftBubble>
            <BubbleText>별거 아닌 것 같은데 막상 쓰려니 왜 이렇게 까다로운지...😢</BubbleText>
          </LeftBubble>
          <CenterTextFirst>메일 작성에 대한 고민은 덜고</CenterTextFirst>
          <CenterTextSecond>더 중요한 일에 집중하세요!</CenterTextSecond>
          <RightBubble>
            <BubbleText>알파메일로 메일 작성하면 1분도 안걸린다고?</BubbleText>
          </RightBubble>
          <RightBubble>
            <BubbleText>교수님께 보내는 메일..이제 수백번 안고쳐도 된다고!</BubbleText>
          </RightBubble>
          <RightBubble>
            <BubbleText>
              누구나 일잘러가 될 수 있는 업무툴, 알파메일이 있으면 칼퇴도 문제없다😆
            </BubbleText>
          </RightBubble>
        </VStack>
      </ImageContainer>
      <ArrowContainer onClick={scrollDown}>
        <ArrowIcon src="/images/downArrow.svg" alt="아래로 이동" />
      </ArrowContainer>
    </StyledWrapper>
  );
};

// 스타일 정의 부분
const StyledWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  background: #e5efff;
  background-image: url('/images/upper_image.svg');
  background-size: 90% auto;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TransparentOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
  z-index: 1;
`;

const ImageContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-80px);
  z-index: 2;
`;

const ArrowContainer = styled(Box)`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: -120px; /* 화살표의 상단 마진 */
  z-index: 2;
`;

const ArrowIcon = styled(Image)`
  width: 100%;
  height: auto;
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Bubble = chakra(Box, {
  baseStyle: {
    width: 'auto',
    padding: '14px',
    borderRadius: '39px',
    backgroundColor: '#ffffffb3', // 70% 불투명한 흰색
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    animation: `${float} 3s ease-in-out infinite`, // 애니메이션 적용
  },
});

const LeftBubble = styled(Bubble)`
  align-self: flex-start;
  margin-left: -450px;
`;

const RightBubble = styled(Bubble)`
  align-self: flex-end;
  margin-right: -450px;
`;

const CenterTextFirst = styled(Text)`
  width: 100%;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 800; /* ExtraBold */
  font-size: 40px;
  line-height: 1.6;
  letter-spacing: -2.5%;
  color: #3c3c3f;
  margin-top: 20px;
  margin-bottom: -15px; /* 간격 조정 */
`;

const CenterTextSecond = styled(Text)`
  width: 100%;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 800; /* ExtraBold */
  font-size: 40px;
  line-height: 1.6;
  letter-spacing: -2.5%;
  color: #3c3c3f;
  margin-top: -10px; /* 간격 조정 */
  margin-bottom: -35px;
`;

const BubbleText = styled(Text)`
  font-family: Inter, sans-serif;
  font-weight: 600; /* Semi Bold */
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: -2.5%;
  color: #8e8e93;
`;
