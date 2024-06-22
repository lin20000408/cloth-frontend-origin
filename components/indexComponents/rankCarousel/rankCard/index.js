import React from 'react'
import styles from '@/components/indexComponents/rankCarousel/rankCard/rankCard.module.css'

export default function RankCard({ rank = 1, img = '' }) {
  return (
    <div className="d-xs-flex  justify-content-center">
      <div
        className={` d-flex justify-content-between  align-items-center bg-ddsecondary ${styles['rank-card']}`}
      >
        <div className={styles['rank-img']}>
          <img
            src={img}
            className="d-block w-100 h-100"
            alt="..."
            // loading="lazy"
          />
        </div>
        <div
          className={`${styles['rank-text-group']} d-flex flex-column justify-content-evenly align-items-start`}
        >
          <h6>{rank}</h6>
          <h6>一件商品</h6>
          <p>類型</p>
          <p>$100</p>
        </div>
      </div>
    </div>
  )
}
