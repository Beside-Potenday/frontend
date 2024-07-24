import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Privacy: React.FC = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>개인정보처리방침</Heading>
      <Text>개인정보처리방침 내용이 여기에 들어갑니다.</Text>
    </Box>
  );
};

export default Privacy;
