import { useAuth } from '@/Provider/Auth';
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
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useGetMailBusiness } from '@/api/hooks/Mail/useGetMailBusiness';
import { useGetMailUniv } from '@/api/hooks/Mail/useGetMailUniv';
import { useState } from 'react';

export const MyPage = () => {
  const { authInfo } = useAuth();

  const [isJob, setIsJob] = useState('univ');

  const [univPage, setUnivPage] = useState(0);
  const [businessPage, setBusinessPage] = useState(0);

  const { univData, univLoading, univError } = useGetMailUniv(univPage, 5);
  const { businessData, businessLoading, businessError } = useGetMailBusiness(businessPage, 5);
  const handlePrev = () => {
    if (isJob === 'univ') {
      setUnivPage((prev) => Math.max(prev - 1, 0));
    } else {
      setBusinessPage((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleNext = () => {
    if (isJob === 'univ') {
      setUnivPage((prev) => (univData && !univData.totalPages ? prev + 1 : prev));
    } else {
      setBusinessPage((prev) => (businessData && !businessData.totalPages ? prev + 1 : prev));
    }
  };

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
            <Button
              onClick={() => {
                setIsJob('univ');
                setUnivPage(0); // 페이지를 0으로 초기화
              }}
              disabled={isJob === 'univ'}
            >
              대학생
            </Button>
            <Button
              onClick={() => {
                setIsJob('business');
                setBusinessPage(0); // 페이지를 0으로 초기화
              }}
              disabled={isJob === 'business'}
            >
              직장인
            </Button>

            {isJob === 'univ' ? (
              univLoading ? (
                <Spinner />
              ) : univError ? (
                <Text color="red.500">오류가 발생했습니다.</Text>
              ) : (
                univData?.content.map((email, index) => (
                  <Box key={email.createDate} w="100%">
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="bold">{email.subjet}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {email.createDate}
                      </Text>
                    </HStack>
                    <Text noOfLines={2}>{email.body}</Text>
                    <Divider mt={2} />
                  </Box>
                ))
              )
            ) : businessLoading ? (
              <Spinner />
            ) : businessError ? (
              <Text color="red.500">오류가 발생했습니다.</Text>
            ) : (
              businessData?.content.map((email, index) => (
                <Box key={email.createDate} w="100%">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="bold">{email.subjet}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {email.createDate}
                    </Text>
                  </HStack>
                  <Text noOfLines={2}>{email.body}</Text>
                  <Divider mt={2} />
                </Box>
              ))
            )}

            <HStack mt={4} justify="space-between" w="100%">
              <Button
                onClick={handlePrev}
                disabled={isJob === 'univ' ? univPage === 0 : businessPage === 0}
              >
                이전
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  isJob === 'univ'
                    ? !univData || univData.totalPages <= univPage + 1
                    : !businessData || businessData.totalPages <= businessPage + 1
                }
              >
                다음
              </Button>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
