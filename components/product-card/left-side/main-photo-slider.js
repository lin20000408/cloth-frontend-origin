import { useRef, useState } from 'react'



//no
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import styles from '@/styles/product/Product.module.css'
export default function MainPhotoSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  return (
    <>
    

      <div className="d-flex mt-3 mt-sm-0  flex-column-reverse flex-sm-row ms-5 ps-5">
        <div style={{ width: '100px' }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            direction="vertical" // 設置方向為垂直
            style={{ height: '200px' }} // 設置高度
            // className={`d-flex flex-sm-column flex-row justify-content-evenly   `}
          >
            <SwiperSlide style={{ width: '48px', height: '48px' }}>
              <img
                className="w-100 d-flex"
                src="https://swiperjs.com/demos/images/nature-1.jpg"
              />
            </SwiperSlide>
            <SwiperSlide style={{ width: '48px', height: '48px' }}>
              <img
                className="w-100 d-flex"
                src="https://swiperjs.com/demos/images/nature-2.jpg"
              />
            </SwiperSlide>
            <SwiperSlide style={{ width: '48px', height: '48px' }}>
              <img
                className="w-100 d-flex"
                src="https://swiperjs.com/demos/images/nature-3.jpg"
              />
            </SwiperSlide>
            <SwiperSlide style={{ width: '48px', height: '48px' }}>
              <img
                className="w-100 d-flex"
                src="https://swiperjs.com/demos/images/nature-4.jpg"
              />
            </SwiperSlide>
            <SwiperSlide style={{ width: '48px', height: '48px' }}>
              <img
                className="w-100"
                src="https://swiperjs.com/demos/images/nature-5.jpg"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div
          className={`d-flex ${styles['side-photo-space']} mt-3 mt-sm-0 `}
        ></div>
        <div style={{ width: '370px', height: '407px' }}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            //   className={``}
            style={{
              '--swiper-navigation-color': ' #ca7f7f00',
              '--swiper-pagination-color': ' #ca7f7f00',
              width: '370px',
              height: '407px',
            }}
          
          >
            <SwiperSlide>
              <img
                className="w-100"
                src="https://swiperjs.com/demos/images/nature-1.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-100"
                src="https://swiperjs.com/demos/images/nature-2.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-100"
                src="https://swiperjs.com/demos/images/nature-3.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-100"
                src="https://swiperjs.com/demos/images/nature-4.jpg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-100"
                src="https://swiperjs.com/demos/images/nature-5.jpg"
              />
            </SwiperSlide>
          </Swiper>
          <div className={`d-flex ${styles['scroll-container']} `}>
            <div className={`bg-ddprimary-light ${styles['scroll']} `}></div>
          </div>  
        </div>

        <div
          className={`d-flex ${styles['side-photo-space']} mt-3 mt-sm-0 `}
        ></div>
        <div className={`d-flex flex-column  `}>
          <div>
            <Swiper
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img
                  className="w-100"
                  src="https://swiperjs.com/demos/images/nature-1.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-100"
                  src="https://swiperjs.com/demos/images/nature-2.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-100"
                  src="https://swiperjs.com/demos/images/nature-3.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-100"
                  src="https://swiperjs.com/demos/images/nature-4.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-100"
                  src="https://swiperjs.com/demos/images/nature-5.jpg"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}
