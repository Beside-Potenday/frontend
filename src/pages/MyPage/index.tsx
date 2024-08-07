import { Grid, GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const MyPage = () => {
  return (
    <Wrapper>
      <Grid
        h="100%"
        w="100%"
        templateColumns="repeat(2, 1fr)"
        gap={20}
        p={10}
        background="gray.50"
        borderRadius="lg"
      >
        <GridItem backgroundColor={'yellow'}>
          <h2>User Information</h2>
          {/* user information */}
        </GridItem>
        <GridItem backgroundColor={'blue'}>
          <h2>User History</h2>
          {/* user history */}
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  height: 1000px;
`;
