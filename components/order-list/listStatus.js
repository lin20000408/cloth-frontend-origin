import React from 'react'
import { useEffect, useState } from 'react'
import styles from '@/styles/order/order-list.module.css'

export default function ListStatus(props) {
  const { setListStatus, setSearchBarList,setAll } = props
  const [status, setStatus] = useState('')
  const [statusData, setStatusData] = useState([])
  const [buttonStates, setButtonStates] = useState({
    全部: false,
    未出貨: false,
    待收貨: false,
    已完成: false,
    取消: false,
    '退貨/退款': false,
  })
  const fetchListStatus = async () => {
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order-status/?userID=${userIdLocalStorage}&status=${status}`,
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
        const statusListData = responseData.data.list_status
        setStatusData(statusListData)
        setListStatus(statusListData)
        console.log('從後端接收到的狀態數據：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的狀態數據：', statusListData) // 在控制台console.log接收到的數據
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
    if (status !== '') {
      fetchListStatus()
    }
  }, [status])

  const handleButtonClick = (buttonName) => {
    setStatus(buttonName)
    setAll(buttonName)
    setSearchBarList('')
    setButtonStates((prevStates) => ({
      ...Object.fromEntries(
        Object.entries(prevStates).map(([key]) => [key, false])
      ),
      [buttonName]: true,
    }))
  }
  return (
    <>
      <div
        className={`row bg-ddprimary text-center text-white align-items-center border-primary ${styles['ords-list-select']}`}
      >
        <button
          className={`col-2 ${
            buttonStates['全部']
              ? styles['status-button-clicked']
              : styles['status-button']
          }`}
          onClick={() => handleButtonClick('全部')}
        >
          <span>全部</span>
        </button>
        <button
          className={`col-2 ${
            buttonStates['未出貨']
              ? styles['status-button-clicked']
              : styles['status-button']
          }`}
          onClick={() => handleButtonClick('未出貨')}
        >
          <span>待出貨</span>
        </button>
        <button
          className={`col-2 ${
            buttonStates['待收貨']
              ? styles['status-button-clicked']
              : styles['status-button']
          }`}
          onClick={() => handleButtonClick('待收貨')}
        >
          <span>待收貨</span>
        </button>
        <button
          className={`col-2 ${
            buttonStates['已完成']
              ? styles['status-button-clicked']
              : styles['status-button']
          }`}
          onClick={() => handleButtonClick('已完成')}
        >
          <span>已完成</span>
        </button>
        <button
          className={`col-2 ${
            buttonStates['取消']
              ? styles['status-button-clicked']
              : styles['status-button']
          }`}
          onClick={() => handleButtonClick('取消')}
        >
          <span>取消</span>
        </button>
        <button
          className={`col-2 ${
            buttonStates['退貨/退款']
              ? styles['status-button-clicked']
              : styles['status-button']
          }`}
          onClick={() => handleButtonClick('退貨/退款')}
        >
          <span>退貨/退款</span>
        </button>
      </div>
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
          li,
          p {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          th,
          td {
            text-align: center;
            vertical-align: middle;
          }

          td hr {
            border: 1.5px solid;
          }
          @media (max-width: 768px) {
            thead {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}
