import React, { createContext, useState, useContext } from 'react'

// 創建一個新的上下文（Context）(不用動!!!)
const BackEndCatchDataContext = createContext()

// 定義一個提供者（Provider）組件，用於提供資料給所有子組件 (不用動!!!)
export const BackEndCatchDataProvider = ({ children }) => {
  // 使用 useState 創建一個狀態，初始值為 null (增加自己要用的名稱)
  const [colorologyData, setColorologyData] = useState(null)
  const [shareData, setShareData] = useState(null)
  const [memberDefaultData, setMemberDefaultData] = useState(null)
  const [userIdData, setUserIdData] = useState(null)
  const [orderCoupon, setOrderCoupon] = useState(0)
  const [passStore711, setPassStore711] = useState([])
  const [pdDetailsId, setPdDetailsId] = useState(0)
  const [orderDetailsData, setOrderDetailsData] = useState([])
  const [avatarData, setAvatarData] = useState(null)
  const [favorites, setFavorites] = useState([]) // 我的收藏清單使用
  const [sizeContext, setSizeContext] = useState(null) //size
  const [bookmarks, setBookmarks] = useState([])
  const [likes, setLikes] = useState([])

  // 定義一個函式，用於更新色彩學資料 (增加自己要用的名稱)
  const updateColorologyData = (data) => {
    setColorologyData(data)
  }

  // 定義一個函式，用於更新共用資料 (增加自己要用的名稱)
  const updateSharData = (data) => {
    setShareData(data)
  }

  // 定義一個函式，用於更新會員資料 (增加自己要用的名稱)
  const updateUserIdData = (data) => {
    setUserIdData(data)
  }

  // 定義一個函式，用於共用優惠券價錢 (增加自己要用的名稱)

  const updatepassStore711 = (data) => {
    setPassStore711(data)
  }

  const updatpdDetailsId = (data) => {
    setPdDetailsId(data)
  }

  const updateOrderDetailsData = (data) => {
    setOrderDetailsData(data)
  }
  // 定義一個函式，用於清除會員ID
  const clearUserIdData = () => {
    setUserIdData(null)
    setFavorites([])
  }

  // 定義一個函式，用於拿取會員基本資料 (增加自己要用的名稱)
  const updateMemberDefaultData = (data) => {
    setMemberDefaultData(data)
  }

  // 定義一個函式，用於共用優惠券價錢 (增加自己要用的名稱)
  const updateOrderCoupon = (data) => {
    setOrderCoupon(data)
  }

  // 定義一個函式，用於更新大頭照資料
  const updateAvatarData = (data) => {
    setAvatarData(data)
  }
  // 定義一個函式，用於更新收藏資料
  const setFavoritesData = (data) => {
    setFavorites(data)
  }
  // 定義一個函式，用於更新尺寸資料 (增加自己要用的名稱)
  const updateSizeContext = (data) => {
    setSizeContext(data)
  }

  const setBookmarksData = (data) => {
    setBookmarks(data)
  }

  const setLikesData = (data) => {
    setLikes(data)
  }

  // 返回一個上下文提供者，將資料和更新函式提供給子組件 (value值 增加自己要用的名稱)
  return (
    <BackEndCatchDataContext.Provider
      value={{
        colorologyData, //色彩學
        updateColorologyData, //色彩學
        shareData, //共用
        updateSharData, //共用
        userIdData, //會員ID
        updateUserIdData, //會員ID
        clearUserIdData, // 清除會員ID
        updateMemberDefaultData, //拿取會員基本資料
        memberDefaultData, //拿取會員基本資料
        orderCoupon, //拿取優惠券金額
        updateOrderCoupon, //拿取優惠券金額
        updatepassStore711, //拿取7-11資料寫入資料庫
        passStore711, //拿取7-11資料寫入資料庫
        pdDetailsId, //拿取剛生成order_detailsID
        updatpdDetailsId, //拿取剛生成order_detailsID
        updateOrderDetailsData,
        orderDetailsData,
        avatarData, //大頭照
        updateAvatarData, //大頭照
        favorites, //我的收藏
        setFavoritesData, //設定我的收藏
        sizeContext, //尺寸
        updateSizeContext, //尺寸
        bookmarks,
        setBookmarksData,
        likes,
        setLikesData,
      }}
    >
      {children}
    </BackEndCatchDataContext.Provider>
  )
}

// 自定義一個鉤子（Hook），用於在組件中訪問上下文中的資料 (不用動!!!)
export const useBackEndData = () => useContext(BackEndCatchDataContext)
