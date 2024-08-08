import { useAuth } from '@/Provider/Auth';
import styled from '@emotion/styled';

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
import { useGetMail } from '@/api/hooks/Mail/useGetMail';
import { useEffect, useState } from 'react';

export const MyPage = () => {
  const { authInfo } = useAuth();

  const [isJob, setIsJob] = useState('univ');
  const [page, setPage] = useState(0);

  const { mailData, mailLoading, mailError } = useGetMail(page, 5, isJob);

  useEffect(() => {
    setPage(0);
  }, [isJob]);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => (mailData && mailData.totalPages > prev + 1 ? prev + 1 : prev));
  };

  return (
    <StyledWrapper>
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
              <Button onClick={() => setIsJob('univ')} disabled={isJob === 'univ'}>
                대학생
              </Button>
              <Button onClick={() => setIsJob('business')} disabled={isJob === 'business'}>
                직장인
              </Button>

              {mailLoading ? (
                <Spinner />
              ) : mailError ? (
                <Text color="red.500">오류가 발생했습니다.</Text>
              ) : (
                mailData?.content.map((email, index) => (
                  <Box key={email.createDate} w="100%">
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="bold">{email.subject}</Text>
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
                <Button onClick={handlePrev} disabled={page === 0}>
                  이전
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!mailData || mailData.totalPages <= page + 1}
                >
                  다음
                </Button>
              </HStack>
            </VStack>
          </GridItem>
        </Grid>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)`
  width: 100%;
  background: #e5f3ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
