import React from 'react'
import MaxCard from '@/components/indexComponents/hotCard/maxCard'
import MinCard from '@/components/indexComponents/hotCard/minCard'
import styles from '@/components/indexComponents/hotCard/indexHotCard.module.css'

export default function IndexHot() {
  return (
    <>
      <section className="mb-3 My-section">
        <div className="container d-flex flex-column flex-xxl-row  justify-content-between align-items-center flex-wrap">
          <h1
            class={`text-black ${styles['hot-text']}`}
            style={{ fontSize: '30px' }}
          >
            {''}
          </h1>
          <MaxCard></MaxCard>
          {/* <div className='d-none d-xxl-block'> */}
          <MinCard></MinCard>
          {/* </div> */}
        </div>
      </section>
    </>
  )
}
