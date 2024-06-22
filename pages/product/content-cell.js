import React from 'react'
import ReactDOM from 'react-dom'
import Link from 'next/link'
import styles from '@/styles/product/Product.module.css'

export default function ContentCell() {
  return (
    <div className="mt-5 pt-5">
      <div className="d-flex justify-content-start">
        <div className=" my-0">
          <i className="flaticon-previous"></i>
        </div>
      </div>
      <div className="">
        <div className={`d-flex mt-1  `}>
          <div className="d-flex   flex-column  ">
            <div className="d-flex ">[品質]</div>
            <div className="d-flex">[上架時間]</div>
            <div className="d-flex">[製造地]</div>
            <div className="d-flex">[類性]</div>
          </div>

          <div className={`d-flex flex-column `}>
            <div className="d-flex">料布料：100% 聚酯纖維</div>
            <div className="d-flex">2024春季</div>
            <div className="d-flex">中國</div>
            <div className="d-flex">日系風</div>
          </div>
        </div>
      </div>
      <div
        className={` ${styles['details-content']} `}
        style={{ width: '440px' }}
      >
        <pre className="mt-3 lh-lg d-flex">
          這款媽媽托特包採用耐用的帆布面料製成，容量超大，
          看起來就像三個托特包粘在一起一樣。 小袋上繡有 AJUGA.，容量足以容納大約
          5 個尿布。 可以保持飲料熱或冷。 兩側都有手柄，也可用作嬰兒車包。
        </pre>
      </div>

      <div>
        <div className="mt-3 d-flex justify-content-between align-items-center ">
          <div className="d-flex align-items-center">&lsqb;尺寸表&rsqb;</div>
          <div className="btn-group d-flex">
            <button
              type="button"
              className={`btn btn-secondary dropdown-toggle my-0 data-bs-toggle  ${styles['btn-size-chart']} `}
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

        <div className={`  pt-3 px-3  `}>
          <img src="/product/imgs/sort=shirt,length=short.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
