import styled from '@emotion/styled';
import { breakpoints } from '@/styles/variants'; // breakpoints를 가져옵니다.

interface HeaderProps {
  isActive: string;
  onIsActive: (isActive: string) => void;
}

interface StudentProps {
  isActive: string;
}

export const Header = ({ isActive, onIsActive }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <Student isActive={isActive} onClick={() => onIsActive('univ')}>
        대학생
      </Student>
      <Office>
        직장인
        <HoverImage src="/images/hoveroffice.svg" alt="Hover Image" />
      </Office>
      <Bar></Bar>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding-top: 33px;
  position: relative;
`;

const Student = styled.div<StudentProps>`
  margin-left: 167px;
  cursor: pointer;
  box-shadow: ${(props) => (props.isActive ? '0 4px 0 0 #6AB9F2' : 'none')};
  position: relative;
  z-index: 2;
  bottom: -1px;

  @media (${breakpoints.md}) {
    margin-left: 20px;
  }
`;

const Office = styled.div`
  margin-left: 44px;
  position: relative;
  z-index: 2;
  bottom: -1px;

  &:hover > img {
    visibility: visible;
  }

  @media (${breakpoints.md}) {
    margin-left: 20px;
  }
`;

const HoverImage = styled.img`
  visibility: hidden;
  position: relative;
  top: -70px;
  left: 50%;
  transform: translateX(-50%);
  width: 174px;
  height: 34px;
  flex-shrink: 0;
  z-index: 3;
`;

const Bar = styled.div`
  background: white;
  width: 1300px;
  height: 3px;
  position: absolute;
  bottom: 45px;
  z-index: 1; /* Ensure it is below Student and Office */

  @media (${breakpoints.md}) {
    position: relative;
    bottom: -20px;
    margin-top: 10px;
  }
`;
