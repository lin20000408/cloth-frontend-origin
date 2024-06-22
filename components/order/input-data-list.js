import React from 'react'
import { Select } from 'antd'
import { ConfigProvider } from 'antd'
import { useState, useEffect } from 'react'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function InputDataList() {
  const [couponData, setCouponData] = useState([])
  const [money, setMoney] = useState('請選擇優惠券')
  const { updateOrderCoupon, orderCoupon } = useBackEndData('')
  const fetchSelectCoupon = async () => {
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order-coupon/${userIdLocalStorage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const responseData = await response.json() // 解析數據
      // 處理響應
      if (responseData.status === 'success') {
        const orderCoupon = responseData.data.order_coupon
        setCouponData(orderCoupon)
        console.log('從後端接收到的優惠券信息：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的優惠券信息：', orderCoupon) // 在控制台console.log接收到的數據
      } else {
        console.warn('請求失敗')
        return {}
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return {}
    }
  }

  useEffect(() => {
    fetchSelectCoupon()
  }, [])
  const handleChange = (v) => {
    console.log(v) // 確保這裡取得的是正確的格式
    setMoney(v)
    const selectedTitle = v.title
    const selectedId = v.value
    const selectedName = v.label
    updateOrderCoupon({
      selectedTitle: selectedTitle,
      selectedId: selectedId,
      selectedName: selectedName,
    })
    
  }
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'IBM Plex Sans TC'
          },
          components: {
            Select: {
              controlOutline: '#ABC8BC',
              colorPrimary: '#ABC8BC',
              colorBorder: '#ABC8BC',
              colorPrimaryHover: '#ABC8BC',
              lineWidth: 3,
              optionSelectedBg: '#ABC8BC',
              fontSize: '16',
              optionSelectedColor: '#fff',
            },
          },
        }}
      >
        <Select
          showSearch={true}
          labelInValue
          value={money}
          onChange={handleChange}
          style={{
            width: 250,
            height: 45,
          }}
          placeholder="請選擇"
          options={couponData.map((v) => ({
            title: v.money,
            label: v.name,
            value: v.id,
          }))}
        />
      </ConfigProvider>
    </>
  )
}
