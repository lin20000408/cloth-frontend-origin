import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { Tooltip, ConfigProvider } from 'antd'
import styles from '@/styles/colorology/colorology.module.css'
import NofooterLayout from '@/components/layout/nofooter-layout'
import { useLoader } from '@/hooks/use-loader'
import ColorologyCouponModal from '@/components/colorology/colorology-coupon-modal'
import ColorologyJumpPageModal from '@/components/colorology/colorology-jumpPage-modal'
import ColorologyBackground from '@/components/colorology/colorology-background'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function Colorology() {
  // 自訂控制開關載入動畫
  // 要手動控制關閉，Context要給參數close={0} `<LoaderProvider close={0}>`
  // showLoader是開載入動畫函式，hideLoader為關動畫函式(手動控制關閉才有用)
  const { showLoader, hideLoader, loading, delay } = useLoader()
  // currentQuestion: 用於跟蹤當前顯示的問題的索引。初始值為 0，表示初始時顯示第一個問題。
  const [currentQuestion, setCurrentQuestion] = useState(0)
  // buttonDisabled: 用於控制「下一題」按鈕的禁用狀態。初始值為 true，表示初始時「下一題」按鈕是禁用的。
  const [buttonDisabled, setButtonDisabled] = useState(true)
  // 跳到色彩學結果模擬框。初始值為 false，表示初始時模態框是隱藏的。
  const [showJumpPageModal, setShowJumpPageModal] = useState(false)
  // 優惠劵模擬框。初始值為 false，表示初始時模態框是隱藏的。
  const [showCouponModal, setShowCouponModal] = useState(false)
  // selectedOptions: 用於跟蹤使用者選擇的所有選項。它是一個陣列，初始時填充了 8 個 null 元素，表示初始時使用者還沒有做出任何選擇。陣列的每個元素代表一個問題對應的選擇，對應的值是選項的值，例如 'a'、'b' 等。
  const [selectedOptions, setSelectedOptions] = useState(Array(8).fill(null))
  // 優惠劵
  const [couponData, setCouponData] = useState([])
  // 抓取後端json
  const { colorologyData, updateColorologyData } = useBackEndData({
    id: 0,
    judge: '',
    basic_color_upper_body_1: '',
    basic_color_upper_body_2: '',
    basic_color_upper_body_3: '',
    basic_color_lower_body_1: '',
    basic_color_lower_body_2: '',
    basic_color_lower_body_3: '',
    bright_color_upper_body_1: '',
    bright_color_upper_body_2: '',
    bright_color_lower_body_1: '',
    bright_color_lower_body_2: '',
    basic_color_upper_body_text_1: '',
    basic_color_upper_body_text_2: '',
    basic_color_upper_body_text_3: '',
    basic_color_lower_body_text_1: '',
    basic_color_lower_body_text_2: '',
    basic_color_lower_body_text_3: '',
    bright_color_upper_body_text_1: '',
    bright_color_upper_body_text_2: '',
    bright_color_lower_body_text_1: '',
    bright_color_lower_body_text_2: '',
    text1: '',
    text2: '',
    text3_1: '',
    text3_2: '',
    text3_3: '',
  })
  // 檢查 colorologyData 是否有抓到後端json
  // console.log('colorologyData-外面:', colorologyData)

  const questions = [
    {
      title: 'Q1.眼睛瞳孔的顏色是？',
      options: [
        '明亮的茶色。',
        '紅棕色或焦茶色。',
        '深棕色。',
        '黑色或帶紅的深棕色。',
      ],
    },
    {
      title: 'Q2.常被周圍的人提及的第一印象是？',
      options: [
        '看起來比年齡年輕、可愛、好親近。',
        '溫柔、清新、優雅。',
        '沉穩、成熟、絢爛、自然。',
        '銳利、酷、華麗、印象深刻。',
      ],
    },
    {
      title: 'Q3.臉頰的膚色和膚質是？',
      options: [
        '偏亮黃的蜜桃色，光澤肌。',
        '柔和偏亮的粉色系，微微霧面肌。',
        '偏暗黃的蜜桃色，霧面肌。',
        '紅紫色或無色調，不容易有血色，光澤肌。',
      ],
    },
    {
      title: 'Q4.原來的唇色是？',
      options: [
        '明亮偏淡的鮭魚粉，有透明感。',
        '粉紅色、玫瑰色系，顏色較模糊。',
        '沉穩的橘色或米色，較少有血色。',
        '玫瑰色系，無血色，有時看起來蒼白。',
      ],
    },
    {
      title: 'Q5.曬太陽的話會如何？',
      options: [
        '容易曬成小麥色，但顏色恢復得也很快。',
        '不容易曬黑，但很容易泛紅。',
        '容易曬成小麥色或曬黑，曬後顏色不容易恢復。',
        '曬紅之後變黑，顏色會慢慢恢復。',
      ],
    },
    {
      title: 'Q6.適合你的飾品是哪一種？',
      options: [
        '有光澤的明亮金色。',
        '光澤感較少的霧銀色。',
        '無光澤感、黃色調較強烈的霧面金色。',
        '有光澤的亮銀色。',
      ],
    },
    {
      title: 'Q7.頭髮天生的顏色和髮質是？',
      options: [
        '髮色偏明亮的棕色，髮質偏細而柔軟。',
        '髮色偏紅棕或灰黑，髮質偏細而柔順。',
        '髮色偏焦茶色，有重量感。',
        '髮色偏純黑色，髮質偏粗且髮量較多。',
      ],
    },
  ]

  useEffect(() => {
    // 載入動畫
    showLoader()
    // 初始選項
    setSelectedOptions(Array(8).fill(null))
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

  const handleNextButtonClick = async () => {
    // 檢查是否還有下一個問題需要回答
    // 如果當前問題的索引小於問題數量減 1
    if (currentQuestion < questions.length - 1) {
      // 如果還有下一個問題，將當前問題的索引加 1
      setCurrentQuestion(currentQuestion + 1)

      // 設置按鈕為禁用狀態
      setButtonDisabled(true)
    } else {
      // 是最後一題，檢查是否有當月的色彩學優惠劵
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
      const hasCurrentMonthColorCoupon = couponData.some(
        (coupon) =>
          coupon.name.includes(currentYearMonth) &&
          coupon.name.includes('色彩學')
      )

      // 計算選項中出現次數最多的選項
      const calculateMostFrequentOption = () => {
        // 初始化一個物件用於統計每個選項出現的次數
        const optionCounts = {
          a: 0,
          b: 0,
          c: 0,
          d: 0,
        }

        // 遍歷已選擇的選項列表，統計每個選項出現的次數
        selectedOptions.forEach((option) => {
          if (option !== null) {
            optionCounts[option]++
          }
        })

        // 找出出現次數最多的選項
        let mostFrequentOption = 'a'
        let maxCount = optionCounts['a']
        for (const option in optionCounts) {
          if (optionCounts[option] > maxCount) {
            mostFrequentOption = option
            maxCount = optionCounts[option]
          }
        }

        return mostFrequentOption
      }

      // 獲取出現次數最多的選項
      const mostFrequentOption = calculateMostFrequentOption()

      // 根據出現次數最多的選項確定 fetch 路徑的最後一部分
      let fetchPathSuffix = ''
      switch (mostFrequentOption) {
        case 'a':
          fetchPathSuffix = '1'
          break
        case 'b':
          fetchPathSuffix = '2'
          break
        case 'c':
          fetchPathSuffix = '3'
          break
        case 'd':
          fetchPathSuffix = '4'
          break
        default:
          fetchPathSuffix = '1' // 默認為 'a'
      }

      // 從資料庫取結果
      // 在 fetch 路徑中使用 fetchPathSuffix
      const fetchPath = `http://localhost:3005/api/colorology-checklist/${fetchPathSuffix}`

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
          updateColorologyData(responseData) //後端json可以傳給下一頁
          // console.log('從後端接收到的數據：', responseData) // 在控制台console.log接收到的數據
          console.log('responseData資料獲取成功')

          // 提取出ID字段的數值
          const responseDataId = responseData.data.colorology_checklist.id
          // console.log('從後端接收到的數據id：', responseDataId) // 在控制台console.log接收到的數據

          // // 從context的userIdData中取出user.id資料
          // const userId = userIdData
          // console.log('userId:', userIdData) //查詢是否有抓到id

          // 從localStorage的userIdLocalStorage中取出user.id資料
          const userIdLocalStorage = JSON.parse(
            localStorage.getItem('userIdLocalStorage')
          )

          // 更新資料庫
          const databaseResponse = await fetch(
            `http://localhost:3005/api/colorology-result/${userIdLocalStorage}`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: responseDataId }), // 假設 responseData 包含了更新後的資料
            }
          )

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

      // 如果有當月的優惠劵，就跳轉到色彩學結果頁面
      if (hasCurrentMonthColorCoupon) {
        // 打開跳到色彩學結果模擬框
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

        const dateName = `${currentYear}年${currentMonthString}月色彩學`

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
  }

  // 修改 handleOptionChange 函式來更新選擇的選項
  const handleOptionChange = (option, questionIndex) => {
    // 複製一份目前已選擇的選項
    const newSelectedOptions = [...selectedOptions]
    // 將選項轉換為 abcd 的形式
    const optionMapping = ['a', 'b', 'c', 'd']
    // 獲取所選擇的選項在選項列表中的索引
    const selectedOptionIndex = questions[questionIndex].options.indexOf(option)
    // 將所選擇的選項轉換為 abcd 形式
    const selectedOptionAbcd = optionMapping[selectedOptionIndex]
    // 更新新的選擇選項列表
    newSelectedOptions[questionIndex] = selectedOptionAbcd
    // 設置按鈕為啟用狀態
    setButtonDisabled(false)
    // 更新所選擇的選項列表
    setSelectedOptions(newSelectedOptions)
  }

  // 上一題按鈕
  const handlePreviousButtonClick = () => {
    // 如果不是第一題
    if (currentQuestion > 0) {
      // 將當前問題的索引減 1
      setCurrentQuestion(currentQuestion - 1)
      // 在返回上一題時，啟用按鈕
      setButtonDisabled(false) // 返回上一題時啟用按鈕
    }
  }

  return (
    <>
      {/* 背景動畫 */}
      <ColorologyBackground />

      <div
        className={`${styles['colorology']} container d-flex flex-wrap justify-content-center`}
      >
        <main className="d-flex flex-column">
          <h1 className="text-center text-white">色彩學</h1>
          <div className={styles['popup']}>
            {questions.map((question, index) => (
              <div
                key={index}
                className={`${styles['popup__content']} ${
                  index === currentQuestion ? styles['question-visible'] : ''
                } ${styles['buttonRendering']}`}
              >
                {/* 進度條 */}
                <div className={styles['popup__progress']}>
                  {questions.map((_, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`${styles['popup__progress-item']} ${
                          index === currentQuestion
                            ? styles['popup__progress-item_active']
                            : ''
                        }`}
                      >
                        {index < currentQuestion ? '\u2713' : index + 1}
                      </div>
                      {index !== questions.length - 1 && (
                        <div className={styles['popup__progress-line']} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* 題目 */}
                <div className={styles['quiz']}>
                  {/* 上一題 */}
                  <div className={styles['previousQuestion']}>
                    <ConfigProvider
                      theme={{
                        token: {
                          fontFamily: 'IBM Plex Sans TC',
                        },
                        components: {
                          Tooltip: {
                            colorTextLightSolid: '#000000',
                          },
                        },
                      }}
                    >
                      {currentQuestion > 0 && (
                        <Tooltip
                          title="上一題"
                          color="#abc8bc"
                          placement="left"
                        >
                          <FontAwesomeIcon
                            icon={faCircleLeft}
                            size="2xl"
                            style={{ color: '#abc8bc', cursor: 'pointer' }}
                            onClick={handlePreviousButtonClick}
                            className={styles['previousQuestion-icon']}
                          />
                        </Tooltip>
                      )}
                    </ConfigProvider>

                    {/* 題目標題 */}
                    <h3 className={`${styles['quiz__question']} mb-4`}>
                      {question.title}
                    </h3>
                  </div>

                  <div className={styles['quiz__answers']}>
                    <div className={styles['options']}>
                      {question.options.map((option, i) => (
                        <div
                          key={i}
                          className="d-flex align-items-baseline mb-2"
                        >
                          <input
                            type="radio"
                            id={`option${index}_${i + 1}`}
                            className={`${styles['option']} ${styles['form-check-input']} form-check-input me-1`}
                            name={`Q${index + 1}`}
                            value={option}
                            onChange={() => handleOptionChange(option, index)}
                          />
                          <label htmlFor={`option${index}_${i + 1}`}>
                            {option}
                          </label>
                          <br />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  className={styles['popup__button']}
                  onClick={handleNextButtonClick}
                  disabled={buttonDisabled}
                >
                  {currentQuestion === questions.length - 1
                    ? '送 出'
                    : '下一題'}
                </button>
              </div>
            ))}
          </div>

          {/* 測試有沒有抓到值 */}
          {/* <pre>{JSON.stringify(selectedOptions, null, 2)}</pre> */}

          {/* Modal */}
          {/* 優惠劵模擬框 */}
          <ColorologyCouponModal
            visible={showCouponModal}
            handleCancel={() => setShowCouponModal(false)}
          />
          {/* 跳到塔羅牌結果模擬框 */}
          <ColorologyJumpPageModal
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
Colorology.getLayout = function (page) {
  return <NofooterLayout>{page}</NofooterLayout>
}
