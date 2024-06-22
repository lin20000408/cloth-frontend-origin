import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../product-card/ProductCard'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'

export default function Recommend({ recommend = [], colorArr = [] }) {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="mySwiper w-100 "
        // style={{ height: '600px' }}
      >
        {Array.isArray(recommend)
          ? recommend.map((v) => {
              return (
                <SwiperSlide key={`rcard${v.product_color_id}`}>
                  <ProductCard
                    pc_id={v.product_color_id}
                    product_id={v.product_id}
                    ProductsName={v.product_name}
                    ProductsPrice={v.price}
                    st_name={v.st_name}
                    phGroup={[v.ph1, v.ph2]}
                    colorName={v.color_name}
                    color={v.color}
                    colorArr={colorArr[v.product_id]}
                  />
                </SwiperSlide>
              )
            })
          : ''}
      </Swiper>
    </>
  )
}
