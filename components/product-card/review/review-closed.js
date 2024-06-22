import React from 'react'
import Image from 'next/image'
import styles from '@/styles/product/Product.module.css'
import Link from 'next/link'
import FiveStars from '@/components/product-card/review/five-stars'
import { GoThumbsup } from 'react-icons/go'
import { SlArrowDown } from 'react-icons/sl'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
export default function ReviewClosed() {
  return (
    <>
      <div className="d-flex  flex-column ms-sm-0 ">
        {/* <!-- TODO:?上邊 --> */}
        <div className="d-flex">
          {/* <!--TODO: ?details --> */}
          <div
            className={`d-flex me-sm-0 me-5  flex-column  ${styles['review-details']} ${styles['review-font-size']}`}
          >
            <div className="d-flex">
              <div className="d-flex">
                c**123&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div className="d-flex">尺寸:S&nbsp;顏色:黑色</div>
            </div>
            <div className="d-flex me-5 pe-5 justify-content-between">
              <div className="d-flex">
                <FiveStars />
              </div>
              <div className="d-flex">2024/04/01</div>
            </div>
            <div className="d-flex mb-n3 mt-1 pb-0">
              <div className=" text-truncate">
                <GoThumbsup size={20} color="#000000" />{' '}
                探討包包評價時，如果發現非常複雜，那麼想必不簡單，那麼想必不簡單
              </div>
            </div>
          </div>
          {/* <!--TODO: ?照片欄 --> */}
          <div className={`ps-2  d-flex pt-3 ${styles['review-photo']}  `}>
          <Zoom><img
              src="https://ajuga.itembox.design/product/003/000000000310/000000000310-27.jpg?t=20240124033852"
              alt=""
              style={{ width: '44px', height: '44px' }}
            /></Zoom>
          </div>
        </div>
        {/* <!-- TODO:?下邊 --> */}
        <div className={`mb-3 ${styles['xxs-none']} `}>
          <div className="d-flex  justify-content-center ">
            <div className="fw-bold d-flex ">
              MORE&nbsp;&nbsp;
              <div className="d-flex  align-items-center">
                {' '}
                <SlArrowDown size={17} color="#000000" />
              </div>
            </div>
          </div>
        </div>
        <div className={`mb-3  ${styles['border-weight']}`}></div>
      </div>
    </>
  )
}
