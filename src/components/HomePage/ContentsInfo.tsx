import { Grid, GridItem, Img } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@/styles/variants';

export const ContentsInfo = () => {
  const isMobile = useMediaQuery({ query: `(max-width : ${breakpoints.md})` });

  return (
    <Wrapper>
      <LogoWrapper>
        {isMobile ? (
          <Img src="/images/mobileLookLogo.svg" alt="Logo" mb={5} />
        ) : (
          <Img src="/images/contentsInfoLogo.svg" alt="Logo" mb={5} />
        )}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
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
  @media (max-width: ${breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    margin: 0px;
    padding: 0px;
  }
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
  width: 380px;
  height: 320px;
  padding: 0;
`;

const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지가 컨테이너에 맞게 조정되도록 설정
`;

const cardContents = [
  {
    imageSrc: '/images/composition1.svg',
  },
  {
    imageSrc: '/images/composition2.svg',
  },
  {
    imageSrc: '/images/composition3.svg',
  },
];
