import React from 'react'
import { Select, ConfigProvider } from 'antd'
import styles from '@/styles/coupon/coupon-unused.module.css'

const CouponSelect = ({
  selectedCouponType,
  setSelectedCouponType,
  availableCouponTypes,
}) => {
  const handleChange = (value) => {
    // 當選擇改變時，調用父元件傳遞的 setSelectedCouponType 函數來更新選擇的 coupon_type
    setSelectedCouponType(value)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'IBM Plex Sans TC',
        },
        components: {
          Select: {
            colorBgContainer: 'white',
            colorBgElevated: '#abc8bc',
            colorBorder: '#00917c',
            colorPrimary: '#00917c',
            colorPrimaryHover: '#00917c',
            controlOutline: '#00917c',
            colorTextPlaceholder: 'black',
            lineWidth: '2px',
            optionActiveBg: 'white',
            optionSelectedBg: '#00917c',
            optionSelectedColor: 'white',
            optionSelectedFontWeight: '400',
          },
        },
      }}
    >
      <Select
        className={styles['menu']}
        value={selectedCouponType}
        style={{
          width: 150,
        }}
        onChange={handleChange}
      >
        {availableCouponTypes.map((type) => (
          <Select.Option key={type} value={type}>
            {type}
          </Select.Option>
        ))}
      </Select>
    </ConfigProvider>
  )
}

export default CouponSelect
