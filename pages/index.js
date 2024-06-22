import React from 'react'
import IndexCarousel from '@/components/indexComponents/indexCarousel/indexCarousel'
import IndexHot from '@/components/indexComponents/hotCard/indexHot'
import styles from '@/styles/indexStyle/rank.module.css'
import RankCarousel from '@/components/indexComponents/rankCarousel'
import PhotoWall from '@/components/indexComponents/photo-wall'
import HomeLayout from '@/components/layout/home-layout'
import { fontSize } from '@mui/system'
import { useState } from 'react'
export default function IndexTest() {
  const [rank, setRank] = useState('男装')
  return (
    <>
      <div className={`${styles['loading']}`}>
        <IndexCarousel />
        <IndexHot />
        <section id="Rank" className="My-section">
          <div className="container d-flex flex-column align-items-center ">
            <p style={{ fontSize: '30px', fontWeight: '600' }}>RANKING</p>
            {/* 排名按鈕 */}
            <div className="d-flex justify-content-evenly  w-100 ">
              <button
                className={` ${styles['rankBtn']} h3`}
                style={{ backgroundColor: 'white', border: 'none' }}
                onClick={() => {
                  setRank('男装')
                }}
              >
                男裝
              </button>
              <button
                className={` ${styles['rankBtn']} h3`}
                style={{ backgroundColor: 'white', border: 'none' }}
                onClick={() => {
                  setRank('女装')
                }}
              >
                女裝
              </button>
            </div>
            <div
              className="d-flex justify-content-around gap-3 w-100"
              style={{
                marginBottom: '70px',
                width: '1440px',
                flexWrap: 'wrap',
              }}
            >
              <RankCarousel rank={rank} />
            </div>
            <PhotoWall />
          </div>
        </section>
      </div>
    </>
  )
}
IndexTest.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>
}
