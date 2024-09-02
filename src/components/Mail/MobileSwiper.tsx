import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@/styles/variants';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

export const MobileSwiper = () => {
  const isXs = useMediaQuery({ query: `(max-width : ${breakpoints.xs})` });

  return (
    <div>
      <SwiperWrapper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        navigation={!isXs}
      >
        <SwiperSlide>
          <SlideContent>
            <StyledImage src="/images/LeftImage.svg" alt="왼쪽 이미지" />
          </SlideContent>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent>
            <StyledImage src="/images/RightImage.svg" alt="오른쪽 이미지" />
          </SlideContent>
        </SwiperSlide>
      </SwiperWrapper>
    </div>
  );
};

const SwiperWrapper = styled(Swiper)`
  max-width: 90vw;
  max-height: 100vw;
  margin: 20px;
`;

const SlideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  max-width: 100vw;
  max-height: 100vw;
`;

const StyledImage = styled.img`
  width: auto;
  height: auto;
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
`;
