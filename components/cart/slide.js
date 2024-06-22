import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image'
import {Scrollbar} from 'swiper/modules';
import 'swiper/css/scrollbar';

export default function Slide({slides}) {
    return (
      <Swiper
      style={{"--swiper-scrollbar-drag-bg-color":"#ABC8BC",
    paddig:"50px"}}
      modules={[Scrollbar]}
      scrollbar={{ draggable: true }}
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {/* {slides.map((slide)=>(
           <SwiperSlide key={slide.image}>
            <img src="/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg" alt={slide.title}/>
           </SwiperSlide> 
        ))} */}
         <SwiperSlide>
         <a href="/your-link">
        <Image src="/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg"
        alt="商品圖"
        width={200}
        height={200}
       />
       </a>
        </SwiperSlide>
        <SwiperSlide>
         <a href="/your-link">
        <Image src="/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg"
        alt="商品圖"
        width={200}
        height={200}
       />
       </a>
        </SwiperSlide>
        <SwiperSlide>
         <a href="/your-link">
        <Image src="/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg"
        alt="商品圖"
        width={200}
        height={200}
       />
       </a>
        </SwiperSlide>
        <SwiperSlide>
         <a href="/your-link">
        <Image src="/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg"
        alt="商品圖"
        width={200}
        height={200}
       />
       </a>
        </SwiperSlide>
        <SwiperSlide>
         <a href="/your-link">
        <Image src="/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg"
        alt="商品圖"
        width={200}
        height={200}
       />
       </a>
        </SwiperSlide>
      </Swiper>
  

    );    
  };

