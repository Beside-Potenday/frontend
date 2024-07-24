import { Grid, GridItem } from '@chakra-ui/react';
import { ContentsInfo } from '@/components/HomePage/ContentsInfo';
import { TestersBox } from './TestersBox';

export const Contents = () => {
  return (
    <Grid
      h="2500px"
      w="100%"
      templateRows={{ base: '1fr 1fr 600px' }}
      templateColumns={{ base: 'repeat(1, 1fr)' }}
      gap={100}
    >
      <GridItem id="section1" rowSpan={1} backgroundColor={'transparent'}>
        new HomePage
      </GridItem>
      <GridItem id="section2" rowSpan={1} backgroundColor={'transparent'}>
        <TestersBox></TestersBox>
      </GridItem>
      <GridItem id="section3" rowSpan={1} backgroundColor={'transparent'}>
        <ContentsInfo />
      </GridItem>
    </Grid>
  );
};
