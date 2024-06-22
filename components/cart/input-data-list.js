import React, { useState,useEffect } from 'react'
import { Select } from 'antd'
import { ConfigProvider } from 'antd'
import styles from '@/styles/cart/cart.module.css'

export default function InputDataList({ quantity, setDataFromInput }) {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity)
  useEffect(() => {
    setSelectedQuantity(quantity);
  });
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            controlOutline: '#aabec3',
            colorPrimary: '#aabec3',
            colorBorder: '#aabec3',
            colorPrimaryHover: '#aabec3',
            lineWidth: 3,
            fontSize: '40',
          },
        },
      }}
    >
      <Select
        defaultValue={selectedQuantity}
        onChange={(value) => {
          setSelectedQuantity(value)
          setDataFromInput(Number(value))
        }}
        showSearch
        className={styles.inputComponent}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '')
            .toLowerCase()
            .localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5', label: '5' },
          { value: '6', label: '6' },
          { value: '7', label: '7' },
          { value: '8', label: '8' },
          { value: '9', label: '9' },
        ]}
      />
    </ConfigProvider>
  )
}
