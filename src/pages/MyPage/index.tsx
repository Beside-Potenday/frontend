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
  Divider,
  Button,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useGetMail } from '@/api/hooks/Mail/useGetMail';
import { useEffect, useState } from 'react';

export const MyPage = () => {
  const { authInfo } = useAuth();
  const [isJob, setIsJob] = useState('univ');
  const [page, setPage] = useState(0);
  const [expandedMails, setExpandedMails] = useState<{ [key: string]: boolean }>({});

  const { mailData, mailLoading, mailError, refetch } = useGetMail(page, 5, isJob);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPage(0);
    refetch();
  }, [isJob, refetch]);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => (mailData && mailData.totalPages > prev + 1 ? prev + 1 : prev));
  };

  const handleJobChange = (newJob: string) => {
    setIsJob(newJob);
    setPage(0);
  };

  const toggleMailContent = (mailId: string) => {
    setExpandedMails((prev) => ({
      ...prev,
      [mailId]: !prev[mailId],
    }));
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Grid h="100%" templateColumns="1fr 3fr" gap={5}>
          <GridItem bg="white" padding="50px 20px" borderRadius="md" alignSelf="flex-start">
            <HStack spacing={4}>
              <Avatar size="md" name={authInfo?.name} src={authInfo?.picture} />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{authInfo?.name}</Text>
                <Text>{authInfo?.email}</Text>
              </VStack>
            </HStack>
          </GridItem>
          <GridItem bg="transparent" p={6}>
            <VStack align="start" spacing={6} w="100%">
              <HStack
                w="100%"
                justify="flex-start"
                borderBottom="3px solid #ffffff"
                paddingLeft="20px"
              >
                <TabButton active={isJob === 'univ'} onClick={() => handleJobChange('univ')}>
                  대학생
                </TabButton>
                <TabButton
                  active={isJob === 'business'}
                  onClick={() => handleJobChange('business')}
                >
                  직장인
                </TabButton>
              </HStack>

              {mailLoading ? (
                <Spinner />
              ) : mailError ? (
                <Text>메일을 불러오는 중 오류가 발생했습니다.</Text>
              ) : mailData && mailData.content && mailData.content.length > 0 ? (
                mailData.content.map((email, index) => {
                  const mailId = `${isJob}-${email.createDate}-${index}`;
                  const isExpanded = expandedMails[mailId];
                  return (
                    <Box key={mailId} w="100%">
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="bold">{email.subject}</Text>
                        <HStack>
                          <Text fontSize="sm" color="gray.500">
                            {email.createDate}
                          </Text>
                          <IconButton
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                            icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            size="sm"
                            onClick={() => toggleMailContent(mailId)}
                          />
                        </HStack>
                      </HStack>
                      <Text noOfLines={isExpanded ? undefined : 2}>{email.body}</Text>
                      <Divider mt={2} />
                    </Box>
                  );
                })
              ) : (
                <Text>메일이 없습니다!</Text>
              )}

              {mailData && mailData.content && mailData.content.length > 0 && (
                <HStack mt={4} justify="space-between" w="100%">
                  <Button onClick={handlePrev} isDisabled={page === 0}>
                    이전
                  </Button>
                  <Button
                    onClick={handleNext}
                    isDisabled={!mailData || mailData.totalPages <= page + 1}
                  >
                    다음
                  </Button>
                </HStack>
              )}
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
  background-color: #e5f3ff;
  padding: 80px 0;
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
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  border-bottom: 3px solid ${(props) => (props.active ? '#4299e1' : 'transparent')};
  cursor: pointer;
  &:hover {
    border-bottom: 3px solid #4299e1;
  }
`;
