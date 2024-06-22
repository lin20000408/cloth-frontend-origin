import React, { useEffect, useState } from 'react'
import styles from '@/styles/tarot/tarot-result.module.css'
import NofooterLayout from '@/components/layout/nofooter-layout'
import { useLoader } from '@/hooks/use-loader'
import TarotBackground from '@/components/tarot/tarot-background'
import Link from 'next/link'
// import data from '@/data/Tarot' //模擬後端json
// 引入use-backEnd-catchData
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function TarotResult() {
  // 自訂控制開關載入動畫
  // 要手動控制關閉，Context要給參數close={0} `<LoaderProvider close={0}>`
  // showLoader是開載入動畫函式，hideLoader為關動畫函式(手動控制關閉才有用)
  const { showLoader, hideLoader, loading, delay } = useLoader()
  const [cardResult, setCardResult] = useState(null)
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
    products_id_2: '',
    products_name_2: '',
    product_photos_id_2: '',
    product_photos_img_2: '',
  })

  useEffect(() => {
    // 載入動畫
    showLoader()
    // 從資料庫抓取塔羅牌資料
    fetchData()
  }, [])

  async function fetchData() {
    // 檢查是否有shareData
    if (shareData) {
      // 從shareData中取出tarot資料
      const card = shareData.data.tarot_checklist

      // console.log('card-id:', card.id) //查詢是否有抓到id

      // // 將card資料保存到 localStorage 中
      // localStorage.setItem('cardResult', JSON.stringify(card))

      // 設定cardResult狀態為從card中取出的資料
      setCardResult(card)
    } else {
      // // 如果沒有從後端獲取到資料，嘗試從 localStorage 中讀取

      // // 從localStorage中讀取先前儲存的cardResult資料
      // const storedCardResult = localStorage.getItem('cardResult')
      // // 如果在localStorage中找到了儲存的cardResult資料
      // if (storedCardResult) {
      //   setCardResult(JSON.parse(storedCardResult))
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
          const card = responseData.data.tarot_checklist
          // console.log('card:', card) //查詢是否有抓到資料

          // 設定cardResult狀態為從card中取出的資料
          setCardResult(card)
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
        className={`${styles['tarot-result']} container d-flex flex-wrap justify-content-center`}
      >
        <main className="d-flex flex-column">
          {cardResult && (
            <div
              className={`${styles['tarotContent']} d-flex flex-column align-items-center`}
            >
              <h2 className="text-center text-white fw-bold mb-5">
                你抽取的卡牌是
              </h2>
              <img src={cardResult.img} alt="" className="mb-5" />
              <div
                className={`${styles['textContent']} text-white d-flex flex-column mb-5`}
              >
                <p>{cardResult.text1}</p>
                <br />
                <p>{cardResult.text2}</p>
              </div>
              <button
                className={`${styles['custom-btn']} ${styles['btn-7']} ${styles['btn-11']}`}
              >
                <Link href="tarot-recommend">
                  <span>前往推薦穿搭頁面</span>
                </Link>
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

// 這裡代表要套用NofooterLayout，取代原本的DefaultLayout
// 要寫在元件的函式之外
TarotResult.getLayout = function (page) {
  return <NofooterLayout>{page}</NofooterLayout>
}
