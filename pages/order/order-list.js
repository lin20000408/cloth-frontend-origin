import React from 'react'
import { useState, useEffect } from 'react'
import styles from '@/styles/order/order-list.module.css'
import UserLayout from '@/components/layout/user-layout'
import { LuClipboardList } from 'react-icons/lu'
import SearchBar from '@/components/order-list/searchbar'
import ListStatus from '@/components/order-list/listStatus'
import Link from 'next/link'
import 'animate.css'
export default function OrderList() {
  const [listData, setListData] = useState([])
  const [searchBarList, setSearchBarList] = useState([])
  const [listStatus, setListStatus] = useState([])
  const [all, setAll] = useState('')
  const [isHovered, setIsHovered] = useState(null)
  const fetchListData = async () => {
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order-list/${userIdLocalStorage}`,
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
        const orderListData = responseData.data.order_list
        setListData(orderListData)
        console.log('從後端接收到的數據999999：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的數據999999：', orderListData) // 在控制台console.log接收到的數據
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
    fetchListData()
  }, [])
  useEffect(() => {
    console.log('list', listData)
    console.log('Bar', searchBarList)
    console.log('status', listStatus)
  })
  let Data
  if (searchBarList.length > 0) {
    Data = searchBarList
  } else if (listStatus.length > 0) {
    Data = listStatus
  } else if (all === '全部') {
    Data = listData
  } else if (all) {
    Data = listStatus
  } else {
    Data = listData
  }
  const handleMouseEnter = (index) => {
    setIsHovered(index)
  }

  const handleMouseLeave = () => {
    setIsHovered(null)
  }
  // const Data = searchBarList.length > 0 ? searchBarList : listData
  return (
    <>
      <div style={{ paddingTop: 15 }}></div>
      <section className={styles['orderlist-session']}>
        <div className={styles['part-right']}>
          <ListStatus
            setListStatus={setListStatus}
            setSearchBarList={setSearchBarList}
            setAll={setAll}
          />
          <SearchBar setSearchList={setSearchBarList} />
          <div className={`d-flex flex-column gap-3 ${styles['barList']}`} style={{height:'550px', overflow:'auto'}}>
            {Data.map((v, i) => {
              const toDetails = () => {
                localStorage.setItem('newOrderId', v.order_id)
              }
              return (
                <div
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  className={`bg-white p-3 ${
                    isHovered === i ? 'animate__animated animate__pulse' : ''
                  } ${styles['all-list']}`}
                  key={v.order_id}
                >
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <LuClipboardList style={{ marginBottom: '3px' }} />
                      <span className="ms-2 mt-5">{v.order_id}</span>
                    </div>
                    <p className="text-price">{v.order_status}</p>
                  </div>
                  <div className="border-top">
                    <Link
                      onClick={toDetails}
                      className="d-flex justify-content-between align-items-center text-reset"
                      href="./order-details"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="d-flex mt-3 align-items-center">
                        <img src={v.ph1} alt="商品圖" width={85} height={85} />
                        <ul className={styles['product-info']}>
                          <li style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '110px', // 設定合適的寬度
                                textAlign: 'start',
                              }}>{v.name}</li>
                          <li
                            className="text-secondary"
                            style={{ fontSize: 14 }}
                          >
                            規格:{v.color}
                          </li>
                          <li>x{v.product_quantity}</li>
                        </ul>
                        <p className={styles['dot']}>...</p>
                      </div>
                      <p className="mt-3">
                        訂單金額:
                        <span className="text-price">
                          ${v.total_cost.toLocaleString()}
                        </span>
                      </p>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

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
// 這裡代表要套用NofooterLayout，取代原本的DefaultLayout
// 要寫在元件的函式之外
OrderList.getLayout = function (page) {
  return <UserLayout>{page}</UserLayout>
}
