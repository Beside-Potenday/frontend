import styled from '@emotion/styled';

interface HeaderProps {
  isActive: string;
  onIsActive: (isActive: string) => void;
}

interface StudentProps {
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
        <Office>
          직장인
          <HoverImage src="/images/hoveroffice.svg" alt="Hover Image" />
        </Office>
      </div>
      <Bar></Bar>
    </>
  );
};

const Student = styled.div<StudentProps>`
  margin-left: 167px;
  cursor: pointer;
  box-shadow: ${(props) => (props.isActive ? '0 4px 0 0 #6AB9F2' : 'none')};
  position: relative;
  z-index: 2;
  bottom: -13px;
`;

const Office = styled.div`
  margin-left: 44px;
  position: relative;
  z-index: 2;
  bottom: -13px;
  &:hover > img {
    visibility: visible;
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
  width: 1200px;
  height: 3px;
  position: absolute;
  bottom: 24px;
`;
