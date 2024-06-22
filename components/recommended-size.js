import React, { useState, useEffect } from 'react'
import styles from '@/styles/recommended-size.module.css'
import { Drawer, Form, Radio, ConfigProvider, InputNumber, Slider } from 'antd'
import RecommendedSizeLoader from './loader/recommended-size-loader'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function RecommendedSize() {
  // 打開推薦尺寸
  const [open, setOpen] = useState(false)
  // 尺寸結果
  const [sizeResult, setSizeResult] = useState('')
  // 性別
  const [gender, setGender] = useState(null)
  // 表單
  const [form] = Form.useForm()
  // 載入動畫
  const [isLoading, setIsLoading] = useState(false)
  // 抓取後端json
  const { sizeContext, updateSizeContext } = useBackEndData({
    size: 0,
  })

  // 身高
  const [inputValue, setInputValue] = useState('')
  // 胸圍
  const [inputValue2, setInputValue2] = useState('')
  // 腰圍
  const [inputValue3, setInputValue3] = useState('')
  // 臀圍
  const [inputValue4, setInputValue4] = useState('')

  // 身高
  const onChange = (newValue) => {
    setInputValue(newValue)
    form.setFieldsValue({ height: newValue })
  }
  // 胸圍
  const onChange2 = (newValue) => {
    setInputValue2(newValue)
    form.setFieldsValue({ chestCircumference: newValue })
  }
  // 腰圍
  const onChange3 = (newValue) => {
    setInputValue3(newValue)
    form.setFieldsValue({ waistline: newValue })
  }
  // 臀圍
  const onChange4 = (newValue) => {
    setInputValue4(newValue)
    form.setFieldsValue({ hips: newValue })
  }

  const xsImage = '../images/size/XS.JPG'
  const sImage = '../images/size/S.JPG'
  const mImage = '../images/size/M.JPG'
  const lImage = '../images/size/L.JPG'
  const xlImage = '../images/size/XL.JPG'
  const xxlImage = '../images/size/2XL.JPG'
  const errorImage = '../images/size/錯誤.JPG'

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    if (userIdLocalStorage !== null) {
      fetchRecommendedSizeData()
    }
  }, [])

  const fetchRecommendedSizeData = async () => {
    // // 從context的userIdData中取出user.id資料
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/member-edit/recommended-size/${userIdLocalStorage}`,
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
        const recommendedSizeData = responseData.data.result

        // console.log('從後端接收到的數據：', responseData) // 在控制台console.log接收到的數據
        // console.log(
        //   '從後端接收到的數據：',
        //   recommendedSizeData[0].chest_circumference
        // ) // 在控制台console.log接收到的數據

        const { gender, height, waistline, hips, size } = recommendedSizeData[0]
        const chestCircumference = recommendedSizeData[0].chest_circumference

        form.setFieldsValue({
          gender: gender.toString(),
          height,
          chestCircumference,
          waistline,
          hips,
        })

        setInputValue(height) // 重設身高輸入
        setInputValue2(chestCircumference) // 重設胸圍輸入
        setInputValue3(waistline) // 重設腰圍輸入
        setInputValue4(hips) // 重設臀圍輸入
        setSizeResult(size) // 重設推薦尺寸
      } else {
        console.warn('請求失敗')
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
    }
  }

  const onFinish = async (values) => {
    // 開啟載入動畫
    setIsLoading(true)
    // 在這裡處理表單數據，例如發送到API或進行計算
    // console.log('表單數據:', values)

    // 獲取表單的值
    const { gender, height, chestCircumference, waistline, hips } = values
    // console.log('gender', gender) // 在控制台console.log接收到的數據
    let size = '' // 創建一個變數來存儲尺寸結果

    if (gender === '0') {
      // 處理女性表單數據
      if (
        height >= 140 &&
        height <= 156 &&
        chestCircumference >= 71 &&
        chestCircumference <= 77 &&
        waistline >= 54 &&
        waistline <= 60 &&
        hips >= 78 &&
        hips <= 84
      ) {
        size = 'XS'
      } else if (
        height >= 155 &&
        height <= 164 &&
        chestCircumference >= 75 &&
        chestCircumference <= 81 &&
        waistline >= 58 &&
        waistline <= 64 &&
        hips >= 82 &&
        hips <= 88
      ) {
        size = 'S'
      } else if (
        height >= 155 &&
        height <= 164 &&
        chestCircumference >= 80 &&
        chestCircumference <= 86 &&
        waistline >= 62 &&
        waistline <= 68 &&
        hips >= 86 &&
        hips <= 92
      ) {
        size = 'M'
      } else if (
        height >= 159 &&
        height <= 200 &&
        chestCircumference >= 86 &&
        chestCircumference <= 92 &&
        waistline >= 66 &&
        waistline <= 72 &&
        hips >= 90 &&
        hips <= 96
      ) {
        size = 'L'
      } else if (
        height >= 159 &&
        height <= 200 &&
        chestCircumference >= 92 &&
        chestCircumference <= 98 &&
        waistline >= 70 &&
        waistline <= 76 &&
        hips >= 94 &&
        hips <= 100
      ) {
        size = 'XL'
      } else if (
        height >= 159 &&
        height <= 200 &&
        chestCircumference >= 98 &&
        chestCircumference <= 120 &&
        waistline >= 76 &&
        waistline <= 108 &&
        hips >= 100 &&
        hips <= 106
      ) {
        size = '2XL'
      } else {
        size = '數值不合理'
      }
    } else {
      // 處理男性表單數據
      if (
        height >= 149 &&
        height <= 165 &&
        chestCircumference >= 76 &&
        chestCircumference <= 84 &&
        waistline >= 64 &&
        waistline <= 72
      ) {
        size = 'XS'
      } else if (
        height >= 149 &&
        height <= 165 &&
        chestCircumference >= 80 &&
        chestCircumference <= 88 &&
        waistline >= 68 &&
        waistline <= 76
      ) {
        size = 'S'
      } else if (
        height >= 165 &&
        height <= 175 &&
        chestCircumference >= 80 &&
        chestCircumference <= 96 &&
        waistline >= 76 &&
        waistline <= 84
      ) {
        size = 'M'
      } else if (
        height >= 175 &&
        height <= 200 &&
        chestCircumference >= 96 &&
        chestCircumference <= 104 &&
        waistline >= 84 &&
        waistline <= 92
      ) {
        size = 'L'
      } else if (
        height >= 175 &&
        height <= 200 &&
        chestCircumference >= 104 &&
        chestCircumference <= 112 &&
        waistline >= 92 &&
        waistline <= 100
      ) {
        size = 'XL'
      } else if (
        height >= 175 &&
        height <= 200 &&
        chestCircumference >= 112 &&
        chestCircumference <= 120 &&
        waistline >= 100 &&
        waistline <= 108
      ) {
        size = '2XL'
      } else {
        size = '數值不合理'
      }
    }
    setSizeResult(size)
    updateSizeContext(size)

    // 關掉載入動畫
    await new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false)
        resolve()
      }, 1000)
    })
    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    // 有會員id才執行
    if (userIdLocalStorage) {
      // 更新資料庫
      const databaseResponse = await fetch(
        `http://localhost:3005/api/member-edit/recommended-size/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            height,
            chestCircumference,
            waistline,
            hips,
            size,
          }), // 假設 responseData 包含了更新後的資料
        }
      )

      const databaseResponseData = await databaseResponse.json() // 解析數據
      // 處理響應
      if (databaseResponseData.status === 'success') {
        console.log('資料庫更新成功', databaseResponseData)
      } else {
        console.error('資料庫更新失敗', databaseResponseData)
      }
    }
  }

  const renderSizeImage = () => {
    switch (sizeResult) {
      case 'XS':
        return xsImage
      case 'S':
        return sImage
      case 'M':
        return mImage
      case 'L':
        return lImage
      case 'XL':
        return xlImage
      case '2XL':
        return xxlImage
      case '數值不合理':
      default:
        return errorImage
    }
  }

  // 切換性別，初始化數值
  const handleValuesChange = (changedValues, allValues) => {
    if (changedValues.gender !== undefined) {
      form.resetFields(['height', 'chestCircumference', 'waistline', 'hips'])
      setInputValue('') // 重設身高輸入
      setInputValue2('') // 重設胸圍輸入
      setInputValue3('') // 重設腰圍輸入
      setInputValue4('') // 重設臀圍輸入
      setSizeResult('') // 清除推薦尺寸
    }
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value)
    // console.log(setGender)
  }

  return (
    <>
      <div className={styles['recommended-size']}>
        <button
          type="green"
          onClick={showDrawer}
          className={`${styles['custom-btn']} ${styles['btn-11']} ${styles['btn-12']}`}
          style={{ hight: '1000px' }}
        >
          智能推薦尺寸
        </button>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'IBM Plex Sans TC',
            },
            components: {
              Radio: {
                colorPrimary: '#00917c',
              },
              InputNumber: {
                colorPrimary: '#00917c',
                activeShadow: '0 0 0 2px rgb(0, 145, 124, 0.1)',
                hoverBorderColor: '#00917c',
              },
              Slider: {
                colorPrimary: '#00917c',
                handleColor: '#00917c',
                handleActiveColor: '#00917c',
                dotBorderColor: '#00917c',
                trackBg: '#00917c',
                trackHoverBg: '#00917c',
                dotActiveBorderColor: '#00917c',
                colorPrimaryBorderHover: '#00917c',
              },
            },
          }}
        >
          <Drawer
            title="智能推薦尺寸"
            width={400}
            onClose={onClose}
            open={open}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onValuesChange={handleValuesChange}
            >
              <Form.Item
                name="gender"
                label="生理性別"
                rules={[
                  {
                    required: true,
                    message: '請選擇您的生理性別',
                  },
                ]}
              >
                <Radio.Group onChange={handleGenderChange}>
                  <Radio value="0">女</Radio>
                  <Radio value="1">男</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="height"
                label="身高 (公分)"
                rules={[
                  {
                    required: true,
                    message: '請選擇您的身高',
                  },
                ]}
              >
                <InputNumber
                  min={140}
                  max={200}
                  value={inputValue}
                  onChange={onChange}
                />
                <Slider
                  min={140}
                  max={200}
                  onChange={onChange}
                  value={!isNaN(inputValue) ? inputValue : 0}
                />
              </Form.Item>

              <Form.Item
                name="chestCircumference"
                label="胸圍 (公分)"
                rules={[
                  {
                    required: true,
                    message: '請選擇您的胸圍',
                  },
                ]}
              >
                <InputNumber
                  min={71}
                  max={120}
                  value={inputValue2}
                  onChange={onChange2}
                />
                <Slider
                  min={71}
                  max={120}
                  onChange={onChange2}
                  value={!isNaN(inputValue2) ? inputValue2 : 0}
                />
              </Form.Item>

              <Form.Item
                name="waistline"
                label="腰圍 (公分)"
                rules={[
                  {
                    required: true,
                    message: '請選擇您的腰圍',
                  },
                ]}
              >
                <InputNumber
                  min={54}
                  max={108}
                  value={inputValue3}
                  onChange={onChange3}
                />
                <Slider
                  min={54}
                  max={108}
                  onChange={onChange3}
                  value={!isNaN(inputValue3) ? inputValue3 : 0}
                />
              </Form.Item>

              {gender !== '1' && (
                <Form.Item
                  name="hips"
                  label="臀圍 (公分)"
                  rules={[
                    {
                      required: true,
                      message: '請選擇您的臀圍',
                    },
                  ]}
                >
                  <InputNumber
                    min={78}
                    max={106}
                    value={inputValue4}
                    onChange={onChange4}
                  />
                  <Slider
                    min={78}
                    max={106}
                    onChange={onChange4}
                    value={!isNaN(inputValue4) ? inputValue4 : 0}
                  />
                </Form.Item>
              )}

              <button
                type="submit"
                className={`${styles['custom-btn-submit']} ${styles['btn-7']} ${styles['btn-11']}`}
              >
                <span>送 出</span>
              </button>
            </Form>
            {isLoading ? (
              <RecommendedSizeLoader />
            ) : (
              sizeResult && (
                <img
                  src={renderSizeImage()}
                  className={styles['recommended-size-img']}
                />
              )
            )}
          </Drawer>
        </ConfigProvider>
      </div>
    </>
  )
}
