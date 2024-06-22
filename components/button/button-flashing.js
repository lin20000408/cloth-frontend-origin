import React from 'react'
import styles from '@/styles/button.module.css'

export default function ButtonFlashing({ text, width, height }) {
  return (
    <>
      <>
        <button
          className={`${styles['custom-btn']} ${styles['btn-9']}`}
          style={{ height: height, width: width }}
        >
          {/* 放大按鈕 可做為存儲、修改按鈕 */}
          <span>{text}</span>
        </button>
      </>
    </>
  )
}
