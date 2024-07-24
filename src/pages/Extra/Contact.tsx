import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Contact: React.FC = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        문의
      </Heading>
      <Text>문의 페이지 내용이 여기에 들어갑니다.</Text>
    </Box>
  );
};

export default Contact;
