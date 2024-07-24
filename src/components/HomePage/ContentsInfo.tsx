import { Grid, GridItem, Box, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const ContentsInfo = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Img src="/images/contentsInfoLogo.svg" alt="Logo" mb={-2} />
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {cardContents.map((content, index) => (
            <StyledGridItem key={index}>
              <StyledImg src={content.imageSrc} alt={`gif파일${index + 1}`} />
            </StyledGridItem>
          ))}
        </Grid>
      </LogoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: center;
`;

const StyledGridItem = styled(GridItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 350px;
  padding: 0;
`;

const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지가 컨테이너에 맞게 조정되도록 설정
`;

const cardContents = [
  {
    imageSrc: '/images/composition1.gif',
  },
  {
    imageSrc: '/images/composition1.gif',
  },
  {
    imageSrc: '/images/composition1.gif',
  },
];
