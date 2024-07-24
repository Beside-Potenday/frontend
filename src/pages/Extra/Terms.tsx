import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Terms: React.FC = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>이용약관</Heading>
      <Text>이용약관 내용이 여기에 들어갑니다.</Text>
    </Box>
  );
};

export default Terms;