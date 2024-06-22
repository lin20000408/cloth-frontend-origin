import { useState,useEffect} from 'react'
import styles from '@/styles/cart/cart.module.css'
import { FaStar } from 'react-icons/fa'
import Slide from '@/components/cart/slide'
import InputDataList from '@/components/cart/input-data-list'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart-state'
import 'animate.css'
export default function Cart() {
  const {
    cart,
    items,
    removeItem,
    updateItemQty,
  } = useCart()

 

  const [dataFromInput, setDataFromInput] = useState('')
  const [itemId, setItemId] = useState('')


  return (
    <>
      <div className="container animate__animated animate__fadeInDown mt-5">
        <div className={styles['title']}>
          <p>購物車</p>
        </div>
        <section className={styles['cart-session1']}>
          {items.length > 0 ? (
            <>
              <div className={styles['part-left']}>
                <table className="table table-bordered cart-table border-ddsecondary">
                  <thead className="table-ddprimary">
                    <tr className="mx-auto">
                      <th
                        scope="col"
                        className="col-4 fw-bold fs-6 text-white text-center"
                      >
                        商品名稱
                      </th>
                      <th
                        scope="col"
                        className="col-2 fw-bold fs-6 text-white text-center"
                      >
                        數量
                      </th>
                      <th
                        scope="col"
                        className="col-1 fw-bold fs-6 text-white text-center"
                      >
                        單價
                      </th>
                      <th
                        scope="col"
                        className="col-1 fw-bold fs-6 text-white text-center"
                      >
                        總價
                      </th>
                      <th
                        scope="col"
                        className="col-2 fw-bold fs-6 text-white text-center"
                      />
                    </tr>
                  </thead>
                  <tbody className={`${styles['products-info']}`}>
                    {items.map((v, i) => (
                      <tr key={`${v.pid}-${v.size}`}>
                        <th scope="row" className={styles['product-info']}>
                          <img
                            src={v.img}
                            style={{ width: '100px', height: '100px' }}
                          />
                          <div className={styles['product-name']}>
                            <p
                              style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '200px', // 設定合適的寬度
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
                        <td>
                          <InputDataList
                            quantity={v.quantity}
                            setDataFromInput={(newQty) =>
                              updateItemQty(v.id, v.size, v.pid, newQty)
                            }
                          />
                        </td>
                        <td>{v.price.toLocaleString()}</td>
                        <td>{v.subtotal.toLocaleString()}</td>
                        <td
                          style={{ fontSize: 14 }}
                          className="text-ddsecondary"
                        >
                          <button
                            className={styles['productRow-button']}
                            onClick={() => {
                              removeItem(v.pid, v.size, v.id)
                              console.log('id', v.id, 'pid', v.pid)
                            }}
                          >
                            刪除
                          </button>
                          <hr
                            style={{ border: '1.5px solid' }}
                            className="text-dark"
                          />
                          <button className={styles['productRow-button']}>
                            稍後購買
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles['part-right']}>
                <ul
                  className={`border-ddsecondary ${styles['part-right-count']}`}
                >
                  <li>數量</li>
                  <li>{cart.totalItems}</li>
                </ul>
                <ul
                  className={`border-ddsecondary ${styles['part-right-count']}`}
                >
                  <li>商品總計</li>
                  <li style={{ fontWeight: 'bold' }} className="text-price">
                    ${cart.totalPrice.toLocaleString()}
                  </li>
                </ul>
                <p className={styles['keep-ordering-font']}>繼續訂購流程</p>
                <button
                  type="submit"
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                >
                  <span>
                    <a className="text-reset" href="../order/order">
                      前往付款頁面
                    </a>
                  </span>
                </button>
              </div>
            </>
          ) : (
            <p>購物車裡面沒有商品</p>
          )}
        </section>
        <section className={styles['cart-session2']}>
          <h3>運費規則</h3>
          <div>
            <p>
              <FaStar />滿<span className="fw-bold text-price">5000</span>
              折抵運費
            </p>
            <p>
              <FaStar />
              根據運送方式運費有所不同
            </p>
          </div>
        </section>
        <section className={styles['cart-session3']}>
          <h3>如何使用購物車</h3>
          <p>不保證您購物車中的商品有貨。</p>
          <p>
            購物車資訊會儲存一段時間。
            <br />
            當您以會員身分登入時，您可以在PC、平板電腦、智慧型手機等裝置上分享購物車中的商品。
          </p>
          <p>
            您可以使用「稍後購買」連結將購物車中的商品加入您的收藏清單。
            <br />
            您可以將收藏清單中的商品直接加入購物車（不包括缺貨/停產商品和部分商品）。
          </p>
        </section>
        <Link
          className={`btn btn-outline-dark ${styles['keep-buying']}`}
          href="#"
          role="button"
        >
          繼續購物
        </Link>
      </div>
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
