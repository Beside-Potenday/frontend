import { mailSendUniv, mailSendBusiness } from '@/types';

export const mailLetterInitialStateBusiness: mailSendBusiness = {
  content: '',
  sender: '',
  company: '',
  department: '',
  additional: '',
  receiver: '',
};

export const currentInputNamesBusiness: (keyof mailSendBusiness)[] = [
  'content',
  'sender',
  'company',
  'department',
  'additional',
  'receiver',
];

export const placeholderTextsBusiness = [
  '글자 수 제한: 5자 이상~300자 이하',
  '홍길동',
  '알파코',
  '인사팀',
  '추가 기재사항',
  '김알파',
];

export const modalHeaderContentBusiness = [
  '메일 작성 목적을 입력해 주세요',
  '보내는 사람의 이름을 입력해 주세요',
  '소속 회사명을 입력해 주세요',
  '소속 부서를 입력해 주세요',
  '추가 기재사항을 입력해 주세요',
  '받는 사람의 이름을 입력해 주세요',
  '메일을 생성 중 입니다',
];

export const mailLetterInitialState: mailSendUniv = {
  content: '',
  sender: '',
  department: '',
  studentId: '',
  subject: '',
  receiver: '',
};

export const modalHeaderContent = [
  '메일 작성 목적을 선택해 주세요',
  '보내는 사람의 이름을 입력해 주세요',
  '보내는 사람의 학과를 입력해 주세요',
  '보내는 사람의 학번을 입력해 주세요',
  '강의명을 입력해 주세요',
  '받는 사람의 이름을 입력해 주세요',
  '메일을 생성 중 입니다',
];

export const currentInputNames: (keyof mailSendUniv)[] = [
  'content',
  'sender',
  'department',
  'studentId',
  'subject',
  'receiver',
];

export const placeholderTexts = [
  '글자 수 제한: 5자 이상~300자 이하',
  '홍길동',
  '컴퓨터공학과',
  '',
  '컴퓨터프로그래밍',
  '김알파',
];

export const options = [
  { label: '🙋🏻‍♂️ 질문', value: '질문' },
  { label: '📚 과제 제출', value: '과제 제출' },
  { label: '💯 성적 정정', value: '성적 정정' },
  { label: '💧 병결 요청', value: '병결 요청' },
  { label: '📝 상담 요청', value: '상담 요청' },
];

export const warningTextsUniv = {
  content: ['메일 작성 목적을 선택하거나 입력해주세요', '5자 이상~300자 이하로 입력해주세요'],
  studentId: '숫자만 입력 가능해요',
};

export const warningTextsBusiness = {
  content: ['메일 작성 목적을 입력해주세요', '5자 이상~300자 이하로 입력해주세요'],
};
