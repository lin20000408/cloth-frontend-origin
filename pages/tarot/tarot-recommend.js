import React, { useEffect, useState } from 'react'
import styles from '@/styles/tarot/tarot-recommend.module.css'
import NofooterLayout from '@/components/layout/nofooter-layout'
import TarotBackground from '@/components/tarot/tarot-background'
import Link from 'next/link'
// import data from '@/data/Tarot' //模擬後端json
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function TarotRecommend() {
  const [productResult, setProductResult] = useState()
  // 抓取後端json
  const { shareData } = useBackEndData({
    id: 0,
    img: '',
    text1: '',
    text2: '',
    products_id_1: '',
    products_name_1: '',
    product_photos_id_1: '',
    product_photos_img_1: '',
    products_url_1: '',
    products_id_2: '',
    products_name_2: '',
    product_photos_id_2: '',
    product_photos_img_2: '',
    products_url_2: '',
  })

  useEffect(() => {
    // 從資料庫抓取塔羅牌資料
    fetchData()
  }, [])

  const fetchData = async () => {
    // 檢查是否有shareData
    if (shareData) {
      // 從shareData中取出tarot資料
      const product = shareData.data.tarot_checklist

      // console.log('product-id:', product.id) //查詢是否有抓到id

      // // 將product資料保存到 localStorage 中
      // localStorage.setItem('productResult', JSON.stringify(product))

      // 設定productResult狀態為從product中取出的資料
      setProductResult(product)
    } else {
      // // 如果沒有從後端獲取到資料，嘗試從 localStorage 中讀取

      // // 從localStorage中讀取先前儲存的productResult資料
      // const storedProductResult = localStorage.getItem('productResult')
      // // 如果在localStorage中找到了儲存的productResult資料
      // if (storedProductResult) {
      //   setProductResult(JSON.parse(storedProductResult))
      // }

      // 從localStorage的userIdLocalStorage中取出user.id資料
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      )

      // 在 fetch 路徑中使用 fetchPathSuffix
      const fetchPath = `http://localhost:3005/api/tarot-result/${userIdLocalStorage}`

      // 發送 fetch 請求
      try {
        const response = await fetch(fetchPath, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const responseData = await response.json() // 解析數據
        // 處理響應
        if (responseData.status === 'success') {
          // console.log('從後端接收到的數據：', responseData) // 在控制台console.log接收到的數據
          // 從responseData中取出tarot_checklist資料
          const product = responseData.data.tarot_checklist
          // console.log('card:', card) //查詢是否有抓到資料

          // 設定productResult狀態為從product中取出的資料
          setProductResult(product)
        } else {
          console.warn('請求失敗')
        }
      } catch (error) {
        console.error('發送請求時出錯：', error)
      }
    }
  }

  return (
    <>
      {/* 背景動畫 */}
      <TarotBackground />

      <div
        className={`${styles['tarot-recommend']} container d-flex flex-wrap justify-content-center`}
      >
        <main className="d-flex flex-column">
          {productResult && (
            <div
              className={`${styles['tarotContent']} d-flex flex-column align-items-center`}
            >
              <h2 className="text-center fw-bold mb-5 text-white">
                推薦您適合的穿搭風格
              </h2>
              <div className={styles['imgs']}>
                <div className={styles['img1']}>
                  <Link href={productResult.products_url_1}>
                    <img
                      src={productResult.product_photos_img_1}
                      alt=""
                      className="mb-3"
                    />
                  </Link>
                  <p className="text-center text-white">
                    <Link href={productResult.products_url_1}>
                      服飾名稱 : {productResult.products_name_1}
                    </Link>
                  </p>
                </div>
                <div className={styles['img2']}>
                  <Link href={productResult.products_url_2}>
                    <img
                      src={productResult.product_photos_img_2}
                      alt=""
                      className="mb-3"
                    />
                  </Link>
                  <p className="text-center text-white">
                    <Link href={productResult.products_url_2}>
                      服飾名稱 : {productResult.products_name_2}
                    </Link>
                  </p>
                </div>
              </div>
              <div className={`${styles['buttons']} w-100`}>
                <button
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                >
                  <Link href="../member/edit-personal-data">
                    {' '}
                    <span>會員中心</span>{' '}
                  </Link>
                </button>
                <button
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                >
                  <Link href="./">
                    {' '}
                    <span>重新抽卡</span>{' '}
                  </Link>
                </button>
                <button
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                >
                  <Link href="../">
                    {' '}
                    <span>首頁</span>{' '}
                  </Link>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

// 這裡代表要套用NofooterLayout，取代原本的DefaultLayout
// 要寫在元件的函式之外
TarotRecommend.getLayout = function (page) {
  return <NofooterLayout>{page}</NofooterLayout>
}
