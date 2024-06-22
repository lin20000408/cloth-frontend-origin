import { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Image } from 'antd'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import styles from '@/components/productList/prDetailCarousel.module.css' //商品詳情css
// 範例出處
// https://swiperjs.com/demos#thumbs-gallery
// https://codesandbox.io/s/k3cyyc
export default function PrDetailCarousel({ phGroup = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className={`mySwiper2 ${styles['top']}`}
      >
        {phGroup.map((v, i) => {
          return (
            <SwiperSlide key={`phGroupBig${i}`}>
              <Image
                src={v}
                className={'img-fluid'}
                style={{ borderRadius: '2%' }}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`mySwiper ${styles['bottom']}`}
      >
        {phGroup.map((v, i) => {
          return (
            <SwiperSlide key={`phGroupMin${i}`}>
              <img src={v} className="img-thumbnail" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
