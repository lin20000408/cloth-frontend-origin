import React from 'react'
import styles from '@/styles/colorology/colorology.module.css'

export default function ColorologyBackground() {
  return (
    <>
      <div className={`${styles['waveWrapper']} ${styles['waveAnimation']}`}>
        <div className={`${styles['waveWrapperInner']} ${styles['bgTop']}`}>
          <div
            className={`${styles['wave']} ${styles['waveTop']}`}
            style={{
              backgroundImage: 'url("../images/colorology/wave-top.png")',
            }}
          />
        </div>
        <div className={`${styles['waveWrapperInner']} ${styles['bgMiddle']}`}>
          <div
            className={`${styles['wave']} ${styles['waveMiddle']}`}
            style={{
              backgroundImage: 'url("../images/colorology/wave-mid.png")',
            }}
          />
        </div>
        <div className={`${styles['waveWrapperInner']} ${styles['bgBottom']}`}>
          <div
            className={`${styles['wave']} ${styles['waveBottom']}`}
            style={{
              backgroundImage: 'url("../images/colorology/wave-bot.png")',
            }}
          />
        </div>
      </div>
    </>
  )
}
