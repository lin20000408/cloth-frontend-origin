import React from 'react'
import Image from 'next/image'
import styles from '@/styles/product/Product.module.css'
import Link from 'next/link'
import FiveStars from '@/components/product-card/review/five-stars'
import { GoThumbsup } from 'react-icons/go'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
export default function ReviewClosed() {
  const [reviewSwiper, setreviewSwiper] = useState(null)
  return (
    <>
    <div>123</div>
    <div>123</div>
    <div>123</div>
      <div className="d-flex mt-1  flex-column ms-sm-0">
        {/* <!--TODO: ?上邊 --> */}
        <div className="d-flex ">
          {/* <!-- TODO:?details --> */}
          <div
            className={` me-sm-0 me-5 d-flex flex-column justify-content-evenly ${styles['review-details']} ${styles['review-font-size']} `}
          >
            <div className="d-flex">
              <div className="d-flex">
                a**123&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div className="d-flex">尺寸:S&nbsp;顏色:黑色</div>
            </div>
            <div className="d-flex me-5 pe-5 justify-content-between">
              <div className="d-flex">
                <FiveStars />
              </div>
              <div className="d-flex">2024/04/01</div>
            </div>
            <div className="d-flex ">
              <div
                className={` ${styles['xxs-none']}   ${styles['review-details']}`}
              >
                <GoThumbsup size={20} color="#000000" />{' '}
                探討包包評價時，如果發現非常複雜，
                那麼想必不簡單。回過神才發現， 思考包包評價的存在意義，
                已讓如果你憎恨性，你就是憎恨美。
              </div>
              <div className=" d-sm-none text-truncate">
                <GoThumbsup size={20} color="#000000" />{' '}
                探討包包評價時，如果發現非常複雜，
                那麼想必不簡單。回過神才發現， 思考包包評價的存在意義，
                已讓如果你憎恨性，你就是憎恨美。
              </div>
            </div>
          </div>
          {/* <!-- TODO:?照片欄 --> */}
          <div className="d-flex flex-column justify-content-evenly">
            <div
              style={{ width: '50px', height: '50px' }}
              className={` ps-2 d-flex align-items-center ${styles['review-photo']} `}
            >
              <Swiper
                style={{
                  '--swiper-navigation-color': '#0000',
                  '--swiper-pagination-color': '#0000',
                  width: '50px',
                  height: '50px',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                thumbs={{ swiper: reviewSwiper }}
              >
                <SwiperSlide>
                <Zoom>
                  <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </Zoom>
                </SwiperSlide>
                <SwiperSlide>
                <Zoom>
                  <img src="https://swiperjs.com/demos/images/nature-2.jpg" /></Zoom>
                </SwiperSlide>
                <SwiperSlide>
                <Zoom>
                  <img src="https://swiperjs.com/demos/images/nature-3.jpg" /></Zoom>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="d-flex flex-column ">
              <div className="d-flex justify-content-between  mt-sm-0 mt-2">
                <div
                  style={{
                    width: '60px',
                    height: '50px',
                    overflowX: 'auto',
                    display: 'flex',
                  }}
                  className={` ${styles['reviewScroll']} `}
                >
                  <div>
                    <Swiper
                      onSwiper={setreviewSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      style={{ width: '100px', height: '30px' }}
                    >
                      <SwiperSlide style={{ width: '50px', height: '30px' }}>
                        <img
                          className="w-100"
                          src="https://swiperjs.com/demos/images/nature-1.jpg"
                        />
                      </SwiperSlide>
                      <SwiperSlide style={{ width: '50px', height: '30px' }}>
                        <img
                          className="w-100"
                          src="https://swiperjs.com/demos/images/nature-2.jpg"
                        />
                      </SwiperSlide>
                      <SwiperSlide style={{ width: '50px', height: '30px' }}>
                        <img
                          className="w-100"
                          src="https://swiperjs.com/demos/images/nature-3.jpg"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* TODO:<!-- ?下邊 --> */}

        <div className={` mt-sm-3 mt-1 ${styles['border-weight']} `}></div>
      </div>
    </>
  )
}
