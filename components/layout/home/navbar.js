import React, { useState, useEffect } from 'react'
import styles from '@/styles/home-header&footer.module.css'
import 'animate.css'
import {
  IoCartOutline,
  IoHeartOutline,
  IoPersonCircleOutline,
  IoChatboxEllipsesOutline,
} from 'react-icons/io5'
import Link from 'next/link'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import NavbarDrawer from './navbar-drawer'
import GameDropdown from './game-dropdown'
import UserDropdown from './user-dropdown'
import BoxDropdown from './box-dropdown'
import { useCart } from '@/hooks/use-cart-state'
import { selectFavorite } from '@/services/product' //打api 到後端拿 收藏資料
export default function Navbar() {
  const [userId, setUserId] = useState(null)
  const [isTop, setIsTop] = useState(true)
  const [content, setContent] = useState('')
  const { cart } = useCart()
  const { userIdData, setFavoritesData } = useBackEndData({
    id: 0,
  })

  useEffect(() => {
    // 沒有context的userIdData就從localStorage取出user.id資料
    // 先取得localStorage資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    // 有context的userIdData就取出user.id資料
    if (userIdData !== null) {
      setUserId(userIdData)
      getfavoriteData(userIdData)
    } else if (userIdData === null && userIdLocalStorage !== null) {
      // 沒有context的userIdData就從localStorage取出user.id資料
      setUserId(userIdLocalStorage)
      getfavoriteData(userIdLocalStorage)
    }
    // console.log('userId:', userIdData) //查詢是否有抓到id
  }, [userId])

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setContent(cart.totalItems)
  }, [cart])
  //拿取收藏資料
  const getfavoriteData = async (userIdData) => {
    const data = await selectFavorite(userIdData)
    setFavoritesData(data)
  }
  return (
    <header
      className={`${styles.header} ${
        isTop ? styles['header-top'] : styles['header-scrolled']
      }`}
    >
      <div className={styles['header-background']}>
        <div className={styles.LOGO}>
          <Link href="http://localhost:3000/">
            <img src="/images/logo.svg" alt="" />
          </Link>
        </div>
        <nav className={styles['header-nav']}>
          <ul className={styles['header-font']}>
            <li>
              <Link href="/product-list">ITEMS</Link>
            </li>
            <li>
              <Link href="/product-list">MEN</Link>
            </li>
            <li>
              <Link href="/product-list">WOMEN</Link>
            </li>
            <li>
              <Link href="/product-list">NEW</Link>
            </li>
            <li>
              <Link href="/product-list">HOT</Link>
            </li>
          </ul>
        </nav>
        <ul className={styles['header-icons']}>
          <li>
            {userId ? (
              <UserDropdown />
            ) : (
              <Link href="/member/login">
                <IoPersonCircleOutline />
              </Link>
            )}
          </li>
          <li>
            <Link href="#">
              <IoHeartOutline />
            </Link>
          </li>
          <li style={userId ? { '--after-content': `"${content}` } : {}}>
            {userId ? (
              <Link href="/cart/cart">
                <IoCartOutline />
              </Link>
            ) : (
              <Link href="/member/login">
                <IoCartOutline />
              </Link>
            )}
          </li>
          <li>
            <BoxDropdown />
          </li>
          <li>
            <NavbarDrawer />
          </li>
        </ul>
      </div>
    </header>
  )
}
