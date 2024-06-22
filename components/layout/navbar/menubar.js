import Link from 'next/link'
import styles from '@/components/layout/menubar.module.scss'
import NavlinkTest from '../../cart/nav-link-test'
import { useState } from 'react'
import { useRouter } from 'next/router'

// 說明:
// 選單客製化以靜態方式、移至config檔案或寫死(hard code)來產生是常見
// 選單項目定義在這裡，下面元件程式碼會自動產生對應的dom
// id是作key用的，不重覆即可
// 有下拉的選單需要加一個children的陣列屬性
const menuItems = [
  {
    id: 1,
    label: 'ITEMS',
    href: '/product-list',
  },
  {
    id: 2,
    label: 'MEN',
    href: '/product-list',
    children: [
      {
        id: 100,
        label: '男性外套類',
        main: [
          {
            label: '男性所有外套類',
            href: 'http://localhost:3005/api/my-products?tag=1',
          },
          { label: '男性機能/休閒外套', href: '/men/casual-jackets' },
          { label: '男性量身正裝系列', href: '/men/custom-suits' },
          { label: '男性抗UV/防曬外套', href: '/men/uv-jackets' },
          { label: '男性針織外套', href: '/men/knitwear' },
        ],
        href: '/product-list',
      },
      {
        id: 101,
        label: '男性上衣類',
        main: [
          { label: '男性所有上衣類', href: '/men/jackets' },
          { label: '男性機能/休閒上衣', href: '/men/casual-jackets' },
          { label: '男性量身上衣系列', href: '/men/custom-suits' },
          { label: '男性抗UV/防曬上衣', href: '/men/uv-jackets' },
          { label: '男性針織上衣', href: '/men/knitwear' },
        ],
        href: '/member/register',
      },
      {
        id: 102,
        label: '男性下身類',
        main: [
          { label: '男性所有下身類', href: '/men/jackets' },
          { label: '男性機能/休閒下身', href: '/men/casual-jackets' },
          { label: '男性量身下身系列', href: '/men/custom-suits' },
          { label: '男性抗UV/防曬下身', href: '/men/uv-jackets' },
          { label: '男性針織下身', href: '/men/knitwear' },
        ],
        href: '/member/forget-password',
      },
      {
        id: 103,
        label: '男性內衣類',
        main: [
          { label: '男性所有內衣類', href: '/men/jackets' },
          { label: '男性機能/休閒內衣', href: '/men/casual-jackets' },
          { label: '男性量身內衣系列', href: '/men/custom-suits' },
          { label: '男性抗UV/防曬內衣', href: '/men/uv-jackets' },
          { label: '男性針織內衣', href: '/men/knitwear' },
        ],
        href: '/member/forget-password',
      },
      {
        id: 104,
        label: '男性家居類',
        main: [
          { label: '男性所有家居類', href: '/men/jackets' },
          { label: '男性機能/休閒家居', href: '/men/casual-jackets' },
          { label: '男性量身家居系列', href: '/men/custom-suits' },
          { label: '男性抗UV/防曬家居', href: '/men/uv-jackets' },
          { label: '男性針織家居', href: '/men/knitwear' },
        ],
        href: '/member/forget-password',
      },
      {
        id: 105,
        label: '男性配件類',
        main: [
          { label: '男性所有配件類', href: '/men/jackets' },
          { label: '男性機能/休閒配件', href: '/men/casual-jackets' },
          { label: '男性量身配件系列', href: '/men/custom-suits' },
          { label: '男性抗UV/防曬配件', href: '/men/uv-jackets' },
          { label: '男性針織配件', href: '/men/knitwear' },
        ],
        href: '/member/forget-password',
      },
    ],
  },
  {
    id: 3,
    label: 'WOMEN',
    href: '/product-list',
    children: [
      {
        id: 100,
        label: '女性外套類',
        main: [
          { label: '女性所有外套類', href: '/men/jackets' },
          { label: '女性機能/休閒外套', href: '/men/casual-jackets' },
          { label: '女性量身正裝系列', href: '/men/custom-suits' },
          { label: '女性抗UV/防曬外套', href: '/men/uv-jackets' },
          { label: '女性針織外套', href: '/men/knitwear' },
        ],
        href: '/member/login',
      },
      {
        id: 101,
        label: '女性上衣類',
        main: [
          { label: '女性所有上衣類', href: '/men/jackets' },
          { label: '女性機能/休閒上衣', href: '/men/casual-jackets' },
          { label: '女性量身上衣系列', href: '/men/custom-suits' },
          { label: '女性抗UV/防曬上衣', href: '/men/uv-jackets' },
          { label: '女性針織上衣', href: '/men/knitwear' },
        ],
        href: '/member/register',
      },
      {
        id: 102,
        label: '女性下身類',
        main: [
          { label: '女性所有下身類', href: '/men/jackets' },
          { label: '女性機能/休閒下身', href: '/men/casual-jackets' },
          { label: '女性量身下身系列', href: '/men/custom-suits' },
          { label: '女性抗UV/防曬下身', href: '/men/uv-jackets' },
          { label: '女性針織下身', href: '/men/knitwear' },
        ],
        href: '/member/forget-password',
      },
      {
        id: 103,
        label: '女性內衣類',
        main: [
          { label: '女性所有內衣類', href: '/men/jackets' },
          { label: '女性機能/休閒內衣', href: '/men/casual-jackets' },
          { label: '女性量身內衣系列', href: '/men/custom-suits' },
          { label: '女性抗UV/防曬內衣', href: '/men/uv-jackets' },
          { label: '女性針織內衣', href: '/men/knitwear' },
        ],
        href: '/member/forget-password',
      },
      {
        id: 104,
        label: '女性家居類',
        main: [
          { label: '女性所有家居類', href: '/men/jackets' },
          { label: '女性機能/休閒家居', href: '/men/casual-jackets' },
          { label: '女性量身家居系列', href: '/men/custom-suits' },
          { label: '女性抗UV/防曬家居', href: '/men/uv-jackets' },
          { label: '女性針織家居', href: '/men/knitwear' },
        ],
        href: '/member/forget-password',
      },
      {
        id: 105,
        label: '女性配件類',
        main: [
          { label: '女性所有配件類', href: '/men/jackets' },
          { label: '女性機能/休閒配件', href: '/men/casual-jackets' },
          { label: '女性量身配件系列', href: '/men/custom-suits' },
          { label: '女性抗UV/防曬配件', href: '/men/uv-jackets' },
          { label: '女性針織配件', href: '/men/knitwear' },
        ],
        href: '/product-list',
      },
    ],
  },
  {
    id: 4,
    label: 'NEW',
    href: '/product-list',
  },
  {
    id: 5,
    label: 'HOT',
    href: '/product-list',
  },
]

