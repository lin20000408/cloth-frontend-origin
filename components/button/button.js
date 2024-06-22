import React from 'react'
import styles from '@/styles/button.module.css'

export default function Button({ text, width, height }) {
  return (
    <>
      <>
        <button
          className={`${styles['custom-btn']} ${styles['btn-7']}`}
          style={{ height: height, width: width }}
        >
          {/* 有效果的一般按鈕 */}
          <span>{text}</span>
        </button>
      </>
    </>
  )
}
