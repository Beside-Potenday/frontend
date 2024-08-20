import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

export const MobileSwiper = () => {
  return (
    <>
      <SwiperWrapper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        navigation
      >
        <SwiperSlide>
          <SlideContent>
            <StyledImage src="/images/composition1.svg" alt="살펴보기 이미지 1" />
          </SlideContent>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent>
            <StyledImage src="/images/composition2.svg" alt="살펴보기 이미지 2" />
          </SlideContent>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent>
            <StyledImage src="/images/composition3.svg" alt="살펴보기 이미지 3" />
          </SlideContent>
        </SwiperSlide>
      </SwiperWrapper>
    </>
  );
};

const SwiperWrapper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const SlideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: auto;
  height: auto;
  max-width: 80%; /* 이미지의 최대 너비를 슬라이드 너비의 80%로 설정 */
  max-height: 80%; /* 이미지의 최대 높이를 슬라이드 높이의 80%로 설정 */
  object-fit: contain;
`;
