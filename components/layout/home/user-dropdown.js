import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Dropdown, Space, ConfigProvider } from 'antd'
import { IoPersonCircleOutline } from 'react-icons/io5'
import styles from '@/styles/header&footer.module.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function UserDropdown() {
  const [index, setIndex] = useState(0) // 定義狀態用於存儲下拉選單中當前選擇的項目的索引
  const router = useRouter() // 獲取路由實例
  const { asPath } = router // 從路由實例中解構出當前路徑
  const [isHovered1, setIsHovered1] = useState(false)
  const [isHovered2, setIsHovered2] = useState(false)
  const { clearUserIdData } = useBackEndData({ id: 0 }) // 抓取後端json

  //*登出功能
  const logoutUrl = 'http://localhost:3005/api/member-logout'
  const handleLogout = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('userKey')
    console.log(token)
    try {
      const response = await fetch(logoutUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, //? 寄送token，讓驗證的token被現在宋過去的token給覆蓋掉
        },
      })

      if (response.ok) {
        const result = await response.json()
        console.log(result)

        localStorage.removeItem('hasShownAnimation')

        // 清除本地存儲的 會員id
        localStorage.removeItem('userIdLocalStorage')

        // 清除本地存儲的 token
        // localStorage.removeItem('userKey')
        // 跳转到登录页面或其他需要的页面

        // 清除Context中的所有数据
        clearUserIdData()

        // 根据当前页面路径跳转到相应的页面
        const currentPath = window.location.pathname
        if (currentPath.startsWith('/member')) {
          router.push('http://localhost:3000/member/login')
        } else if (currentPath.startsWith('/order')) {
          router.push('http://localhost:3000/member/login')
        } else if (currentPath.startsWith('/coupon')) {
          router.push('http://localhost:3000/member/login')
        } else if (currentPath.startsWith('/colorology')) {
          router.push('http://localhost:3000/member/login')
        } else if (currentPath.startsWith('/tarot')) {
          router.push('http://localhost:3000/member/login')
        } else if (currentPath.startsWith('/forum')) {
          router.push('http://localhost:3000/member/login')
        } else {
          window.location.reload()
        }
      } else {
        // 處理錯誤情況
        console.error('Failed to logout')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  // 根據當前路徑返回對應的頁面連結
  const getUserLink = () => {
    switch (asPath) {
      case '/member/edit-personal-data':
        return '/member/edit-personal-data'
      case '/member/edit-address':
        return '/member/edit-address'
      case '/member/phone-sidebar':
        return '/member/phone-sidebar'
      case '/order/order-list':
        return '/order/order-list'
      case '/coupon':
        return '/coupon'
      default:
        return null
    }
  }

  useEffect(() => {
    // 根據當前路徑設置下拉選單中當前選擇的項目的索引
    const currentIndex = items.findIndex((item) => item.link === asPath)

    // 如果 `currentIndex` 不等於 -1，表示找到了與當前路徑匹配的項目，則將該項目在 `items` 數組中的索引值賦值給 `index` 狀態；
    // 如果未找到匹配的項目，則將 `null` 賦值給 `index` 狀態，表示沒有選中任何項目。
    setIndex(currentIndex !== -1 ? currentIndex : null)
  }, [asPath])

  const items = [
    {
      key: '1',
      link: getUserLink(),
      label: (
        <Link
          href={
            window.innerWidth < 768
              ? '/member/phone-sidebar'
              : '/member/edit-personal-data'
          }
          className={styles['user-dropdown-button']}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
          style={{ color: isHovered1 || index === 0 ? 'white' : 'initial' }}
        >
          會員中心
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <button
          onClick={handleLogout}
          className={styles['user-dropdown-button']}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          style={{ color: isHovered2 || index === 1 ? 'white' : 'initial' }}
        >
          登 出
        </button>
      ),
    },
  ]

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
              <IoPersonCircleOutline />
            </Dropdown>
          </Space>
        </Space>
      </ConfigProvider>
    </>
  )
}
