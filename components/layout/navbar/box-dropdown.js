import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Dropdown, Space, ConfigProvider } from 'antd'
import { IoGridOutline } from 'react-icons/io5'
import styles from '@/styles/header&footer.module.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function BoxDropdown() {
  const [userId, setUserId] = useState(null) // 定義狀態用於存儲用戶ID
  const [index, setIndex] = useState(0) // 定義狀態用於存儲下拉選單中當前選擇的項目的索引
  const { asPath } = useRouter() // 獲取當前路徑
  // console.log(asPath)
  const [isHovered1, setIsHovered1] = useState(false)
  const [isHovered2, setIsHovered2] = useState(false)
  const [isHovered3, setIsHovered3] = useState(false)
  const { userIdData } = useBackEndData({ id: 0 }) // 抓取後端json

  // 根據當前路徑返回對應的色彩學頁面連結
  const getColorologyLink = () => {
    switch (asPath) {
      case '/colorology':
        return '/colorology'
      case '/colorology/colorology-result':
        return '/colorology/colorology-result'
      default:
        return null
    }
  }

  // 根據當前路徑返回對應的塔羅牌頁面連結
  const getTarotLink = () => {
    switch (asPath) {
      case '/tarot':
        return '/tarot'
      case '/tarot#':
        return '/tarot#'
      case '/tarot/tarot-drawCards':
        return '/tarot/tarot-drawCards'
      case '/tarot/tarot-result':
        return '/tarot/tarot-result'
      case '/tarot/tarot-recommend':
        return '/tarot/tarot-recommend'
      default:
        return null
    }
  }

  // 根據當前路徑返回對應的論壇頁面連結
  const getForumLink = () => {
    switch (asPath) {
      case '/forum/timeline':
        return '/forum/timeline'
      default:
        return null
    }
  }

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

  const items = [
    {
      key: '1',
      link: getColorologyLink(),
      label: (
        <Link
          href={userId ? '/colorology' : '/member/login'} // 如果userId存在，則跳轉到色彩學頁面，否則跳轉到登錄頁面
          className={styles['box-dropdown']}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
          style={{ color: isHovered1 || index === 0 ? 'white' : 'initial' }}
        >
          色彩學
        </Link>
      ),
    },
    {
      key: '2',
      link: getTarotLink(),
      label: (
        <Link
          href={userId ? '/tarot' : '/member/login'} // 如果userId存在，則跳轉到塔羅牌頁面，否則跳轉到登錄頁面
          className={styles['box-dropdown']}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          style={{ color: isHovered2 || index === 1 ? 'white' : 'initial' }}
        >
          塔羅牌
        </Link>
      ),
    },
    {
      key: '3',
      link: getForumLink(),
      label: (
        <Link
          href={userId ? '/forum/timeline' : '/member/login'} // 如果userId存在，則跳轉到論壇頁面，否則跳轉到登錄頁面
          className={styles['box-dropdown']}
          onMouseEnter={() => setIsHovered3(true)}
          onMouseLeave={() => setIsHovered3(false)}
          style={{ color: isHovered3 || index === 2 ? 'white' : 'initial' }}
        >
          論壇
        </Link>
      ),
    },
  ]

  useEffect(() => {
    // 根據當前路徑設置下拉選單中當前選擇的項目的索引
    const currentIndex = items.findIndex((item) => item.link === asPath)

    // 如果 `currentIndex` 不等於 -1，表示找到了與當前路徑匹配的項目，則將該項目在 `items` 數組中的索引值賦值給 `index` 狀態；
    // 如果未找到匹配的項目，則將 `null` 賦值給 `index` 狀態，表示沒有選中任何項目。
    setIndex(currentIndex !== -1 ? currentIndex : null)
  }, [asPath])

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'IBM Plex Sans TC',
          },
          components: {
            Dropdown: {
              colorPrimary: 'white',
              controlItemBgHover: '#abc8bc',
              controlItemBgActive: '#00917c',
              controlItemBgActiveHover: '#00917c',
            },
          },
        }}
      >
        <Space direction="vertical">
          <Space wrap>
            <Dropdown
              menu={{
                items,
                selectable: true,

                // 如果索引不為空，將索引加1後轉為字符串形式作為選中的鍵值；否則設置為空數組表示沒有選中任何項目
                selectedKeys: index !== null ? [String(index + 1)] : [],
              }}
              placement="bottom"
            >
              <IoGridOutline style={{ fontSize: '23px' }} />
            </Dropdown>
          </Space>
        </Space>
      </ConfigProvider>
    </>
  )
}
