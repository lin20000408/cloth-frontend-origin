import React, { useState, useEffect } from 'react'
import styles from '@/styles/order/order-details.module.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import Link from 'next/link'

export default function DetailsProducts({ handlePdDetailsChange }) {
  const { pdDetailsId } = useBackEndData('')
  const [pdDetails, setPdDetails] = useState([])

  const fetchOrderDetails = async () => {
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    const orderIdLocalStorage = JSON.parse(localStorage.getItem('newOrderId'))
    try {
      const response = await fetch(
        `http://localhost:3005/api/order-details/?userID=${userIdLocalStorage}&orderID=${orderIdLocalStorage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const responseData = await response.json()
      if (responseData.status === 'success') {
        const orderdDetailsData = responseData.data.detailsData
        setPdDetails(orderdDetailsData)
        console.log('從後端接收到的明細數據：', responseData)
        console.log('從後端接收到明細數據：', orderdDetailsData)
      } else {
        console.warn('請求失敗')
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
    }
  }

  useEffect(() => {
    fetchOrderDetails()
  }, []) // 加了空依賴數組，表示只在組件創建時執行一次

  useEffect(() => {
    handlePdDetailsChange(pdDetails)
  }, [pdDetails]) // 只有pdDetails更新时才会调用handlePdDetailsChange

  console.log(pdDetails) // 移到這裡

  return (
    <>
      <section className={styles['ods-session1']}>
        <table className="table table-bordered border-ddsecondary">
          <thead className="table-ddprimary">
            <tr className="mx-auto">
              <th scope="col" className="col-2 fw-bold fs-6 text-white">
                商品名稱
              </th>
              <th scope="col" className="col-1 fw-bold fs-6 text-white">
                數量
              </th>
              <th scope="col" className="col-1 fw-bold fs-6 text-white">
                單價
              </th>
              <th scope="col" className="col-1 fw-bold fs-6 text-white">
                總價
              </th>
              <th scope="col" className="col-1 fw-bold fs-6 text-white">
                商品評價
              </th>
            </tr>
          </thead>
          <tbody className={styles['products-info']}>
            {pdDetails.map((v, i) => {
              return (
                <tr key={i}>
                  <th scope="row" className={styles['product-info']}>
                    <img src={v.ph1} alt="商品圖" width={100} height={100} />
                    <div className={styles['product-name']}>
                      <p
                        style={{
                          whiteSpace: 'nowrap',

                          textOverflow: 'ellipsis',
                          width: '200px', // 設定合適的寬度
                          textAlign: 'start',
                        }}
                      >
                        {v.name}
                      </p>
                      <p style={{ fontSize: 12, color: '#a2a2a2' }}>
                        ({v.color})
                      </p>
                      <p>${v.price.toLocaleString()}</p>
                      <p>{v.size}</p>
                    </div>
                  </th>
                  <td id={styles['Product-count']}>{v.product_quantity}</td>
                  <td>${v.price.toLocaleString()}</td>
                  <td>${v.product_amount_total.toLocaleString()}</td>
                  {v.product_reviews_id === null ? (
                    <td className="text-ddsecondary" style={{ fontSize: 14 }}>
                      <Link
                        className={`btn d-flex align-items-center justify-content-center ${styles['productRow-button']}`}
                        href={`http://localhost:3000/review/${v.id}`}
                      >
                        評論
                      </Link>
                    </td>
                  ) : (
                    <td className="text-ddsecondary" style={{ fontSize: 14 }}>
                      <Link
                        className={`btn d-flex align-items-center justify-content-center ${styles['productRow-button']}`}
                        href={`http://localhost:3000/review/edit/${v.id}`}
                      >
                        修改
                      </Link>
                      <hr
                        style={{ border: '1.5px solid' }}
                        className="text-dark"
                      />
                      <Link
                        className={`btn d-flex align-items-center justify-content-center ${styles['productRow-button']}`}
                        href={`http://localhost:3000/review/delete/${v.id}`}
                      >
                        刪除
                      </Link>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <style jsx>
        {`
          li {
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
