import { Img, Grid, GridItem, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const ContentsInfo = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Img src="/images/contentsInfoLogo.svg" alt="Logo" mb={6} />
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {cardContents.map((content, index) => (
            <GridItem key={index}>
              <ImageBox>
                <Img src={content.imageSrc} alt={`gif파일${index + 1}`} />
              </ImageBox>
            </GridItem>
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

const ImageBox = styled(Box)`
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
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
