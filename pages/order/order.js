import React, { useEffect, useState } from 'react'
import styles from '@/styles/order/order.module.css'
import { FaRegUser } from 'react-icons/fa'
import { CiMail } from 'react-icons/ci'
import { Radio, ConfigProvider } from 'antd'
import { MdOutlinePinDrop, MdOutlineLocalPhone } from 'react-icons/md'
import SelectCoupon from '@/components/order/select-coupon'
import OrderConfirmBtn from '@/components/order/order-confirm'
import { useCart } from '@/hooks/use-cart-state'
import Receiver from '@/components/order/receiver-test'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function Order() {
  const { cart, items, removeItem, updateItemQty } = useCart()
  const {
    updateMemberDefaultData,
    memberDefaultData,
    updateOrderCoupon,
    orderCoupon,
  } = useBackEndData('')
  const [localItem, setLoalItem] = useState()
  const [shippingFee, setShippingFee] = useState(0)
  const [memberData, setMemberData] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('')
  const [email,setEmail] = useState('')
  const [userName,setUserName] = useState('')
  const fetchMemberData = async () => {
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order_memberinfo/${userIdLocalStorage}`,
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
        const orderMemberData = responseData.data.order_memberinfo
        setMemberData(orderMemberData)
        updateMemberDefaultData(orderMemberData)
        console.log('從後端接收到的數據：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的數據：', orderMemberData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的數據999：', orderMemberData) // 在控制台console.log接收到的數據
      } else {
        console.warn('請求失敗')
        return {}
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return {}
    }
  }
  const calculatedTotalPrice =
    orderCoupon.selectedTitle > 0
      ? cart.totalPrice + shippingFee - orderCoupon.selectedTitle
      : cart.totalPrice + shippingFee

  useEffect(() => {
    fetchMemberData()
  }, [])

  useEffect(() => {
    if (cart.totalPrice >= 5000) {
      setShippingFee(0)
    } else {
      setShippingFee(60)
    }
  }, [cart.totalPrice])

  useEffect(() => {
    const storedItems = localStorage.getItem('cart')
    if (storedItems) {
      setLoalItem(JSON.parse(storedItems))
    }
  }, [])
  useEffect(() => {
    if (memberData.length > 0) {
      setEmail(memberData[0].account)
      setUserName(memberData[0].name)
    }
  }, [memberData])

  return (
    <>
      <div className="container">
        <div className={styles['title']}>
          <p>訂購流程</p>
        </div>

        <section className={styles['order-session']}>
          <div className={styles['part-left']}>
            <div className={styles['order-products']}>
              <table className="table table-bordered border-ddsecondary">
                <thead className="table-ddprimary">
                  <tr className="mx-auto">
                    <th scope="col" className="col-4 fw-bold fs-6 text-white">
                      商品名稱
                    </th>
                    <th scope="col" className="col-2 fw-bold fs-6 text-white">
                      數量
                    </th>
                    <th scope="col" className="col-2 fw-bold fs-6 text-white">
                      單價
                    </th>
                    <th scope="col" className="col-2 fw-bold fs-6 text-white">
                      總價
                    </th>
                  </tr>
                </thead>
                <tbody className={styles['products-info']}>
                  {/* 確保 localItem 有值之後才會進行 map 運算 */}
                  {localItem &&
                    localItem.map((v, i) => {
                      return (
                        <tr key={v.id}>
                          <th scope="row" className={styles['product-info']}>
                            <img
                              src={v.img}
                              alt="商品圖"
                              width={100}
                              height={100}
                            />
                            <div className={styles['product-name']}>
                              <p
                                style={{
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  width: '150px', // 設定合適的寬度
                                  textAlign: 'start',
                                }}
                              >
                                {v.name}
                              </p>
                              <p style={{ fontSize: 12, color: '#a2a2a2' }}>
                                ({v.pdColor})
                              </p>
                              <p>${v.price.toLocaleString()}</p>
                              <p>{v.size}</p>
                            </div>
                          </th>
                          <td id={styles['Product-count']}>{v.quantity}</td>
                          <td>${v.price.toLocaleString()}</td>
                          <td>${(v.price * v.quantity).toLocaleString()}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              <div className={styles['changeBtn']}>
                <a
                  className={`btn btn-outline-dark ${styles['keep-buying']}`}
                  href="../cart/cart"
                  role="button"
                >
                  修改
                </a>
              </div>
            </div>

            <div className={styles['user']}>
              <p className={`border-ddsecondary ${styles['user-title']}`}>
                客戶資訊
              </p>
              {memberData.map((v) => {
                return (
                  <ul key={v.id} className={styles['user_info']}>
                    <li>
                      <FaRegUser />
                      {v.name}
                    </li>
                    <li>
                      <CiMail />
                      {v.account}
                    </li>
                    <li>
                      <MdOutlinePinDrop />
                      {v.city}
                      {v.district}
                      {v.address}
                    </li>
                    <li>
                      <MdOutlineLocalPhone />
                      {v.phone}
                    </li>
                  </ul>
                )
              })}
            </div>

            <Receiver />

            <div className={`border-ddsecondary ${styles['payment-method']}`}>
              <p className={`border-ddsecondary ${styles['payment-title']}`}>
                付款方式
              </p>
              <p style={{ marginTop: 10 }}>請選擇您首選的付款方式。</p>
              <div style={{ marginTop: 10 }}>
                <form>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#ABC8BC', // 主要顏色
                        fontFamily: 'IBM Plex Sans TC',
                        colorText: 'black',
                      },
                      components: {
                        Radio: {
                          colorPrimary: '#aabec3',
                        },
                        Button: {
                          defaultActiveBorderColor: '#ABC8BC',
                        },
                      },
                      Input: {
                        borderColor: '#ABC8BC',
                        activeBorderColor: '#ABC8BC',
                        hoverBorderColor: '#ABC8BC',
                      },
                    }}
                  >
                    <Radio.Group>
                      <Radio
                        name="payment"
                        id="payment"
                        value={'信用卡'}
                        onClick={(e) => {
                          setPaymentMethod(e.target.value)
                        }}
                      >
                        <span style={{ fontSize: 16 }}>信用卡</span>
                      </Radio>
                      <br />
                      <Radio
                        type="radio"
                        name="payment"
                        id="payment"
                        value={'貨到付款'}
                        onClick={(e) => {
                          setPaymentMethod(e.target.value)
                        }}
                      >
                        <span style={{ fontSize: 16 }}>貨到付款</span>
                      </Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </form>
              </div>
            </div>
          </div>
          <div className={styles['part-right']}>
            <SelectCoupon />

            <div className={styles['order-total']}>
              <p style={{ textAlign: 'center', marginBottom: 10 }}>支付金額</p>

              <ul
                className={`border-ddsecondary ${styles['order-total-count']}`}
              >
                <li>商品總計</li>
                <li style={{ fontWeight: 'bold' }}>
                  ${cart.totalPrice.toLocaleString()}
                </li>
              </ul>

              <ul
                className={`border-ddsecondary ${styles['order-total-count']}`}
              >
                <li>運費</li>
                <li>${shippingFee}</li>
              </ul>
              <ul
                className={`border-ddsecondary ${styles['order-total-count']}`}
              >
                <li>優惠券折抵</li>
                <li style={{ color: 'rgb(224, 24, 24)', fontWeight: 'bold' }}>
                  {orderCoupon.selectedTitle ? -orderCoupon.selectedTitle : 0}
                </li>
              </ul>
              <ul
                className={`border-ddsecondary ${styles['order-total-count']}`}
              >
                <li>訂單總價</li>
                <li style={{ fontWeight: 'bold' }} className="text-price">
                  ${calculatedTotalPrice.toLocaleString()}
                </li>
              </ul>

              <OrderConfirmBtn
                calculatedTotalPrice={calculatedTotalPrice}
                paymentMethod={paymentMethod}
                memberEmail={email}
                userName={userName}
              />
            </div>
          </div>
        </section>
      </div>

      <style jsx>
        {`
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
