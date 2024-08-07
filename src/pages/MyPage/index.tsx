import { useAuth } from '@/Provider/Auth';
import { useMail } from '@/Provider/MailContext';
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Avatar,
  Heading,
  Divider,
} from '@chakra-ui/react';

export const MyPage = () => {
  const { authInfo } = useAuth();

  const { isActive } = useMail();

  return (
    <Box w="100%" h="1000px" p={10}>
      <Grid h="100%" templateColumns="0.5fr 1fr" gap={20} bg="gray.50" borderRadius="lg" p={10}>
        <GridItem bg="white" p={6} borderRadius="md" boxShadow="md">
          <VStack align="start" spacing={4}>
            <Heading size="md">사용자 정보</Heading>
            <Avatar size="2xl" name={authInfo?.name} src={authInfo?.picture} />
            <Text fontWeight="bold">{authInfo?.name}</Text>
            <Text>{authInfo?.email}</Text>
          </VStack>
        </GridItem>
        <GridItem bg="white" p={6} borderRadius="md" boxShadow="md">
          <VStack align="start" spacing={6} w="100%">
            <Heading size="md">메일 내역</Heading>
            {[1, 2, 3].map((_, index) => (
              <Box key={index} w="100%">
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold">메일 제목 {index + 1}</Text>
                  <Text fontSize="sm" color="gray.500">
                    2024년 08월 {25 - index}일
                  </Text>
                </HStack>
                <Text noOfLines={2}>
                  안녕하세요. 어떠고입니다. 더욱이 아니라, 외려를 써버 드러고자 애썼 드라며
                  되었습니다. 저희 7시에서 5\u0013으로 되었을 채워오셔도 J배열 보펠브져덮이여 상환
                  서업의 떼로작는 거커...
                </Text>
                <Divider mt={2} />
              </Box>
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
