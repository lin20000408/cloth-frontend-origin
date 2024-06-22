import React from 'react'
import { useState } from 'react'
import styles from '@/styles/order/order-details.module.css'
import DetailsProducts from '@/components/order_details/details-products'
import OrderDetailsPart from '@/components/order_details/order-details-part'
import Link from 'next/link'
export default function OrderDetails() {
  const [details, setDetails] = useState([])
  const handlePdDetailsChange = (newPdDetails) => {
    setDetails(newPdDetails)
  }
  return (
    <>
      <div className="container">
        <div className={styles['title']}>
          <p>訂單詳情</p>
        </div>
        <div className={styles['back-orderlist']}>
          <Link
            className={`btn btn-outline-dark ${styles['back-orderlist-link']}`}
            href="./order-list"
            role="button"
          >
            返回訂單列表
          </Link>
        </div>
        <DetailsProducts handlePdDetailsChange={handlePdDetailsChange} />
        <OrderDetailsPart details={details} />
        {/* 手機版才出現 */}
        <div className={styles['back-orderlist2']}>
          <Link
            className={`btn btn-outline-dark ${styles['back-orderlist-link2']}`}
            href="./order-list"
            role="button"
          >
            返回訂單列表
          </Link>
          <Link
            className={`btn btn-outline-dark ${styles['keep-buying2']}`}
            href="../product-list/"
            role="button"
          >
            繼續購物
          </Link>
        </div>
      </div>

      <style jsx>
        {`
          li {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          th,
          td {
            text-align: center;
            vertical-align: middle;
          }

          td hr {
            border: 1.5px solid;
          }
          @media (max-width: 768px) {
            thead {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}
