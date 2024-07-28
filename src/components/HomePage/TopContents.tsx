import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';

export const TopContents = () => {
  return (
    <Wrapper>
      <Image src="/images/topImage.svg"></Image>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
