import React from 'react'

import styles from '@/styles/product/Product.module.css'
import Link from 'next/link'

export default function ProductDetails() {
  return (
    <>
      <div className={` ${styles['xxs-none']} `}>
        <div className="d-flex    mt-0   ">
          <div className="d-flex  flex-column">
            <div className="d-flex ">[品質]</div>
            <div className="d-flex">[上架時間]</div>
            <div className="d-flex">[類性]</div>
          </div>

          <div className="d-flex flex-column     ">
            <div className="d-flex">料布料：100% 聚酯纖維</div>
            <div className="d-flex">2024春季</div>
            <div className="d-flex">日系風</div>
          </div>
        </div>
      </div>
      <div className={` ${styles['xxs-none']}  ${styles['details-content']}`}>
        <div className="mt-3 lh-lg d-flex">
          這款媽媽托特包採用耐用的帆布面料製成容量超大，
          <br />
          看起來就像三個托特包粘在一起一樣。小袋上繡有
          <br />
          AJUGA.容量足以容納大約 5 個尿布。可以保持飲料熱或冷。
          <br />
          兩側都有手柄，也可用作嬰兒車包。(92字以內)
        </div>
      </div>
    </>
  )
}