import { useState, useEffect } from 'react'
import styles from '@/styles/tarot/tarot-drawCards.module.css'
import NofooterLayout from '@/components/layout/nofooter-layout'
import TarotCouponModal from '@/components/tarot/tarot-coupon-modal'
import TarotJumpPageModal from '@/components/tarot/tarot-jumpPage-modal'
import TarotBackground from '@/components/tarot/tarot-background'
import Link from 'next/link'
// 引入use-backEnd-catchData
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function TarotDrawCards() {
  // 跳到塔羅牌結果模擬框。初始值為 false，表示初始時模態框是隱藏的。
  const [showJumpPageModal, setShowJumpPageModal] = useState(false)
  // 優惠劵模擬框。初始值為 false，表示初始時模態框是隱藏的。
  const [showCouponModal, setShowCouponModal] = useState(false)
  // 在後台生成 1 到 22 的序列
  const cardSequence = Array.from({ length: 22 }, (_, index) => index + 1)
  // 優惠劵
  const [couponData, setCouponData] = useState([])
  // 抓取後端json
  const { shareData, updateSharData } = useBackEndData({
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

  // 檢查 tarotData 是否有抓到後端json
  // console.log('tarotData-外面:', tarotData)

  useEffect(() => {
    // 從資料庫抓取優惠劵資料
    fetchCouponData()
  }, [])

  const fetchCouponData = async () => {
    // // 從context的userIdData中取出user.id資料
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/coupon-send-management/${userIdLocalStorage}`,
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
        const couponSendManagementData =
          responseData.data.coupon_send_management
        setCouponData(couponSendManagementData)
        // console.log('從後端接收到的數據：', responseData) // 在控制台console.log接收到的數據
        // console.log('從後端接收到的數據：', couponSendManagementData) // 在控制台console.log接收到的數據
      } else {
        console.warn('請求失敗')
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
    }
  }

  const handleCardClick = async (cardNumber) => {
    // 取得當前日期
    const currentDate = new Date()
    // 取得當前年份
    const currentYear = currentDate.getFullYear()
    // 取得當前月份，注意 JavaScript 中月份是從 0 開始計算的，因此要加 1
    const currentMonth = currentDate.getMonth() + 1
    // 將月份轉換為兩位數的字串表示，如果月份小於 10，則在前面補 0
    const currentMonthString =
      currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`
    // 組合年份和月份形成 YYYY-MM 的格式，代表當前的年月
    const currentYearMonth = `${currentYear}年${currentMonthString}月`

    // console.log('日期', currentYearMonth)

    // 檢查優惠劵列表中是否有當月的優惠劵
    const hasCurrentMonthTarotCoupon = couponData.some(
      (coupon) =>
        coupon.name.includes(currentYearMonth) && coupon.name.includes('塔羅牌')
    )

    // 從資料庫取結果
    // 在 fetch 路徑中使用 cardNumber
    const fetchPath = `http://localhost:3005/api/tarot-checklist/${cardNumber}`

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
        updateSharData(responseData) //後端json可以傳給下一頁
        // console.log('從後端接收到的數據：', responseData) // 在控制台console.log接收到的數據

        // 提取出ID字段的數值
        const responseDataId = responseData.data.tarot_checklist.id
        // console.log('從後端接收到的數據id：', responseDataId) // 在控制台console.log接收到的數據

        // 從localStorage的userIdLocalStorage中取出user.id資料
        const userIdLocalStorage = JSON.parse(
          localStorage.getItem('userIdLocalStorage')
        )

        // 更新資料庫
        const databaseResponse = await fetch(
          `http://localhost:3005/api/tarot-result/${userIdLocalStorage}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: responseDataId }), // 假設 responseData 包含了更新後的資料
          }
        )
        // console.log('從後端接收到的數據body：', databaseResponse.body) // 在控制台console.log接收到的數據

        const databaseResponseData = await databaseResponse.json() // 解析數據
        // 處理響應
        if (databaseResponseData.status === 'success') {
          console.log('資料庫更新成功', databaseResponseData)
        } else {
          console.error('資料庫更新失敗', databaseResponseData)
        }
      } else {
        console.warn('請求失敗')
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
    }

    // 如果有當月的優惠劵
    if (hasCurrentMonthTarotCoupon) {
      // 打開跳到塔羅牌結果模擬框
      setShowJumpPageModal(true)
      setShowCouponModal(false)
    } else {
      // 沒有當月的優惠劵
      // 打開優惠劵模擬框
      setShowJumpPageModal(false)
      setShowCouponModal(true)

      // 從localStorage的userIdLocalStorage中取出user.id資料
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      )

      const dateName = `${currentYear}年${currentMonthString}月塔羅牌`

      // 發送優惠劵
      const addCoupon = async () => {
        try {
          const response = await fetch(
            `http://localhost:3005/api/coupon-send-management/${userIdLocalStorage}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                dateName,
              }),
            }
          )

          const data = await response.json() // 解析數據
          // 處理響應
          if (data.status === 'success') {
            console.log('優惠劵已成功新增到後端', data)
          } else {
            console.error('優惠劵新增到後端失敗', data)
          }
        } catch (error) {
          console.error('新增優惠劵到後端時出現錯誤:', error)
        }
      }
      addCoupon()
    }
  }

  return (
    <>
      {/* 背景動畫 */}
      <TarotBackground />

      <div
        className={`${styles['tarot-drawCards']} ${styles['container']} container d-flex flex-wrap justify-content-center`}
      >
        <main className="w-100">
          <div
            className={`${styles['tarotContent']} d-flex justify-content-center`}
          >
            <div className={styles['tarots']}>
              {cardSequence.map((cardNumber) => (
                <Link
                  key={cardNumber}
                  href="#"
                  onClick={() => handleCardClick(cardNumber)}
                  className={styles['tarot']}
                >
                  <img src={`../images/tarot/tarots.jpg`} alt="" />
                </Link>
              ))}
            </div>

            <h2 className={`${styles['textContent']} text-white fw-bold`}>
              請抽一張牌
            </h2>
          </div>

          {/* Modal */}
          {/* 優惠劵模擬框 */}
          <TarotCouponModal
            visible={showCouponModal}
            handleCancel={() => setShowCouponModal(false)}
          />
          {/* 跳到塔羅牌結果模擬框 */}
          <TarotJumpPageModal
            visible={showJumpPageModal}
            handleCancel={() => setShowJumpPageModal(false)}
          />
        </main>
      </div>
    </>
  )
}

// 這裡代表要套用NofooterLayout，取代原本的DefaultLayout
// 要寫在元件的函式之外
TarotDrawCards.getLayout = function (page) {
  return <NofooterLayout>{page}</NofooterLayout>
}
