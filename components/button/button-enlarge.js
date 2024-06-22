import React from 'react'
import styles from '@/styles/button.module.css'

export default function ButtonEnlarge({ text, width, height }) {
  return (
    <>
      <>
        <button
          className={`${styles['custom-btn']} ${styles['btn-7']} ${styles['btn-11']}`}
          style={{ height: height, width: width }}
        >
          {/* 閃爍按鈕 可做為重點要按的按鈕 */}
          <span>{text}</span>
        </button>
      </>
    </>
  )
}
