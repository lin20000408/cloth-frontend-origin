import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import RankCard from './rankCard'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import data from '@/data/indexImg'

import { EffectCoverflow, Pagination } from 'swiper/modules'

export default function Test() {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        // centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 5,
          stretch: -25,
          depth: 50,
          modifier: 1,
          slideShadows: false,
        }}
        loop={true}
        pagination={false}
        breakpoints={{
          1024: {
            // slidesPerView: 4,
            // spaceBetween: 0,
            // centeredSlides: false ,
          },
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        style={{ width: '100%' }}
      >
        {data.map((v, i) => {
          return (
            <SwiperSlide
              Key={i + 1}
              style={{ width: '300px', height: '300px' }}
            >
              <RankCard rank={i + 1} img={v.img}></RankCard>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
