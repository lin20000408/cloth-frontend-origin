import React from 'react'
import products from '@/data/Product.json'
import styles from './cart.module.css'
import { useCart } from '@/hooks/use-cart-state'
import toast, { Toaster } from 'react-hot-toast'

export default function ProductList() {
  // console.log(products)

  const { addItem } = useCart()

  const notify = (productName) =>
    toast.success(productName + ' 已成功加入購物車')

  return (
    <>
      <ul className={styles['list']}>
        {products.map((v, i) => {
          return (
            <li key={v.id} className={styles['item']}>
              <div className={styles['w-400']}>{v.name}</div>
              <div>{v.price}</div>
              <div>
                <button
                  onClick={() => {
                    addItem(v)

                    notify(v.name)
                  }}
                >
                  加入購物車
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      {/* 用於土司訊息的元件 */}
      <Toaster />
    </>
  )
}
