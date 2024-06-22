import { useState, useEffect } from 'react'
import { laodprs } from '@/services/product'
import Image from 'next/image'
import styles from '@/components/indexComponents/hotCard/indexHotCard.module.css'
import { Card } from 'antd'
import Link from 'next/link'
import Aos from 'aos'
import 'aos/dist/aos.css'
const { Meta } = Card

export default function MinCard() {
  useEffect(()=>{
    Aos.init({duration: 2000})
  },[])
  const [hotp, setHotp] = useState([]) //1 熱門商品
 const cardProductHrefs = ['/product-list/110611', '/product-list/110612', '/product-list/110711','/product-list/110712','/product-list/110811']; // 示例链接数组

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await laodprs({ hotp }) // 使用 hotp 作为参数传递给 laodprs
        
        const updatedHotp = data.products.map((item, index) => ({
          ...item,
          href: cardProductHrefs[index % cardProductHrefs.length] // 根据索引添加不同的 href
        }));
        setHotp(updatedHotp);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData() // 调用异步函数
  }, []) // hotp 作为依赖项传递给 useEffect

  return (
    <>
      {hotp.slice(2, 5).map((item, index) => (
        <div key={index} className={`${styles['bottomcard']} bg-ddprimary`} data-aos = 'fade-up-right'>
          <Link href={item.href} style={{color:'black',textDecoration:'none'}}>
          <div className={styles['image-container']}>
            <Image
              src={item.ph1}
              alt="..."
              layout="fill"
              objectFit="cover"
              className={styles['card-img-top']}
            />
            <div className={styles['ranking']}>
              <p>No.</p>
              <br />
              <span>0{index + 3}</span>
            </div>
          </div>
          <div
            className={`d-flex flex-column justify-content-center card-body ${styles['hotcard-body']} `}
          >
            <div
              className={`d-flex flex-column justify-content-center align-items-center ${styles['pr-midden']} `}
            >
              <div className={styles['pr-min-img']}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  {/* 這裡是小圖 */}
                  {/* <Image
                    src={item.ph2}
                    alt="..."
                    layout="fill"
                    objectFit="cover"
                    // className={styles['card-img-top']}
                  /> */}
                </div>
              </div>
              <div
                className={` ${styles['pr-min-text']} d-flex flex-column w-75`}
              >
                <div className={`${styles['name-max']}`}>
                  <h2 className={styles['description4']}>Fariry</h2>
                  <h2 className={styles['description5']}>Stylish</h2>
                </div>
              </div>
            </div>
            <div className={` ${styles['more-block']}  d-block w-100`}>
              <span className={styles['description6']}>
                {item.product_name}
              </span>
              <button
                type="button"
                className={`btn ${styles['pr-more-bt-min']} `}
              ></button>
            </div>
          </div>
          </Link>
        </div>
      ))}
    </>
  )
}
