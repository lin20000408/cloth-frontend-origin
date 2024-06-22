import { useEffect, useState } from 'react'
import styles from '@/styles/colorology/colorology-result.module.css'
import NofooterLayout from '@/components/layout/nofooter-layout'
import { useLoader } from '@/hooks/use-loader'
import ColorologyBackground from '@/components/colorology/colorology-background'
import { Tooltip, ConfigProvider } from 'antd'
import Link from 'next/link'
// import colorologyData from '@/data/Colorology' //模擬後端json
// import colorTextData from '@/data/Colorology_Color_Text' //模擬後端json
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

// 函式用來根據 colorology.id 返回相應的背景顏色
function getColorologyBackgroundColor(id) {
  if (id === 1 || id === 3) {
    return '#fff9f2'
  } else if (id === 2 || id === 4) {
    return '#f2f6ff'
  } else {
    return '#ffffff' // 預設值
  }
}

export default function ColorologyResult() {
  // 自訂控制開關載入動畫
  // 要手動控制關閉，Context要給參數close={0} `<LoaderProvider close={0}>`
  // showLoader是開載入動畫函式，hideLoader為關動畫函式(手動控制關閉才有用)
  const { showLoader, hideLoader, loading, delay } = useLoader()
  const [colorologyResult, setColorologyResult] = useState({})
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  // 上一頁傳來的後端json
  const { colorologyData } = useBackEndData({
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

  // console.log('colorologyData-外面:', colorologyData) //查詢是否有上一頁傳來的後端json

  useEffect(() => {
    // 載入動畫
    showLoader()
    // 從資料庫抓取色彩學資料
    fetchData()
  }, [])

  const fetchData = async () => {
    // 檢查是否有colorologyData
    if (colorologyData) {
      // 從colorologyData中取出colorology_checklist資料
      const colorology = colorologyData.data.colorology_checklist

      // console.log('colorology-id:', colorology.id) //查詢是否有抓到id

      // 設定colorologyResult狀態為從colorology中取出的資料
      setColorologyResult(colorology)

      // 設定背景顏色為根據colorology.id計算的值
      setBackgroundColor(getColorologyBackgroundColor(colorology.id))

      // // 將colorology跟背景顏色資料保存到 localStorage 中
      // localStorage.setItem('colorologyResult', JSON.stringify(colorology))
      // localStorage.setItem(
      //   'backgroundColor',
      //   getColorologyBackgroundColor(colorology.id)
      // )
    } else {
      // // 如果沒有從後端獲取到資料，嘗試從 localStorage 中讀取

      // // 從localStorage中讀取先前儲存的colorologyResult資料
      // const storedColorologyResult = localStorage.getItem('colorologyResult')
      // // 如果在localStorage中找到了儲存的colorologyResult資料
      // if (storedColorologyResult) {
      //   setColorologyResult(JSON.parse(storedColorologyResult))
      // }
      // // 從localStorage中讀取先前儲存的backgroundColor資料
      // const storedBackgroundColor = localStorage.getItem('backgroundColor')
      // // 如果在localStorage中找到了儲存的backgroundColor資料
      // if (storedBackgroundColor) {
      //   setBackgroundColor(storedBackgroundColor)
      // }

      // 從localStorage的userIdLocalStorage中取出user.id資料
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      )

      // 從資料庫取結果
      // 在 fetch 路徑中使用 fetchPathSuffix
      const fetchPath = `http://localhost:3005/api/colorology-result/${userIdLocalStorage}`

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

          // 從responseData中取出colorology_checklist資料
          const colorology = responseData.data.colorology_checklist
          // console.log('colorology:', colorology) //查詢是否有抓到資料

          // 設定colorologyResult狀態為從colorology中取出的資料
          setColorologyResult(colorology)

          // 設定背景顏色為根據colorology.id計算的值
          setBackgroundColor(getColorologyBackgroundColor(colorology.id))
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
      <ColorologyBackground />

      <div
        className={`${styles['colorology-result']} container d-flex flex-wrap justify-content-center`}
      >
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'IBM Plex Sans TC',
            },
          }}
        >
          <main className="d-flex flex-column">
            <h1 className="text-center fw-bold text-white">色 彩 學</h1>
            {colorologyResult && (
              <div
                className={`${styles['chromaticOutline']} d-flex flex-column align-items-center`}
                style={{ backgroundColor: backgroundColor }}
              >
                <h2 className="w-100 text-center mt-3">診 斷 結 果</h2>
                <div className={styles['diagnosticResult']}>
                  <p className={`${styles['judge']} mb-2 p-2 text-white`}>
                    {colorologyResult.judge}
                  </p>
                  {/* 手機模式 */}
                  <div className={styles['mobileModeColorGroups']}>
                    <p
                      className={`${styles['bodyText']} w-50 text-center text-white mt-3 p-1`}
                    >
                      上 身
                    </p>
                    <p
                      className={`${styles['basicColorText']} text-center text-white`}
                    >
                      基 本 色
                    </p>

                    <div className={`${styles['colorGroup']} d-flex`}>
                      <Tooltip
                        title={colorologyResult.basic_color_upper_body_text_1}
                        color="#00917c"
                      >
                        <div
                          className={styles['color1']}
                          style={{
                            backgroundColor:
                              colorologyResult.basic_color_upper_body_1,
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title={colorologyResult.basic_color_upper_body_text_2}
                        color="#00917c"
                      >
                        <div
                          className={`${styles['color2']} mx-3`}
                          style={{
                            backgroundColor:
                              colorologyResult.basic_color_upper_body_2,
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title={colorologyResult.basic_color_upper_body_text_3}
                        color="#00917c"
                      >
                        <div
                          className={styles['color3']}
                          style={{
                            backgroundColor:
                              colorologyResult.basic_color_upper_body_3,
                          }}
                        />
                      </Tooltip>
                    </div>
                    <p
                      className={`${styles['brightColorText']} text-center text-white`}
                    >
                      亮 彩 色
                    </p>
                    <div className={`${styles['colorGroup']} d-flex`}>
                      <Tooltip
                        title={colorologyResult.bright_color_upper_body_text_1}
                        color="#00917c"
                      >
                        <div
                          className={styles['color4']}
                          style={{
                            backgroundColor:
                              colorologyResult.bright_color_upper_body_1,
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title={colorologyResult.bright_color_upper_body_text_2}
                        color="#00917c"
                      >
                        <div
                          className={`${styles['color5']} ms-3`}
                          style={{
                            backgroundColor:
                              colorologyResult.bright_color_upper_body_2,
                          }}
                        />
                      </Tooltip>
                    </div>
                    <p
                      className={`${styles['lowerBody']} ${styles['bodyText']} w-50 text-center text-white p-1`}
                    >
                      下 身
                    </p>
                    <p
                      className={`${styles['basicColorText']} text-center text-white`}
                    >
                      基 本 色
                    </p>
                    <div className={`${styles['colorGroup']} d-flex`}>
                      <Tooltip
                        title={colorologyResult.basic_color_lower_body_text_1}
                        color="#00917c"
                      >
                        <div
                          className={styles['color6']}
                          style={{
                            backgroundColor:
                              colorologyResult.basic_color_lower_body_1,
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title={colorologyResult.basic_color_lower_body_text_2}
                        color="#00917c"
                      >
                        <div
                          className={`${styles['color7']} mx-3`}
                          style={{
                            backgroundColor:
                              colorologyResult.basic_color_lower_body_2,
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title={colorologyResult.basic_color_lower_body_text_3}
                        color="#00917c"
                      >
                        <div
                          className={styles['color8']}
                          style={{
                            backgroundColor:
                              colorologyResult.basic_color_lower_body_3,
                          }}
                        />
                      </Tooltip>
                    </div>
                    <p
                      className={`${styles['brightColorText']} text-center text-white`}
                    >
                      亮 彩 色
                    </p>
                    <div className={`${styles['colorGroup']} d-flex`}>
                      <Tooltip
                        title={colorologyResult.bright_color_lower_body_text_1}
                        color="#00917c"
                      >
                        <div
                          className={styles['color9']}
                          style={{
                            backgroundColor:
                              colorologyResult.bright_color_lower_body_1,
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        title={colorologyResult.bright_color_lower_body_text_2}
                        color="#00917c"
                      >
                        <div
                          className={`${styles['color10']} ms-3`}
                          style={{
                            backgroundColor:
                              colorologyResult.bright_color_lower_body_2,
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  {/* 平板、電腦模式 */}
                  <div className={styles['otherModeColorGroups']}>
                    <div className={`${styles['colorText']} d-flex`}>
                      <p
                        className={`${styles['basicColorText']} text-center text-white p-1`}
                      >
                        基 本 色
                      </p>
                      <p
                        className={`${styles['brightColorText']} text-center text-white  p-1`}
                      >
                        亮 彩 色
                      </p>
                    </div>
                    <div className={`${styles['bodyGroup']} d-flex mb-3`}>
                      <p
                        className={`${styles['bodyText']} text-center text-white p-1 m-0`}
                      >
                        上 身
                      </p>
                      <div className={`${styles['colorGroup']} d-flex`}>
                        <Tooltip
                          title={colorologyResult.basic_color_upper_body_text_1}
                          color="#00917c"
                        >
                          <div
                            className={`${styles['color1']} ms-3`}
                            style={{
                              backgroundColor:
                                colorologyResult.basic_color_upper_body_1,
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          title={colorologyResult.basic_color_upper_body_text_2}
                          color="#00917c"
                        >
                          <div
                            className={`${styles['color2']} mx-3`}
                            style={{
                              backgroundColor:
                                colorologyResult.basic_color_upper_body_2,
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          title={colorologyResult.basic_color_upper_body_text_3}
                          color="#00917c"
                        >
                          <div
                            className={styles['color3']}
                            style={{
                              backgroundColor:
                                colorologyResult.basic_color_upper_body_3,
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          title={
                            colorologyResult.bright_color_upper_body_text_1
                          }
                          color="#00917c"
                        >
                          <div
                            className={`${styles['color4']} mx-3`}
                            style={{
                              backgroundColor:
                                colorologyResult.bright_color_upper_body_1,
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          title={
                            colorologyResult.bright_color_upper_body_text_2
                          }
                          color="#00917c"
                        >
                          <div
                            className={styles['color5']}
                            style={{
                              backgroundColor:
                                colorologyResult.bright_color_upper_body_2,
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                    <div className={`${styles['bodyGroup']} d-flex`}>
                      <p
                        className={`${styles['bodyText']} text-center text-white p-1 m-0`}
                      >
                        下 身
                      </p>
                      <div className={`${styles['colorGroup']} d-flex`}>
                        <Tooltip
                          placement="bottom"
                          title={colorologyResult.basic_color_lower_body_text_1}
                          color="#00917c"
                        >
                          <div
                            className={`${styles['color6']} ms-3`}
                            style={{
                              backgroundColor:
                                colorologyResult.basic_color_lower_body_1,
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          placement="bottom"
                          title={colorologyResult.basic_color_lower_body_text_2}
                          color="#00917c"
                        >
                          <div
                            className={`${styles['color7']} mx-3`}
                            style={{
                              backgroundColor:
                                colorologyResult.basic_color_lower_body_2,
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          placement="bottom"
                          title={colorologyResult.basic_color_lower_body_text_3}
                          color="#00917c"
                        >
                          <div
                            className={styles['color8']}
                            style={{
                              backgroundColor:
                                colorologyResult.basic_color_lower_body_3,
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          placement="bottom"
                          title={
                            colorologyResult.bright_color_lower_body_text_1
                          }
                          color="#00917c"
                        >
                          <div
                            className={`${styles['color9']} mx-3`}
                            style={{
                              backgroundColor:
                                colorologyResult.bright_color_lower_body_1,
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          placement="bottom"
                          title={
                            colorologyResult.bright_color_lower_body_text_2
                          }
                          color="#00917c"
                        >
                          <div
                            className={styles['color10']}
                            style={{
                              backgroundColor:
                                colorologyResult.bright_color_lower_body_2,
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  {/* 文字說明 */}
                  <div className={`${styles['illustrate']} my-3 px-3`}>
                    <p className="mt-2">{colorologyResult.text1}</p>
                    <br />
                    <p>{colorologyResult.text2}</p>
                    <ol className="mt-4 mb-2">
                      若搭配了適合的顏色會有：
                      <li>{colorologyResult.text3_1}</li>
                      <li>{colorologyResult.text3_2}</li>
                      <li>{colorologyResult.text3_3}</li>
                    </ol>
                  </div>
                </div>
                <div className={`${styles['buttons']} w-100`}>
                  <button
                    className={`${styles['custom-btn']} ${styles['btn-7']} mb-3`}
                  >
                    <Link href="../member/edit-personal-data">
                      {' '}
                      <span>會員中心</span>{' '}
                    </Link>
                  </button>
                  <button
                    className={`${styles['custom-btn']} ${styles['btn-7']} mb-3`}
                  >
                    <Link href="./">
                      {' '}
                      <span>重新測驗</span>{' '}
                    </Link>
                  </button>
                  <button
                    className={`${styles['custom-btn']} ${styles['btn-7']} mb-3`}
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
        </ConfigProvider>
      </div>
    </>
  )
}

// 這裡代表要套用NofooterLayout，取代原本的DefaultLayout
// 要寫在元件的函式之外
ColorologyResult.getLayout = function (page) {
  return <NofooterLayout>{page}</NofooterLayout>
}
