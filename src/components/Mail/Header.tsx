import { breakpoints } from '@/styles/variants';
import styled from '@emotion/styled';

interface HeaderProps {
  isActive: string;
  onIsActive: (state: 'univ' | 'business') => void;
  onOpen: () => void;
  onClose: () => void;
}

interface ActiveProps {
  isActive: string;
}

export const Header = ({ isActive, onIsActive, onOpen, onClose }: HeaderProps) => {
  const handleUniv = () => {
    onIsActive('univ');
    onOpen();
  };

  const handleBusiness = () => {
    onIsActive('business');
    onOpen();
  };

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
        <Student isActive={isActive} onClick={handleUniv}>
          대학생
        </Student>
        <Office isActive={isActive} onClick={handleBusiness}>
          직장인
        </Office>
      </div>
      <Bar></Bar>
    </>
  );
};

const Student = styled.div<ActiveProps>`
  margin-left: 167px;
  cursor: pointer;
  box-shadow: ${(props) => (props.isActive === 'univ' ? '0 4px 0 0 #6AB9F2' : 'none')};
  position: relative;
  z-index: 2;
  bottom: -13px;
  @media (max-width: ${breakpoints.md}) {
    bottom: 11px;
    left: 120px;
  }
`;

const Office = styled.div<ActiveProps>`
  margin-left: 44px;
  cursor: pointer;
  box-shadow: ${(props) => (props.isActive === 'business' ? '0 4px 0 0 #6AB9F2' : 'none')};
  position: relative;
  z-index: 2;
  bottom: -13px;
  @media (max-width: ${breakpoints.md}) {
    bottom: 11px;
    left: 120px;
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
