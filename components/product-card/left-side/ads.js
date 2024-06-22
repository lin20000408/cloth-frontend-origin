import React from 'react'
import Image from 'next/image'
import styles from '@/styles/product/Product.module.css'
import Link from 'next/link'
import ads from '@/public/product/imgs/ads.png'

export default function OutfitProduct() {
  return (
    <>
   
      <div className={` mt-3 ${styles['xxs-none']} `}>
        <Image
          src={ads}
          alt=""
          width={'370'}
          height={'150'}
          blurDataURL=""
        />
      </div>
    </>
  )
}
