import React, { useEffect, useState } from 'react'
import styles from '@/styles/order/order.module.css'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlinePinDrop, MdOutlineLocalPhone } from 'react-icons/md'
import OrderModal from './order-modal'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function Receiver() {
  const {
    updateSharData,
    shareData,
    updateMemberDefaultData,
    memberDefaultData,
    updatepassStore711,
    passStore711,
  } = useBackEndData('')
  const [orderShipAddress, setOrderShipAddress] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [homeDefaultData, setHomeDefaultData] = useState(null)

  const fetchHomeAddressData = async () => {
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order_memberinfo/home/defalut/${userIdLocalStorage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const responseData = await response.json()
      if (responseData.status === 'success') {
        const orderAddressData = responseData.data.order_HomeDefaultAddress
        setHomeDefaultData(orderAddressData)
        setIsLoading(false)
        console.log('從後端接收到的預設住家數據：', responseData)
        console.log('從後端接收到的預設住家數據：', orderAddressData)
      } else {
        console.warn('請求失敗')
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
    }
  }

  useEffect(() => {
    fetchHomeAddressData()
  }, [])

  const addressData =
    orderShipAddress.length > 0 ? orderShipAddress : homeDefaultData

  useEffect(() => {
    updatepassStore711(addressData)
  }, [addressData])

  if (isLoading) {
    return <div>加載中...</div>
  }

  if (!addressData) {
    return <div>沒有預設地址</div>
  }

  return (
    <div className={`border-ddsecondary ${styles['receiver']}`}>
      <p className={`border-ddsecondary ${styles['receiver-title']}`}>收件者</p>
      {addressData.map((v, i) => (
        <ul className={styles['receiver_info']} key={v.id}>
          <li>
            <FaRegUser />
            {v.name}
          </li>
          <li>
            <FaRegUser />
            {v.ship_method ? v.ship_method : '送貨上門'}
          </li>
          <li>
            <MdOutlinePinDrop />
            {v.storename ? v.storename : `${v.city}${v.district}${v.address}`}
            {v.storeaddress}
          </li>
          <li>
            <MdOutlineLocalPhone />
            {v.phone}
          </li>
        </ul>
      ))}
      <div className={`border-ddsecondary ${styles['changeBtn']}`}>
        <OrderModal setOrderShipAddress={setOrderShipAddress} />
      </div>
    </div>
  )
}
