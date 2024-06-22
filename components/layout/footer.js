import React, { useState, useEffect } from 'react'
import { FaLine, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'
import styles from '@/styles/header&footer.module.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function MyFooter() {
  const [userId, setUserId] = useState(null) // 定義狀態用於存儲用戶ID

  // 抓取後端json
  const { userIdData } = useBackEndData({
    id: 0,
  })

  useEffect(() => {
    // 有context的userIdData就取出user.id資料
    if (userIdData) {
      setUserId(userIdData)
    } else {
      // 沒有context的userIdData就從localStorage取出user.id資料
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      )
      setUserId(userIdLocalStorage)
    }
    // console.log('userId:', userIdData) //查詢是否有抓到id
  }, [userId])

  return (
    <>
      <footer className={`bg-ddprimary ${styles['footer']}`}>
        <nav className={styles['footer-navs']}>
          <ul className={`text-white  ${styles['footer-nav1']}`}>
            <li>
              <Link href="/product-list">TOP</Link>
            </li>
            <li>
              <Link href="/product-list">MEN</Link>
            </li>
            <li>
              <Link href="/product-list">WOMEN</Link>
            </li>
            <li>
              <Link href="/product-list">COUPLE</Link>
            </li>
            <li>
              <Link href="/product-list">NEW</Link>
            </li>
            <li>
              <Link href="/product-list">HOT</Link>
            </li>
          </ul>
          <ul className={`text-black ${styles['footer-nav2']}`}>
            <li>
              <Link href="/member/register">加入會員</Link>
            </li>
            <li>
              {userId ? (
                <Link
                  href={
                    window.innerWidth < 768
                      ? '/member/phone-sidebar'
                      : '/member/edit-personal-data'
                  }
                >
                  會員中心
                </Link>
              ) : (
                <Link href="/member/login">會員中心</Link>
              )}
            </li>
            <li>
              <Link href="#">關於我們</Link>
            </li>
            <li>
              <Link href="#">客服中心</Link>
            </li>
            <li>
              <Link href="http://localhost:3000/">回到首頁</Link>
            </li>
          </ul>
        </nav>
        <div className={styles['footer-follow']}>
          <div className={styles['follow-me']}>
            <p className={styles['follow-font']}>FOLLOW ME</p>
            <ul className={styles['footer-icons']}>
              <li>
                <Link href="#">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaLine />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <small className={styles['footer-small']}>
          Copyright © 2023 DD SHOP All Rights Reserved.
        </small>
      </footer>
    </>
  )
}
