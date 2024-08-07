import { breakpoints } from '@/styles/variants';
import styled from '@emotion/styled';

interface HeaderProps {
  isActive: string;
  onIsActive: (state: 'univ' | 'business') => void;
}

interface StudentProps {
  isActive: string;
}

interface BusinessProps {
  isActive: string;
}

export const Header = ({ isActive, onIsActive }: HeaderProps) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '100%',
          paddingTop: '33px',
        }}
      >
        <Student isActive={isActive} onClick={() => onIsActive('univ')}>
          대학생
        </Student>
        <Business isActive={isActive} onClick={() => onIsActive('business')}>
          직장인
        </Business>
      </div>
      <Bar></Bar>
    </>
  );
};

const Student = styled.div<StudentProps>`
  margin-left: 167px;
  cursor: pointer;
  box-shadow: ${(props) => (props.isActive === 'univ' ? '0 4px 0 0 #6AB9F2' : 'none')};
  position: relative;
  z-index: 2;
  bottom: -13px;

  @media (max-width: ${breakpoints.md}) {
    bottom: 11px;
    left: 120px;
    box-shadow: ${(props) => (props.isActive === 'univ' ? '4px #6AB9F2' : 'none')};
  }
`;

const Business = styled.div<BusinessProps>`
  margin-left: 44px;
  cursor: pointer;
  box-shadow: ${(props) => (props.isActive === 'business' ? '0 4px 0 0 #6AB9F2' : 'none')};
  position: relative;
  z-index: 2;
  bottom: -13px;

  @media (max-width: ${breakpoints.md}) {
    bottom: 11px;
    left: 120px;
    box-shadow: ${(props) => (props.isActive === 'business' ? '4px #6AB9F2' : 'none')};
  }
`;

const Bar = styled.div`
  background: white;
  width: 1200px;
  height: 3px;
  position: absolute;
  bottom: 8px;

  @media (max-width: ${breakpoints.md}) {
    visibility: hidden;
  }
`;
