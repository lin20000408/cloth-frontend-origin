import React from 'react'
// Import Swiper styles
import data from '@/data/indexImg'
import styles from '@/components/indexComponents/rankCarousel/rankCard/rankCard.module.css'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { useRouter } from 'next/router'
import data1 from '@/data/indexImgMen'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
export default function Test(props) {
  useEffect(()=>{
    Aos.init({duration: 2000})
  },[])
  const { rank } = props
  useEffect(() => {
    console.log(rank)
  })
  const router = useRouter()
  let ranking
  if (rank === '男装') {
    ranking = data1
  } else {
    ranking = data
  }
  return (
    <>
      {ranking.map((v, i) => {
        return (
          <div className={`d-flex`} key={i} data-aos = 'flip-left'>
            <a href={v.href}>
              <img
                src={v.img}
                className={`d-block ${styles['rank-card']}`}
                style={{ borderRadius: '20px' }}
                alt="..."
              />
              <ul className="w-100 text-center mt-2">
                <li style={{ fontWeight: '600', color: 'black' }}>{v.name}</li>
                <li style={{ color: 'black' }}>{v.style}</li>
                <li className="text-price">${v.price}</li>
              </ul>
            </a>
          </div>
        )
      })}
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
          p {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          li,
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
