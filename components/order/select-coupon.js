import React from 'react'
import InputDataList from '@/components/order/input-data-list'
import styles from '@/styles/order/order.module.css'
export default function SelectCoupon() {
  return (
    <>
      <div className={`border-ddsecondary ${styles['coupon']}`}>
        <p className={`border-ddsecondary ${styles['coupon-title']}`}>優惠券</p>
        <p style={{ marginTop: 10 }}>請選擇您想使用的優惠券。</p>

        <div className={`bg-ddprimary ${styles['select-coupon']}`}>
          <p className="fw-bold text-white">選擇優惠券</p>
          <InputDataList />
        </div>
      </div>
    </>
  )
}
