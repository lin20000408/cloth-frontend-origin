import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from '@/styles/indexStyle/photo-wall.module.css'

export default function PhotoWall() {
  const settings = {
    dots: false, // 隱藏小圓點導航
    infinite: true, // 無限循環滾動
    speed: 30000, // 切換速度
    autoplay: true, // 自動播放
    autoplaySpeed: 10, // 自動播放速度，實現連續滾動
    cssEase: 'linear', // 使用線性動畫效果
    variableWidth: true, // 允許可變寬度，實現連續滾動
    pauseOnHover: false, // 滑鼠懸停時不暫停自動播放
  }

  return (
    <div className={styles['photo-wall-container']}>
      <h1
        className="text-center"
        style={{ marginTop: '70px', fontSize: '30px' }}
      >
        GALLERY
      </h1>
      <Slider {...settings}>
        {[...Array(4)].map((_, i) => (
          <div className={styles['photo-set']} key={i}>
            <div className={styles['photo-wall']}>
              <div className="me-2 mb-5">
                <div className={styles['photo-wall']}>
                  <img
                    src="../phs-card/女-Meier.Q腰帶設計工裝短裙-粉紅色-日系風-內1-phs.webp"
                    className={`${styles['small-photo']} me-2`}
                    alt="Small"
                  />
                  <img
                    src="../phs-card/女-Meier.Q小香織紋打褶傘長裙-白色-氣質風-內1-phs.webp"
                    className={styles['small-photo']}
                    alt="Small"
                  />
                </div>
                <img
                  src="/main-card/女-MEIER.Q-NAZO-腰抽繩休閒小短褲-霧粉色-簡約風-內1.webp"
                  className={`${styles['big-photo']} mt-2`}
                  alt="Big"
                />
              </div>
              <div className="me-2 mb-5">
                <img
                  src="/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風5.webp"
                  className={`${styles['big-photo']} mb-2`}
                  alt="Big"
                />
                <div className={styles['photo-wall']}>
                  <img
                    src="../phs-card/男-H&M-貼身西裝背心無袖-黑色-西裝風-內1.webp"
                    className={`${styles['small-photo']} me-2`}
                    alt="Small"
                  />
                  <img
                    src="../phs-card/男-H&M-寬鬆剪裁拉鍊連帽長袖外套-深灰色-休閒風-2_1.webp"
                    className={styles['small-photo']}
                    alt="Small"
                  />
                </div>
              </div>
              <div className="me-2 mb-5">
                <div className={styles['photo-wall']}>
                  <img
                    src="../phs-card/女-MEIER.Q-NAZO-腰抽繩休閒小短褲-豆綠色-簡約風-內1-phs.webp"
                    className={`${styles['small-photo']} me-2`}
                    alt="Small"
                  />
                  <img
                    src="../phs-card/女-MEIER.Q-柔軟透肌感上衣長袖-黑色-性感風-內1-phs.webp"
                    className={styles['small-photo']}
                    alt="Small"
                  />
                </div>
                <img
                  src="/main-card/女-MEIER.Q-尖領微寬鬆襯衫-黃色-簡約風-內1.webp"
                  className={`${styles['big-photo']} mt-2`}
                  alt="Big"
                />
              </div>
              <div className="me-2 mb-5">
                <img
                  src="/main-card/女-MEIER.Q-spring-簡約線條感西裝外套上衣長袖-米白色-西裝風-內1.webp"
                  className={`${styles['big-photo']} mb-2`}
                  alt="Big"
                />
                <div className={styles['photo-wall']}>
                  <img
                    src="../phs-card/男-H&M-貼身西裝背心無袖-海軍藍色-西裝風-內1.webp"
                    className={`${styles['small-photo']} me-2`}
                    alt="Small"
                  />
                  <img
                    src="../phs-card/男-H&M-標準剪裁法蘭絨襯衫長袖-咖啡色_紫色-英倫風-內1.webp"
                    className={styles['small-photo']}
                    alt="Small"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
