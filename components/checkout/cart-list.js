import React from 'react'
import styles from './cart.module.css'
import { useCart } from '@/hooks/use-cart-state'
// 引入Swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CartList() {
  const { items, increaseItem, decreaseItem, removeItem } = useCart()

  // 要改用sweetalert2-react-content來取代Swal
  const MySwal = withReactContent(Swal)

  const notifyAndRemove = (productName = '', productId = 0) => {
    MySwal.fire({
      title: '真的確定嗎?',
      text: '你將無法回復這個操作!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定刪除',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: productName + ' 已從購物車中刪除',
          icon: 'success',
        })

        // 這裡作刪除的動作
        removeItem(productId)
      }
    })
  }

  const notifyAndCallback = (productName = '', callback = () => {}) => {
    MySwal.fire({
      title: '真的確定嗎?',
      text: '你將無法回復這個操作!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定刪除',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '已刪除!',
          text: productName + ' 已從購物車中刪除',
          icon: 'success',
        })

        // 這裡作刪除的動作
        callback()
      }
    })
  }

  return (
    <>
      <ul className={styles['list']}>
        <li className={styles['item']}>
          <div className={styles['w-400']}>名稱</div>
          <div>價格</div>
          <div>數量</div>
          {/* 明天從小計功能解說起 */}
          <div>小計</div>
          <div></div>
        </li>
        {items.map((v, i) => {
          return (
            <li key={v.id} className={styles['item']}>
              <div className={styles['w-400']}>{v.name}</div>
              <div>{v.price}</div>
              <div>
                <button
                  onClick={() => {
                    increaseItem(v.id)
                  }}
                >
                  +
                </button>
                <span>{v.qty}</span>
                <button
                  onClick={() => {
                    decreaseItem(v.id)
                  }}
                >
                  -
                </button>
              </div>
              <div>{v.subTotal}</div>
              <div>
                <button
                  onClick={() => {
                    // 改為跳出對話盒後，按確定才會刪除
                    notifyAndRemove(v.name, v.id)

                    // 改為跳出對話盒後，按確定執行某個函式
                    // notifyAndCallback(v.name, () => removeItem(v.id))
                  }}
                >
                  移除
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