export default function MainMenu({ currentRoute = '/' }) {
  const [currentType, setCurrentType] = useState('男性外套類')
  const [clickedItemId, setClickedItemId] = useState(null)
  const router = useRouter() // 確保從 next/router 正確導入
  function handleItemClick(event, id) {
    changeSecondType(event)
    setClickedItemId(id)
  }
  // hover 第一層 (men/women) 改變 第二層分類
  function changeFirstType(event) {
    menuItems.map((v) => {
      if (
        v.children &&
        v.label === event.currentTarget.firstChild.textContent
      ) {
        setCurrentType(v.children[0].label)
        setClickedItemId(v.children[0].id) // 設置第一個子選項為亮起狀態
      }
    })
  }
  // hover 第二層 (男性外套類/男性所有上衣類 等等) 改變第三層分類
  function changeSecondType(event) {
    setCurrentType(event.currentTarget.firstChild.textContent)
  }
  return (
    <>
      <div className="flex-grow-1 ps-xs-0 mx-auto d-flex">
        {menuItems.map((v, i) => {
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
                  className={`nav-link ${styles['label-link']} ${
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
              className={`nav-item dropdown d-flex justify-content-center  ${styles['dropdown']} drop-down`}
              key={v.id}
              id={'dropdown-button-drop-down-centered'}
              drop={'down'}
              onMouseEnter={(event) => {
                changeFirstType(event)
              }}
            >
              <Link
                // 尋找是否有符合 currentRoute 的 children href
                className={`nav-link ${
                  v.children.find((v) => v.href === currentRoute)
                    ? 'active ' + styles['custom-active']
                    : ''
                }`}
                href={v.href}
                role="button"
              >
                {v.label}
              </Link>
              <div
                className={`dropdown-menu ${styles['slideIn']} ${styles['dropdown-menu']}`}
                style={{ marginTop: '30px' }}
                drop={'down'}
              >
                <div
                  style={{
                    borderBottom: '1px solid black',
                    padding: '0 6px 6px 6px',
                  }}
                >
                  {i === 1 ? '男裝分類' : '女裝分類'}
                </div>
                <div className="d-flex">
                  <ul>
                    {v.children.map((v2, index) => {
                      return (
                        <li
                          key={v2.id}
                          onClick={(event) => handleItemClick(event, v2.id)}
                        >
                          <button
                            className={`${styles[('linkBg', 'linkBtn')]} ${
                              currentRoute === v2.href ? 'active' : ''
                            }`}
                            style={
                              clickedItemId === v2.id
                                ? {
                                    backgroundColor: '#ABC8BC',
                                    color: 'white',
                                    width: '100%',
                                  }
                                : {}
                            }
                          >
                            <div className={`px-1`} style={{ width: '200px' }}>
                              {v2.label}
                            </div>
                          </button>
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
