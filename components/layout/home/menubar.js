import Link from 'next/link'
import styles from '@/components/layout/menubar.module.scss'
import NavlinkTest from '../../cart/nav-link-test'
import { useState } from 'react'

// 說明:
// 選單客製化以靜態方式、移至config檔案或寫死(hard code)來產生是常見
// 選單項目定義在這裡，下面元件程式碼會自動產生對應的dom
// id是作key用的，不重覆即可
// 有下拉的選單需要加一個children的陣列屬性
const menuItems = [
  {
    id: 1,
    label: 'TOP',
    href: '/product-list',
  },
  {
    id: 2,
    label: 'MEN',
    href: '/news',
    children: [
      {
        id: 100,
        label: '男性外套類',
        main: [
          '男性所有外套類',
          '男性機能/休閒外套',
          '男性量身正裝系列',
          '男性抗UV/防曬外套',
          '男性針織外套',
        ],
        href: '/member/login',
      },
      {
        id: 101,
        label: '男性上衣類',
        main: [
          '男性所有上衣類',
          '男性機能/休閒上衣',
          '男性量身上衣系列',
          '男性抗UV/防曬上衣',
          '男性針織上衣',
        ],
        href: '/member/register',
      },
      {
        id: 102,
        label: '男性下身類',
        main: [
          '男性所有下身類',
          '男性機能/休閒下身',
          '男性量身下身系列',
          '男性抗UV/防曬下身',
          '男性針織下身',
        ],
        href: '/member/forget-password',
      },
      {
        id: 103,
        label: '男性內衣類',
        main: [
          '男性所有內衣類',
          '男性機能/休閒內衣',
          '男性量身內衣系列',
          '男性抗UV/防曬內衣',
          '男性針織內衣',
        ],
        href: '/member/forget-password',
      },
      {
        id: 104,
        label: '男性家居類',
        main: [
          '男性所有家居類',
          '男性機能/休閒家居',
          '男性量身家居系列',
          '男性抗UV/防曬家居',
          '男性針織家居',
        ],
        href: '/member/forget-password',
      },
      {
        id: 105,
        label: '男性配件類',
        main: [
          '男性所有配件類',
          '男性機能/休閒配件',
          '男性量身配件系列',
          '男性抗UV/防曬配件',
          '男性針織配件',
        ],
        href: '/member/forget-password',
      },
    ],
  },
  {
    id: 3,
    label: 'WOMEN',
    href: '/member',
    children: [
      {
        id: 100,
        label: '女性外套類',
        main: [
          '女性所有外套類',
          '女性機能/休閒外套',
          '女性量身正裝系列',
          '女性抗UV/防曬外套',
          '女性針織外套',
        ],
        href: '/member/login',
      },
      {
        id: 101,
        label: '女性上衣類',
        main: [
          '女性所有上衣類',
          '女性機能/休閒上衣',
          '女性量身上衣系列',
          '女性抗UV/防曬上衣',
          '女性針織上衣',
        ],
        href: '/member/register',
      },
      {
        id: 102,
        label: '女性下身類',
        main: [
          '女性所有下身類',
          '女性機能/休閒下身',
          '女性量身下身系列',
          '女性抗UV/防曬下身',
          '女性針織下身',
        ],
        href: '/member/forget-password',
      },
      {
        id: 103,
        label: '女性內衣類',
        main: [
          '女性所有內衣類',
          '女性機能/休閒內衣',
          '女性量身內衣系列',
          '女性抗UV/防曬內衣',
          '女性針織內衣',
        ],
        href: '/member/forget-password',
      },
      {
        id: 104,
        label: '女性家居類',
        main: [
          '女性所有家居類',
          '女性機能/休閒家居',
          '女性量身家居系列',
          '女性抗UV/防曬家居',
          '女性針織家居',
        ],
        href: '/member/forget-password',
      },
      {
        id: 105,
        label: '女性配件類',
        main: [
          '女性所有配件類',
          '女性機能/休閒配件',
          '女性量身配件系列',
          '女性抗UV/防曬配件',
          '女性針織配件',
        ],
        href: '/member/forget-password',
      },
    ],
  },
  {
    id: 5,
    label: 'HOT',
    href: '/about',
  },
]

export default function MainMenu({ currentRoute = '/' }) {
  const [currentType, setCurrentType] = useState('男性外套類')
  // hover 第一層 (men/women) 改變 第二層分類
  function changeFirstType(event) {
    menuItems.map((v) => {
      if (
        v.children &&
        v.label === event.currentTarget.firstChild.textContent
      ) {
        setCurrentType(v.children[0].label)
      }
    })
  }
  // hover 第二層 (男性外套類/男性所有上衣類 等等) 改變第三層分類
  function changeSecondType(event) {
    setCurrentType(event.currentTarget.firstChild.textContent)
  }
  return (
    <>
      <div className="flex-grow-1 ps-lg-5 ps-xs-0 mx-auto d-flex">
        {menuItems.map((v) => {
          // 用children判斷是否有下拉選單
          if (!v.children) {
            return (
              <li
                className="nav-item"
                key={v.id}
                onMouseEnter={(event) => {
                  changeFirstType(event)
                }}
              >
                <Link
                  className={`nav-link ${
                    currentRoute === v.href
                      ? 'active ' + styles['custom-active']
                      : ''
                  }`}
                  aria-current="page"
                  href={v.href}
                >
                  {v.label}
                </Link>
              </li>
            )
          }

          // 以下為有dropmenu(下拉選單)的選單項目的jsx
          return (
            <li
              className={`nav-item dropdown ${styles['dropdown']}`}
              key={v.id}
              onMouseEnter={(event) => {
                changeFirstType(event)
              }}
            >
              <Link
                // 尋找是否有符合 currentRoute 的 children href
                className={`nav-link  ${
                  v.children.find((v) => v.href === currentRoute)
                    ? 'active ' + styles['custom-active']
                    : ''
                }`}
                href={v.href}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {v.label}
              </Link>
              <div
                className={`dropdown-menu ${styles['slideIn']} ${styles['dropdown-menu']}`}
              >
                <div
                  style={{
                    borderBottom: '1px solid black',
                    padding: '0 6px 6px 6px',
                  }}
                >
                  男裝分類
                </div>
                <div className="d-flex">
                  <ul>
                    {v.children.map((v2) => {
                      return (
                        <li
                          key={v2.id}
                          onMouseEnter={(event) => {
                            changeSecondType(event)
                          }}
                        >
                          <Link
                            className={`dropdown-item ${
                              currentRoute === v2.href ? 'active' : ''
                            }`}
                            href={v2.href}
                          >
                            <div
                              className="px-1 border"
                              style={{ width: '200px' }}
                            >
                              {v2.label}
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>

                  <ul>
                    {v.children.map((v2) => {
                      if (v2.label == currentType) {
                        return (
                          <NavlinkTest
                            key={v2.id}
                            data={v2.main}
                            href={v2.href}
                          />
                        )
                      }
                    })}
                  </ul>
                </div>
              </div>
            </li>
          )
        })}
      </div>
      <style jsx>
        {`
          li {
            list-style: none;
            padding: 10px;
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
