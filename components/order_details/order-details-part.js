import React, { useState, useEffect } from 'react'
import styles from '@/styles/order/order-details.module.css'
import Link from 'next/link'
export default function OrderDetailsPart({ details }) {
  const orderDetail = details.length > 0 ? details[0] : null
  useEffect(() => {
    console.log('我是明細', details)
  }, [details])

  //算出所有商品總和
  const pdCost = details.reduce((acc, cur) => acc + cur.product_amount_total, 0)
  if (!orderDetail) {
    return null
  }

  const shipfee = pdCost >= 5000 ? 0 : 60

  return (
    <>
      <section className={styles['ods-session2']}>
        <div className={styles['part-left']}>
          <div className={styles['ords']}>
            <p className={`border-ddsecondary ${styles['ords-title']}`}>
              訂單明細
            </p>
            <ul className={styles['ords-info']}>
              <li>
                <span>訂單編號:</span> {orderDetail.order_id}
              </li>
              <li>
                <span>收件人:</span> {orderDetail.receiver}
              </li>
              <li>
                <span>取貨方式:</span> {orderDetail.shipping_method}
              </li>
              <li>
                <span>地址:</span> {orderDetail.receiver_address}
              </li>
              <li>
                <span>連絡電話:</span> {orderDetail.receiver_phone}
              </li>
              <li>
                <span>付款方式:</span> {orderDetail.payment_method}
              </li>
              <li>
                <span>付款狀態:</span> {orderDetail.payment_status}
              </li>
              <li>
                <span>訂單狀態:</span> {orderDetail.order_status}
              </li>
              <li>
                <span>訂購日期:</span>
                {new Date(orderDetail.order_creation_time).toLocaleDateString(
                  'zh-TW',
                  {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles['part-right']}>
          <p style={{ textAlign: 'center', fontSize: 18, marginBottom: 10 }}>
            支付金額
          </p>
          <ul className={`border-ddsecondary ${styles['part-right-count']}`}>
            <li>商品總計</li>
            <li style={{ fontWeight: 'bold' }}>${pdCost.toLocaleString()}</li>
          </ul>
          <ul className={`border-ddsecondary ${styles['part-right-count']}`}>
            <li>運費</li>
            <li>${shipfee}</li>
          </ul>
          <ul className={`border-ddsecondary ${styles['part-right-count']}`}>
            <li>優惠券折抵</li>
            <li style={{ color: 'rgb(224, 24, 24)', fontWeight: 'bold' }}>
              -$
              {orderDetail.coupon_discount
                ? orderDetail.coupon_discount
                : 0}
            </li>
          </ul>
          <ul className={`border-ddsecondary ${styles['part-right-count']}`}>
            <li>訂單總價</li>
            <li className="text-price" style={{ fontWeight: 'bold' }}>
              ${orderDetail.total_cost.toLocaleString()}
            </li>
          </ul>
        </div>
        <Link
          className={`btn btn-outline-dark ${styles['keep-buying']}`}
          href="../product-list/"
          role="button"
        >
          繼續購物
        </Link>
      </section>

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
