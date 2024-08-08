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
    <Wrapper>
      <LogoWrapper>
        <Grid h="100%" templateColumns="1fr 3fr" gap={20} bg="gray.50" borderRadius="lg" p={10}>
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
              <HStack w="100%" justify="center" borderBottom="1px solid #e2e8f0">
                <TabButton active={isJob === 'univ'} onClick={() => setIsJob('univ')}>
                  대학생
                </TabButton>
                <TabButton active={isJob === 'business'} onClick={() => setIsJob('business')}>
                  직장인
                </TabButton>
              </HStack>

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
  height: 100vh;
  max-width: 1200px;
  text-align: center;
`;

const TabButton = styled(Button)<{ active: boolean }>`
  background: none;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  border-bottom: 2px solid ${props => (props.active ? '#4299e1' : 'transparent')};
  cursor: pointer;
  &:hover {
    border-bottom: 2px solid #4299e1;
  }
`;
