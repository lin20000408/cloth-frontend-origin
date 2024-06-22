import React, { useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { Input } from 'antd'
import { ConfigProvider } from 'antd'
export default function SearchBar(props) {
  const { setSearchList } = props
  const [searchInput, setSearchInput] = useState('')
  const [List, setList] = useState([])
  const SearchDetails = async () => {
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    try {
      const response = await fetch(
        `http://localhost:3005/api/order-list/?userID=${userIdLocalStorage}&orderID=${searchInput}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const responseData = await response.json()
      if (responseData.status === 'success') {
        const searchList = responseData.data.search_list
        setList(searchList)
        setSearchList(searchList)
        console.log('從後端接收到的搜尋訂單數據：', responseData)
        console.log('從後端接收到搜尋訂單數據：', searchList)
      } else {
        console.warn('請求失敗')
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
    }
  }
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              activeBorderColor: '#aabec3',
              activeShadow: '1px 1px 5px #aabec3',
              hoverBorderColor: '#aabec3',
            },
          },
        }}
      >
        <Input
          size="large"
          placeholder="您可以透過訂單編號或商品名稱搜尋"
          prefix={<LuSearch />}
          className="mb-3 bg-white"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value)
          }}
          onPressEnter={SearchDetails} // 按下Enter時觸發SearchDetails
        />
      </ConfigProvider>
    </>
  )
}
