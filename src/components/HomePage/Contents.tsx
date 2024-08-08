import { Grid, GridItem } from '@chakra-ui/react';
import { ContentsInfo } from '@/components/HomePage/ContentsInfo';
import { TestersBox } from './TestersBox';

export const Contents = () => {
  return (
    <Grid
      h="100%"
      w="100%"
      templateRows={{ base: 'auto auto', md: ' 1fr 600px' }} // 'md' 이상일 때 '1fr 1fr 600px', 작을 때 'repeat(3, 1fr)'
      templateColumns={{ base: 'auto', md: 'repeat(1, 1fr)' }} // 'md' 이상일 때 'repeat(1, 1fr)', 작을 때 '1fr'
      gap={{ base: 50, md: 0 }} // 'md' 이상일 때 100, 작을 때 50
    >
      <GridItem
        id="section2"
        rowSpan={1}
        backgroundColor={'transparent'}
        display="flex"
        justifyContent={'center'}
        gap={10}
        marginTop={20}
      >
        <TestersBox />
      </GridItem>
      <GridItem id="section3" rowSpan={1} backgroundColor={'transparent'}>
        <ContentsInfo />
      </GridItem>
    </Grid>
  );
};
