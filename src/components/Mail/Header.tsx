import styled from '@emotion/styled';

interface HeaderProps {
  isActive: boolean;
  onIsActive: (isActive: boolean) => void;
}

interface StudentProps {
  isActive: boolean;
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
        <Student isActive={isActive} onClick={() => onIsActive(!isActive)}>
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
  box-shadow: ${(props) => (props.isActive ? '0 3px 0 0 #6AB9F2' : 'none')};
  position: relative;
  z-index: 2;
  bottom: -1px;
`;

const Office = styled.div`
  margin-left: 44px;
  position: relative;
  z-index: 2;
  bottom: -1px;
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
  background: var(--Grey300, #e5e5ea);
  width: 1080px;
  height: 3px;
  position: absolute;
  bottom: 24px;
`;
