import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectFlip, Pagination, Navigation } from 'swiper/modules'
import styles from '@/components/product-card/productCard.module.css'
import ProductHeart from '../productList/productHeart'
//FIXME:icon
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti'
// import required modules

export default function ProductCard({
  marginRight = '1',
  marginBottom = '3',
  marginBottomSm = '0',
  pc_id = 0,
  product_id = 0,
  ProductsName = '',
  ProductsPrice = 0,
  st_name = '',
  phGroup = [],
  colorName = '',
  color = '',
  colorArr = [],
}) {
  // console.log(favorites)
  //  colorArr = ["#ADD8E6", "110601"]
  return (
    // <div
    //   className={`d-flex  flex-column col rounded-4  p-0   `}
    //   //   style={{ marginRight: marginRight, marginBottom: marginBottom }}
    // >
    <div
      className={`${styles['suggest-product-card']}`}
      style={{ marginBottom: '10px' }}
    >
      {/* 傳送 product_color.id*/}
      <Link href={`/product-list/${pc_id}`}>
        <Swiper
          effect={'flip'}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className={`mySwiper rounded-3 ${styles['my-swiperbig']}`}
          style={{
            '--swiper-navigation-color': '#ffffff00',
            '--swiper-pagination-color': ' #e0818100',
          }}
        >
          {phGroup.map((img, i) => (
            <SwiperSlide
              key={`${pc_id}${i}`}
              className={styles['swiper-slide']}
            >
              <img src={img} className={styles['sw-img']} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Link>

      {/* 商品規格 */}
      <div
        className={`d-flex  flex-column justify-content-center ${styles['suggest-product-details']} `}
      >
        <div className="text-truncate">
          {ProductsName}({colorName})
        </div>
        <div>NT${ProductsPrice}</div>
        {/* 顏色收藏區 */}
        <div className="d-flex justify-content-between align-items-center ">
          {/* 顏色按鈕 */}
          <div className="d-flex  align-items-center w-100">
            {colorArr.map((color, i) => {
              // 检查当前索引是否是奇数
              if (i % 2 === 1) {
                return (
                  <Link
                    key={`${pc_id}${color}`}
                    href={`/product-list/${colorArr[i]}`}
                    className="align-middle"
                    style={{ marginRight: '5px' }}
                  >
                    <div
                      className={styles['color-bt']}
                      style={{
                        backgroundColor: colorArr[i - 1], // 使用偶数索引的颜色
                      }}
                    ></div>
                  </Link>
                )
              }
            })}
          </div>
          {/* 收藏 */}
          <ProductHeart pc_id={pc_id} pname={`${ProductsName}(${colorName})`} />
          {/* <FavIcon /> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}
