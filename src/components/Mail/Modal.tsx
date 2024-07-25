import styled from '@emotion/styled';

export const Modal = () => {
  return (
    <Wrapper>
      <div>메일 작성 목적을 선택해주세요 </div>
      <ModalInput></ModalInput>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1080px;
  height: 336px;
  border-radius: 20px;
  border: 3px solid #6ab9f2;
  background: #fff;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  align
`;

const ModalInput = styled.input`
  display: flex;
  width: 701px;
  height: 60px;
  padding: 28px 160px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #f2f2f7;
`;
