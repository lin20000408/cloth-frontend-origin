import React from 'react'
import ProductCard from '@/components/product-card/ProductCard'
import styles from '@/styles/productList.module.css'
import ProductBt from '@/components/productList/productBt'


export default function ProductList() {
  return (
    <>
      <div className="container ">
        <div className="row ">
          <h1 className="text-center" style={{ marginTop: 70 }}>
            男裝
          </h1>

          <div
            className={`row justify-content-center align-items-center mb-3 ${styles['product-top']} `}
          >
            {/* 上方列表 */}

            {/* 收尋區塊 */}
            <div className={`input-group ${styles['search-group']}`}>
              <div className={`input-group-text  ${styles['search-icon']} `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  hight="100%"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
                </svg>
              </div>
              <input
                type="text"
                className="form-control ${styles['search-input']}"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            {/* 按鈕區塊 */}
            <div
              className={`d-flex justify-content-evenly align-items-center ${styles['product-topbtg']}`}
            >
              <button
                type="button"
                className={`btn btn-dark ${styles['btn-type']}`}
              >
                Dark
              </button>
              <button
                type="button"
                className={`btn btn-dark ${styles['btn-type']}`}
              >
                Dark
              </button>
              <button
                type="button"
                className={`btn btn-dark ${styles['btn-type']}`}
              >
                Dark
              </button>
              <button
                type="button"
                className={`btn btn-dark ${styles['btn-type']}`}
              >
                Dark
              </button>
              <ProductBt />
            </div>
          </div>

          <div className=" d-flex justify-content-star align-items-center flex-wrap ">
          
          </div>
        </div>
      </div>
    </>
  )
}