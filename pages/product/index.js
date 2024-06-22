import React from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import styles from '@/styles/product/Product.module.css'
import Link from 'next/link'

// import {noScrollbarsClassName} from 'react-remove-scroll-bar';
// components
import ProductCard from '@/components/product-card/ProductCard'
import ReviewClosed from '@/components/product-card/review/review-closed'
import ReviewEntired from '@/components/product-card/review/review-entired'
import FiveStars from '@/components/product-card/review/five-stars'

import OutfitProduct from '@/components/product-card/left-side/ads'
import SizeChart from '@/components/product-card/left-side/size-chart'
// import MainPhotoSlider from '@/components/product-card/left-side/main-photo-slider'
import ProductDetails from '@/components/product-card/left-side/product-details'
import ProductInfo from '@/components/product-card/right-side/product-info'
import AddToCart from '@/components/product-card/right-side/add-to-cart'

// 照片

import switchPage from '@/public/product/imgs/pageSwitch.svg'
import parallaxLogo from '@/public/product/imgs/parallax-logo.png'
// icon
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti'

import {
  PiHeartLight,
  PiSortAscendingLight,
  PiSortDescendingLight,
} from 'react-icons/pi'
import { SlPicture } from 'react-icons/sl'

export default function Product() {
  return (
    // FIXME:全部-背景顏色
    <div className="bg-bgColor">
      <div className="container justify-content-center pt-5 ">
        <div className={`px-0 ${styles['container-div']} `}>
          {/* FIXME:上半部 row */}
          <div className="row mx-0 px-0  pt-5">
            {/* TODO:左側細節 */}
            <div className="col-sm-6 col-12 mx-0   d-flex flex-sm-row ps-3  flex-column-reverse">
              {/* TODO:照片小圖+主圖 */}
              <div className="flex-column  ">
                {/* <MainPhotoSlider /> */}

                {/* TODO:照片小圖側欄end */}

                {/* TODO:搭配商品 */}
                <div className={`d-flex flex-column ${styles['center-css']}  `}>
                  <OutfitProduct />
                  <SizeChart />
                  <ProductDetails />
                </div>
                {/* TODO:搭配商品end  */}
              </div>
            </div>
            {/* TODO:left-side end */}
            {/* TODO:右側細節  */}

            <div className={`col-sm-6 py-0 col-12 ps-sm-5  ps-0 pe-2 `}>
              <ProductInfo />
              {/* TODO:color-suggest  */}
              <AddToCart />
              {/* <!-- TODO:-評價 --> */}

              <div className={` mt-3 ${styles['scrolling-box']} `}>
                <section
                  id="1"
                  className={`bg-ddprimary-light mb-3 rounded-3  px-3 py-2 ${styles['review-title']} ${styles['scroll-right']} `}
                >
                  <div className={` ${styles['text-20']} `}>
                    <div className={` fs-5 ${styles['a-div']} `}>
                      [商品評價]
                    </div>
                  </div>
                  <div className="mt-n1">
                    <FiveStars />
                    <span className={` ${styles['text-20']} `}>
                      &nbsp;&nbsp;3.5/5
                    </span>
                    &nbsp;&nbsp;
                    <span>(99)</span>
                  </div>
                </section>
                <section
                  id="2"
                  className={` ${styles['xxs-none']} ${styles['scroll-right']}`}
                >
                  <div
                    className="d-flex mt-2 justify-content-between   "
                    style={{ marginRight: '50%', marginBottom: '5%' }}
                  >
                    <div className="d-flex text-ddsecondary">
                      <div className="d-flex  align-items-center">
                        {' '}
                        <SlPicture size={20} />
                      </div>
                      含照片
                    </div>
                    <div className="d-flex text-ddsecondary">
                      <div className="d-flex  align-items-center">
                        <PiSortAscendingLight size={20} />
                      </div>
                      由高到低
                    </div>
                    <div className="d-flex ">
                      <div className="d-flex  align-items-center">
                        <PiSortDescendingLight size={20} />
                      </div>
                      由低到高
                    </div>
                  </div>
                </section>

                {/* <!-- TODO:!評論合起來 --> */}
                <section id="3" className={` ${styles['scroll-right']} `}>
                  <ReviewClosed />
                  {/* <!--TODO: !評論展開 --> */}
                  <ReviewEntired />
                  <ReviewEntired />
                  <ReviewEntired />
                  <ReviewEntired />
                  <ReviewEntired />
                  <ReviewEntired />
                  <div className="d-flex mt-0 flex-column"></div>
                  {/* TODO:<!-- ?暫定page switch --> */}
                  <div className={`${styles['xxs-none']} `}>
                    <Image
                      className={`${styles['pageSwitch']} `}
                      src={switchPage}
                      alt=""
                      width={'100'}
                      height={'40'}
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSU"
                    />
                  </div>
                  <div className="d-flex  justify-content-center d-sm-none">
                    <div className="d-flex align-items-end ">
                      <Link
                        href="pr-specific-review.html"
                        className={`fw-bold ${styles['a-div']} `}
                        style={{ textDecoration: 'underline' }}
                      >
                        MORE
                      </Link>
                    </div>
                  </div>
                </section>
              </div>

              {/* TODO:-右側細節  */}
            </div>
          </div>

          
          {/*TODO: row end */}

          {/* TODO:<!-- -推薦商品 --> */}

          <div className="mt-sm-0 mt-3">
            <div className="  d-flex justify-content-center  mb-3">
              <Link
                href="#"
                className={`d-flex border-bottom fs-3 fw-bold  ${styles['a-div']} `}
              >
                推薦商品
              </Link>
            </div>
            <div className="d-flex  mx-sm-6 mb-5 ms-3 me-0  px-sm-5  flex-sm-nowrap  flex-wrap ">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard marginRight={'0'} />
            </div>
          </div>

          {/* TODO:<!-- -推薦商品 --> */}
          {/* TODO:<!-- -瀏覽紀錄 --> */}
          <div className="mt-sm-0 mt-3">
            <div className="  d-flex justify-content-center  mb-3">
              <Link
                href="#"
                className={`d-flex border-bottom fs-3 fw-bold  ${styles['a-div']} `}
              >
                瀏覽商品
              </Link>
            </div>
            <div className="d-flex  mx-sm-6 mb-5 ms-3 me-0  px-sm-5  flex-sm-nowrap  flex-wrap ">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard marginRight={'0'} />
            </div>
          </div>
          {/* TODO:<!-- -瀏覽紀錄 --> */}
          {/* TODO:視差滾動 */}
          <section
            className={`mb-5   d-flex justify-content-center align-items-center ${styles['parallax-scrolling-bg']} ${styles['parallax-BGimg']}   `}
          >
            <div className="d-flex">
              <Image
                src={parallaxLogo}
                alt=""
                width={'140'}
                height={'150'}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSU"
              />
            </div>
          </section>
          {/* TODO:視差滾動 */}
          {/* TODO:footer */}
          {/* TODO:footer */}

          {/* FIXME:上半部 row end*/}
        </div>
      </div>
    </div>
    // FIXME:全部-背景顏色
  )
}
