import { Img, Grid, GridItem, Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const ContentsInfo = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Img src="/images/contentsInfoLogo.svg" alt="Logo" />
        <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(3, 1fr)" gap={6}>
          {cardContents.map((content, index) => (
            <GridItem key={index} as={Card}>
              <TextWrapper>
                <TitleText fontSize="lg" fontWeight="bold">
                  {content.title}
                </TitleText>
                <DescriptionText>{content.description1}</DescriptionText>
                <DescriptionText>{content.description2}</DescriptionText>
              </TextWrapper>
              <Box>{content.image}</Box>
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
`;

const Card = styled.div`
  padding: 36px, 28px, 36px, 28px;
  margin-top: 30px;
  height: 320px;
  weight: 380px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(106, 185, 242, 0.3);
  padding: 20px;
  text-align: left;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const TitleText = styled(Text)`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 29.61px;
  line-height: 41.46px;
  color: #3c3c3f;
  letter-spacing: -0.02em;
  margin-bottom: 15px;
`;

const DescriptionText = styled(Text)`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 11.84px;
  line-height: 16.58px;
  color: #8e8e93;
  letter-spacing: -0.025em;
`;

const cardContents = [
  {
    title: '메일 생성 준비 단 30초!',
    image: <img src="/path/to/image1.png" alt="gif파일1" />,
    description1: '간단한 필수 정보만 입력하면 준비 완료!',
    description2: '사용자 유형에 따라 다른 양식을 제공해요',
  },
  {
    title: 'AI 메일 생성',
    image: <img src="/path/to/image2.png" alt="gif파일2" />,
    description1: '나에게 딱 필요한 메일을 빠르고 정확하게!',
    description2: '입력한 정보를 기반으로 맞춤형 메일을 생성해요.',
  },
  {
    title: '생성한 메일 전송',
    image: <img src="/path/to/image3.png" alt="gif파일3" />,
    description1: '생성된 메일은 간편하게 복붙하거나',
    description2: '바로 전송하며 신속하게 해결해요!',
  },
];
