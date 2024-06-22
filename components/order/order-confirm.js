import React, { useEffect, useState } from 'react'
import styles from '@/styles/order/order.module.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import { useCart } from '@/hooks/use-cart-state'

export default function OrderConfirmBtn(props) {
  const { calculatedTotalPrice, paymentMethod,memberEmail,userName } = props
  const {
    orderCoupon,
    passStore711,
    updatpdDetailsId,
    pdDetailsId,
    updateOrderDetailsData,
    orderDetailsData,
  } = useBackEndData('')
  const { items } = useCart()
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [verifyEmail, setVerifyEmail] = useState('')

  const UpdateCoupon = async () => {
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    if (!userIdLocalStorage) {
      console.error('userIdLocalStorage is null or invalid')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3005/api/coupon-send-management/order/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            couponID: orderCoupon.selectedId,
            usage_status: '已使用',
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()
      if (responseData.status === 'success') {
        console.log('從後端接收到的優惠券更新成功', responseData)
      } else {
        console.warn('請求失敗:', responseData)
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
    }
  }

  const AddOrderData = async () => {
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    const paymentStatus = paymentMethod === '信用卡' ? '已付款' : '未付款'

    if (!userIdLocalStorage) {
      console.error('userIdLocalStorage is null or invalid')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3005/api/order-details/addData/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            couponName: orderCoupon.selectedName,
            couponDiscount: orderCoupon.selectedTitle,
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            receiver_address: passStore711,
            order_status: '未出貨',
            Items: items,
            product_amount_total: calculatedTotalPrice,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()
      if (responseData.status === 'success') {
        const newOrderId = responseData.data.orderId
        updatpdDetailsId(newOrderId)
        localStorage.setItem('newOrderId', newOrderId) // Store newOrderId in localStorage
        console.log('從後端接收到的資料導入訂單成功', passStore711)
        console.log(responseData)
        console.log(newOrderId)
        return newOrderId
      } else {
        console.warn('請求失敗:', responseData)
        return null
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return null
    }
  }

  const handleOrderConfirmation = async () => {
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    const newOrderId = await AddOrderData()
    if (newOrderId) {
      setIsOrderConfirmed(true)
    }
  }

  
    //*寄發郵件
    const sendEmail = async () => {
      try {
        const response = await fetch( `http://localhost:3005/api/order-sendEmail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ memberEmail, Items: items,calculatedTotalPrice, userName}),
        })
        const result = await response.json()
        if (response.ok) {
          notifySendSuccess()
          return true // 如果邮件发送成功，则返回 true
        } else {
          alert(result.error)
          return false // 如果邮件发送失败，则返回 false
        }
      } catch (error) {
        console.error('Error sending email:', error)
        return false
      }
    }

  useEffect(() => {
    if (isOrderConfirmed) {
      UpdateCoupon()
      console.log(calculatedTotalPrice)
      localStorage.removeItem('cart')
      sendEmail()
      if (paymentMethod === '信用卡') {
        window.location.href = `http://localhost:3005/api/ec/?amount=${calculatedTotalPrice}`
      } else {
        window.location.href = 'http://localhost:3000/order/order-details'
      }
    }
  }, [isOrderConfirmed])


  return (
    <>
      <button
        type="button"
        className={`w-100 ${styles['custom-btn']} ${styles['btn-7']}`}
        onClick={handleOrderConfirmation}
      >
        <span>
          <a className="text-reset">確認訂單</a>
        </span>
      </button>
    </>
  )
}
