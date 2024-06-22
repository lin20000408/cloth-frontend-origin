import React, { useState, useEffect } from 'react'
import { Drawer } from 'antd'
import { IoIosMenu } from 'react-icons/io'
import {
  IoCartOutline,
  IoHeartOutline,
  IoPersonCircleOutline,
  IoClose,
} from 'react-icons/io5'
import { FaLine, FaInstagram } from 'react-icons/fa'
import styles from '@/styles/header&footer.module.css'
import { ConfigProvider } from 'antd'
import Link from 'next/link'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import BoxDropdown from './box-dropdown'
import UserDropdown from './user-dropdown'

export default function NavbarDrawer() {
  const [open, setOpen] = useState(false)
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

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <>
      <ConfigProvider
        theme={{
          token: {},
        }}
      >
        <IoIosMenu
          type="primary"
          onClick={showDrawer}
          // rootStyle={{ height: 'top' }}
        ></IoIosMenu>
        <Drawer
          height="550"
          style={{ borderRadius: '20px' }}
          title=<ul className={`${styles['draw-icons']}`}>
            <IoClose
              onClick={() => {
                setOpen(false)
              }}
              style={{ position: 'absolute', top: '5', right: '10' }}
            />
            <li>
              {userId ? (
                <UserDropdown />
              ) : (
                <Link href="/member/login" style={{ color: '#000' }}>
                  <IoPersonCircleOutline />
                </Link>
              )}
            </li>
            <li>
              <Link href="#" style={{ color: '#000' }}>
                <IoHeartOutline />
              </Link>
            </li>
            <li>
              {userId ? (
                <Link href="/cart/cart" style={{ color: '#000' }}>
                  <IoCartOutline />
                </Link>
              ) : (
                <Link href="/member/login" style={{ color: '#000' }}>
                  <IoCartOutline />
                </Link>
              )}
            </li>
            <li>
              <BoxDropdown />
            </li>
          </ul>
          onClose={onClose}
          open={open}
          closable={false}
          placement="top"
        >
          <nav className={styles['draw-navs']}>
            <ul className={styles['draw-nav1']}>
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
            <ul className={`text-black ${styles['draw-nav1']}`}>
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
            <div className={`bg-ddprimary ${styles['follow-me1']}`}>
              <p className={styles['follow-font']}>FOLLOW ME</p>
              <ul className={styles['footer-icons']}>
                <li>
                  <Link href="#">
                    <FaInstagram style={{ fontSize: '24px' }} />
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <FaLine style={{ fontSize: '24px' }} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Drawer>
      </ConfigProvider>

      <style jsx>
        {`
          li {
            list-style: none;
          }
          ul {
            padding: 0;
          }
        `}
      </style>
    </>
  )
}
