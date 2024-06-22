import React from 'react'
import Image from 'next/image'
import styles from '@/styles/product/Product.module.css'
import Link from 'next/link'
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti'
export default function ProductInfo({
  product_Id = 0,
  product_Name = '',
  price = 0,
}) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="text-danger-emphasis fs-6">D.D.SHOP原創</div>
        {/* 星星 */}
        <div className="d-flex d-sm-none">
          <Link
            href="/pages/product/content-cell.js"
            class={styles['a-div']}
            style={{ textDecoration: 'underline', fontSize: '12px' }}
          >
            [尺寸表及商品評價]
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="fs-3">
          {product_Name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div
          className="d-flex d-sm-none"
          style={{ textDecoration: 'underline' }}
        >
          <Link
            href="/pages/product/reviews-cell.js"
            className={` d-flex align-items-center   ${styles['a-div']}  `}
          >
            <TiStarFullOutline className="d-flex " size={30} color="#872349" />{' '}
            <div className="d-flex align-items-top  ">3.5/5(5)</div>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row  flex-sm-column">
          <div className="text-danger-emphasis  d-flex align-items-center ">
            ${price}
          </div>
          <div className={` text-danger-emphasis  ${styles['xxs-none']} `}>
            產品編號&nbsp;{product_Id}
          </div>
        </div>
        {/* <div className="d-sm-none d-flex align-items-center">
          <div style={{ fontSize: '12px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;全館滿1,000免運
          </div>
        </div> */}
          {/*做跑馬燈 <div className="d-flex fs-6">適用兩件五折</div> */}
      </div>

      <div
        className={`    ${styles['xxs-none']}  ${styles['border-weight']}`}
      ></div>
    </>
  )
}
