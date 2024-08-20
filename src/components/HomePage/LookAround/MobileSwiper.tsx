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
            <img src="/images/composition1.svg" alt="살펴보기 이미지 1" />
          </SlideContent>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent>
            <img src="/images/composition2.svg" alt="살펴보기 이미지 2" />
          </SlideContent>
        </SwiperSlide>
        <SwiperSlide>
          <SlideContent>
            <img src="/images/composition3.svg" alt="살펴보기 이미지 3" />
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
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
`;
