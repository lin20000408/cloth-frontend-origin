import React, { useRef, useState } from 'react'
import { EffectFade } from 'swiper/modules'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import styles from '@/styles/logotest.module.css'

// import '@/styles/aa.css'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default function IndexCarousel() {
  const progressCircle = useRef(null)
  const progressContent = useRef(null)
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }
  return (
    <>
      <section>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          direction={'vertical'}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          // onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper swiper"
          style={{
            height: '100vh',
            width: 'auto',
            '--swiper-navigation-color': '#fff0',
            '--swiper-pagination-color': '#fff',
          }}
        >
          <SwiperSlide>
            <Image
              src="/images/cover/meierq.1.webp"
              alt="..."
              layout="fill"
              objectFit="cover"
              className="img-thumbnail"
            />
            {/* <img src="/indexImgs/mv_slide06.jpg" /> */}
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/cover/meierq.4.webp"
              alt="..."
              layout="fill"
              objectFit="cover"
              className="img-thumbnail"
            />
            {/* <img src="/indexImgs/mv_slide06.jpg" /> */}
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/cover/meierq.2.webp"
              alt="..."
              layout="fill"
              objectFit="cover"
              className="img-thumbnail"
            />
            {/* <img src="/indexImgs/mv_slide06.jpg" /> */}
          </SwiperSlide>
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
        <div className="logo-container">
          <svg
            className={styles['logo']}
            width="869"
            height="147"
            viewBox="0 0 869 147"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M862.619 71.444L862.622 71.4403C866.397 64.5629 868.283 57.0129 868.283 48.7996C868.283 39.924 866.332 32.0368 862.418 25.1524C858.497 18.2573 852.619 12.8585 844.807 8.95238C836.987 5.0423 827.439 3.09961 816.183 3.09961H760.783H760.283V3.59961V144V144.5H760.783H794.983H795.483V144V94.0996H816.183C827.708 94.0996 837.394 92.0228 845.219 87.8406C853.024 83.6691 858.833 78.2058 862.619 71.444ZM827.837 61.4386C824.766 64.3816 820.048 65.8997 813.583 65.8997H795.483V31.6996H813.583C820.048 31.6996 824.766 33.2177 827.837 36.1606C830.914 39.1095 832.483 43.2979 832.483 48.7996C832.483 54.3014 830.914 58.4897 827.837 61.4386Z"
              stroke="white"
              strokeWidth="0.9"
            />
            <path
              d="M633.312 136.636L633.315 136.637C644.459 142.813 656.676 145.9 669.957 145.9C683.238 145.9 695.389 142.813 706.401 136.636C717.413 130.458 726.144 121.861 732.588 110.852L732.59 110.85C739.037 99.7015 742.257 87.2141 742.257 73.3997C742.257 59.586 739.037 47.1648 732.59 36.149C726.278 25.1376 717.546 16.5401 706.401 10.3632C695.389 4.18594 683.238 1.09961 669.957 1.09961C656.676 1.09961 644.459 4.18605 633.315 10.3623L633.312 10.3636C622.302 16.5403 613.505 25.1361 606.928 36.1431L606.925 36.147C600.477 47.1634 597.257 59.5852 597.257 73.3997C597.257 87.2141 600.477 99.7015 606.924 110.85L606.928 110.856C613.505 121.863 622.302 130.459 633.312 136.636ZM696.387 102.663L696.384 102.667C689.824 110.014 681.033 113.7 669.957 113.7C658.744 113.7 649.819 110.078 643.127 102.863C636.562 95.5089 633.257 85.7054 633.257 73.3997C633.257 60.9576 636.564 51.1564 643.125 43.9378C649.817 36.7218 658.743 33.0996 669.957 33.0996C681.033 33.0996 689.824 36.7855 696.384 44.1326L696.384 44.1327L696.39 44.1396C703.085 51.3596 706.457 61.0941 706.457 73.3997C706.457 85.5699 703.086 95.3072 696.387 102.663Z"
              stroke="white"
              strokeWidth="0.9"
            />
            <path
              d="M579.368 3.59961V3.09961H578.868H544.668H544.168V3.59961V58.0996H491.968V3.59961V3.09961H491.468H457.268H456.768V3.59961V144V144.5H457.268H491.468H491.968V144V86.6996H544.168V144V144.5H544.668H578.868H579.368V144V3.59961Z"
              stroke="white"
              strokeWidth="0.9"
            />
            <path
              d="M337.418 125.896L337.422 125.901C342.413 132.511 349.021 137.498 357.231 140.862C365.434 144.224 374.7 145.9 385.021 145.9C395.615 145.9 404.828 143.955 412.644 140.047C420.449 136.144 426.39 130.885 430.445 124.264C434.63 117.648 436.721 110.29 436.721 102.2C436.721 93.7165 434.632 86.7339 430.416 81.2933C426.239 75.9037 421.247 71.7868 415.442 68.9513C409.814 66.1376 402.458 63.1962 393.381 60.126L393.381 60.1259L393.375 60.1239C384.317 57.1936 377.694 54.4738 373.476 51.9697C369.344 49.5161 367.321 46.1372 367.321 41.7996C367.321 37.774 368.549 34.7975 370.943 32.7821L370.948 32.7773L370.954 32.7723C373.377 30.6045 376.583 29.4996 380.621 29.4996C385.323 29.4996 389.133 30.8033 392.093 33.3769L392.092 33.3771L392.102 33.3851C395.046 35.8171 396.662 39.2127 396.922 43.629L396.949 44.0996H397.421H434.421H434.947L434.92 43.5744C434.247 30.2465 429.122 19.838 419.528 12.4055C409.951 4.8527 397.366 1.09961 381.821 1.09961C366.539 1.09961 354.088 4.85388 344.513 12.4057C334.913 19.8431 330.121 30.1954 330.121 43.3997C330.121 52.2774 332.206 59.5258 336.422 65.1012C340.599 70.6257 345.592 74.8119 351.401 77.6489C357.166 80.4643 364.592 83.273 373.673 86.0774L373.678 86.0788C379.938 87.9434 384.714 89.6031 388.019 91.0573L388.026 91.0601C391.443 92.506 394.253 94.3393 396.467 96.5532L396.472 96.5583L396.477 96.5632C398.772 98.7302 399.921 101.463 399.921 104.8C399.921 108.796 398.512 111.913 395.71 114.208C392.891 116.383 389.014 117.5 384.021 117.5C379.183 117.5 375.31 116.195 372.353 113.626C369.402 110.929 367.642 107.057 367.118 101.949L367.072 101.5H366.621H330.221H329.706L329.721 102.014C329.99 111.301 332.55 119.27 337.418 125.896Z"
              stroke="white"
              strokeWidth="0.9"
            />
            <path
              d="M146.025 144V144.5H146.525H199.125C213.859 144.5 226.808 141.553 237.957 135.643C249.239 129.733 257.911 121.4 263.96 110.647C270.141 99.8963 273.225 87.6091 273.225 73.7996C273.225 59.8583 270.142 47.5703 263.959 36.9513C257.911 26.2006 249.308 17.8677 238.16 11.9578C227.009 6.04655 213.992 3.09961 199.125 3.09961H146.525H146.025V3.59961V144ZM226.775 103.443C219.693 110.394 209.766 113.9 196.925 113.9H181.225V33.2996H196.925C209.764 33.2996 219.689 36.8706 226.772 43.9532C233.854 51.0358 237.425 60.9613 237.425 73.7996C237.425 86.6385 233.854 96.4947 226.775 103.443Z"
              stroke="white"
              strokeWidth="0.9"
            />
            <path
              d="M0.712891 144V144.5H1.21289H53.8129C68.5463 144.5 81.4952 141.553 92.645 135.643C103.927 129.733 112.599 121.4 118.648 110.647C124.829 99.8963 127.913 87.6091 127.913 73.7996C127.913 59.8583 124.829 47.5703 118.647 36.9513C112.599 26.2006 103.995 17.8677 92.847 11.9578C81.6962 6.04655 68.6797 3.09961 53.8129 3.09961H1.21289H0.712891V3.59961V144ZM81.4626 103.443C74.3804 110.394 64.4538 113.9 51.6129 113.9H35.9128V33.2996H51.6129C64.4512 33.2996 74.3767 36.8706 81.4593 43.9532C88.5419 51.0358 92.1129 60.9613 92.1129 73.7996C92.1129 86.6385 88.5418 96.4947 81.4626 103.443Z"
              stroke="white"
              strokeWidth="0.9"
            />
          </svg>
        </div>
        {/* jsx */}
        <style jsx>{`
          /* Define your styles here using CSS syntax within backticks */
          .swiper {
            width: 100%;
            height: 100vh;
          }
          .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;

            /* Center slide text vertically */
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .swiper-slide img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .autoplay-progress {
            position: absolute;
            right: 16px;
            bottom: 16px;
            z-index: 10;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: var(--swiper-theme-color);
          }

          .autoplay-progress svg {
            --progress: 0;
            position: absolute;
            left: 0;
            top: 0px;
            z-index: 10;
            width: 100%;
            height: 100%;
            stroke-width: 4px;
            stroke: var(--swiper-theme-color);
            fill: none;
            stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
            stroke-dasharray: 125.6;
            transform: rotate(-90deg);
          }
        `}</style>
      </section>
    </>
  )
}
