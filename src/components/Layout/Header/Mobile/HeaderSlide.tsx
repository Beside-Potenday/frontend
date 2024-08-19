import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAuth } from '@/Provider/Auth';
import { Link } from 'react-router-dom';
import { RouterPath } from '@/routes/path';
import { OpenHamburgerContextType } from '@/types';

export const HeaderSlide = ({ isReady, handleIsReady }: OpenHamburgerContextType) => {
  const { authInfo } = useAuth();

  const toggleSide = () => {
    handleIsReady(false);
  };

  const outside = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlerOutside = (e: MouseEvent) => {
      if (outside.current && !outside.current.contains(e.target as Node)) {
        handleIsReady(false);
      }
    };

    document.addEventListener('mousedown', handlerOutside);
    return () => {
      document.removeEventListener('mousedown', handlerOutside);
    };
  }, [handleIsReady]);

  return (
    <Wrapper>
      <AnimatePresence>
        {isReady && (
          <SideBarWrap
            ref={outside}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <ImageWrapper
              src="/images/close.svg"
              alt="close"
              onClick={toggleSide}
              onKeyDown={(e) => {
                if (e.key === 'Enter') toggleSide();
              }}
              tabIndex={0}
            />
            <NavMenu>
              {authInfo ? (
                <Link to={RouterPath.mypage} onClick={toggleSide}>
                  <NavList>My Page</NavList>
                </Link>
              ) : (
                <Link to={RouterPath.login} onClick={toggleSide}>
                  <NavList>Login</NavList>
                </Link>
              )}
              <Link to={RouterPath.mail} onClick={() => handleIsReady(false)}>
                <NavList>AI 메일 생성하기</NavList>
              </Link>
            </NavMenu>
          </SideBarWrap>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideBarWrap = styled(motion.div)`
  z-index: 5;
  padding: 12px;
  border-radius: 15px 0 0 15px;
  background: var(--Grey200, #f2f2f7);
  height: 100%;
  width: 55%;
  top: 0;
  right: 0;
  position: fixed;
  overflow: hidden;
`;

const ImageWrapper = styled.img`
  margin-bottom: 50px;
  cursor: pointer;
`;

const NavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: inherit;
  width: 90%;
`;

const NavList = styled.li`
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 30px 0 30px 27px;
  border-bottom: 1px solid;
`;
