import React from 'react'
import Image from 'next/image'
import styles from '@/styles/product/Product.module.css'
import Link from 'next/link'
import sizeChart from '@/public/product/imgs/sort=shirt,length=short.svg'
export default function SizeChart() {
  return (
    <>
      <div className={` ${styles['xxs-none']} `}>
        <div className="mt-3 d-flex justify-content-between align-items-center ">
          <div className="d-flex align-items-center">[尺寸表]</div>
          <div className="btn-group d-flex">
            <button
              type="button"
              className={` btn btn-secondary dropdown-toggle my-0 ${styles['size-toggle']} `}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              切換單位
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" type="button">
                  英寸
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button">
                  公分
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={` xxs-none  ${styles['xxs-none']}  `}>
        <Image
          src={sizeChart}
          alt=""
          width={'370'}
          height={'200'}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSU"
        />
      </div>
    </>
  )
}
