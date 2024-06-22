import React from 'react'
import styles from '@/styles/cart/cart.module.css'
import { useState } from 'react'
// import Image from 'next/image'
import { useCart } from '@/hooks/use-cart-state'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import GameDropdown from '@/components/layout/navbar/game-dropdown'
export default function List() {
  const notify = (productName) =>
    toast.success(productName + ' 已成功加入購物車')

  const pds = [
    {
      id: 1,
      name: '花秤山',
      pdColor: '黑色的',
      price: 3000,
      size: 'xl',
      img: '/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg',
    },
    {
      id: 2,
      name: '八畢比',
      pdColor: '藍色的',
      price: 4000,
      size: 'l',
      img: '/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg',
    },
    {
      id: 3,
      name: '八畢564比',
      pdColor: '藍色的',
      price: 400,
      size: 'm',
      img: '/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg',
    },
    {
      id: 4,
      name: '八畢564比',
      pdColor: '藍色的',
      price: 5000,
      size: 's',
      img: '/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg',
    },
  ]
  const { addItem } = useCart()
  return (
    <>
      <div className="container">
        <h1 className={styles['title']}>商品列表</h1>
        <GameDropdown />
        <>
          {pds.map((v, i) => {
            return (
              <ul className="d-flex justify-content-between" key={v.id}>
                <li>{v.name}</li>
                <li>{v.pdColor}</li>
                <li>{v.price}</li>
                <li>{v.size}</li>
                <button
                  onClick={() => {
                    const item = { ...v, quantity: 1 }
                    addItem(item)
                    notify(v.name)
                  }}
                >
                  加入購物車
                </button>
              </ul>
            )
          })}
          <Link href="/cart/cart">連至 購物車</Link>
          <Toaster />
        </>
      </div>
      <style jsx>
        {`
          li {
            list-style: none;
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
