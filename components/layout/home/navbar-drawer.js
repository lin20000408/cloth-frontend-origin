import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import { CiHeart } from 'react-icons/ci'
import { IoMdCart, IoIosMenu, IoMdPerson } from 'react-icons/io'
import { IoGameController, IoClose } from 'react-icons/io5'
import { FaLine, FaInstagram } from 'react-icons/fa'
import styles from '@/styles/header&footer.module.css'
import { ConfigProvider } from 'antd'
import GameDropdown from './game-dropdown'

export default function NavbarDrawer() {
  const [open, setOpen] = useState(false)
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
              <a href="#">
                <IoMdPerson className="link-ddsecondary" />
              </a>
            </li>
            <li>
              <a href="#">
                <CiHeart className="link-ddsecondary" />
              </a>
            </li>
            <li>
              <a href="#">
                <IoMdCart className="link-ddsecondary" />
              </a>
            </li>
            <li>
            <GameDropdown />
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
                <a href="#">TOP</a>
              </li>
              <li>
                <a href="#">MEN</a>
              </li>
              <li>
                <a href="#">WOMEN</a>
              </li>
              <li>
                <a href="#">COUPLE</a>
              </li>
              <li>
                <a href="#">NEW</a>
              </li>
              <li>
                <a href="#">HOT</a>
              </li>
            </ul>
            <ul className={`text-black ${styles['draw-nav1']}`}>
              <li>
                <a href="#">加入會員</a>
              </li>
              <li>
                <a href="#">登出</a>
              </li>
              <li>
                <a href="#">會員中心</a>
              </li>
              <li>
                <a href="#">關於我們</a>
              </li>
              <li>
                <a href="#">客服中心</a>
              </li>
              <li>
                <a href="#">回到主頁</a>
              </li>
              <li>
                <a href="#">色彩學</a>
              </li>
            </ul>
          </nav>
          <div className={styles['footer-follow']}>
            <div className={`bg-ddprimary ${styles['follow-me1']}`}>
              <p className={styles['follow-font']}>FOLLOW ME</p>
              <ul className={styles['footer-icons']}>
                <li>
                  <a href="#">
                    <FaInstagram style={{ fontSize: '24px' }} />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaLine style={{ fontSize: '24px' }} />
                  </a>
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
