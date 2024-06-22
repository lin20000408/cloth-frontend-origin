import React, { useState, useEffect } from 'react'
import styles from '@/styles/header&footer.module.css'
import { CiHeart } from 'react-icons/ci'
import { IoMdCart, IoIosMenu, IoMdPerson } from 'react-icons/io'
import {
  IoCartOutline,
  IoHeartOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5'
import { FaLine, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import NavbarDrawer from './navbar-drawer'
import MainMenu from './menubar'
import BoxDropdown from './box-dropdown'
import UserDropdown from './user-dropdown'
import { useCart } from '@/hooks/use-cart-state'
import { selectFavorite } from '@/services/product' //打api 到後端拿 收藏資料
import { loadLikes, loadBookmarks } from '@/services/post'
export default function Navbar() {
  const [userId, setUserId] = useState(null) // 定義狀態用於存儲用戶ID
  const [content, setContent] = useState('')
  const { cart } = useCart()
  // 抓取後端json
  const {
    userIdData,
    favorites,
    setFavoritesData,
    likes,
    setLikesData,
    bookmarks,
    setBookmarksData,
  } = useBackEndData({
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
      getBookmarkData(userIdData)
      getLikeData(userIdData)
    } else if (userIdData === null && userIdLocalStorage !== null) {
      // 沒有context的userIdData就從localStorage取出user.id資料
      setUserId(userIdLocalStorage)
      getfavoriteData(userIdLocalStorage)
      getBookmarkData(userIdLocalStorage)
      getLikeData(userIdLocalStorage)
    }
    // console.log('userId:', userIdData) //查詢是否有抓到id
  }, [userId])

  useEffect(() => {
    setContent(cart.totalItems)
  }, [cart])
  //拿取收藏資料
  const getfavoriteData = async (userIdData) => {
    const data = await selectFavorite(userIdData)
    setFavoritesData(data)
  }

  const getBookmarkData = async (userIdData) => {
    const data = await loadBookmarks(userIdData)
    setBookmarksData(data)
  }

  const getLikeData = async (userIdData) => {
    const data = await loadLikes(userIdData)
    setLikesData(data)
  }

  return (
    <>
      <header className={styles['header']}>
        <div className={`bg-headerColor ${styles['header-background']} `}>
          <div className={styles['LOGO']}>
            <Link href="http://localhost:3000/">
              <img src="/images/logo.svg" alt="" />
            </Link>
          </div>
          <nav className={styles['header-nav']}>
            <MainMenu />
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
    </>
  )
}
