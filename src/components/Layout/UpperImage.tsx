import { Box, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const UpperImage = () => {
  return (
    <StyledWrapper>
      <VStack spacing={4} align="flex-start">
        <LeftBubble>
          <Text fontSize="lg" fontWeight="bold">
            메일 작성 한번 할 때마다 어떻게 써야할지 나만 막막해?
          </Text>
        </LeftBubble>
        <LeftBubble>
          <Text fontSize="lg">별거 아닌 것 같은데 막상 쓰려니 왜 이렇게 까다로운지...😢</Text>
        </LeftBubble>
        <RightBubble>
          <Text fontSize="lg">알파메일로 메일 작성하면 1분도 안걸린다고?</Text>
        </RightBubble>
        <RightBubble>
          <Text fontSize="lg">교수님께 보내는 메일..이제 수백번 안고쳐도 된다고!</Text>
        </RightBubble>
        <RightBubble>
          <Text fontSize="lg">
            누구나 일잘러가 될 수 있는 업무툴, 알파메일이 있으면 칼퇴도 문제없다
          </Text>
        </RightBubble>
      </VStack>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)`
  width: 100%;
  height: 400px;
  background-image: url('/images/upper_image.jpg');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Bubble = styled(Box)`
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
`;

const LeftBubble = styled(Bubble)`
  background: rgba(255, 255, 255, 0.8);
  align-self: flex-start;
`;

const RightBubble = styled(Bubble)`
  background: rgba(0, 123, 255, 0.8);
  color: white;
  align-self: flex-end;
`;
