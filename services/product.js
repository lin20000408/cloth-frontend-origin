//後端路由
const baseUrl = 'http://localhost:3005/api/my-products'
const favoriteUrl = 'http://localhost:3005/api/favorite'
//可有假資料,目前回傳回來的欄位
const test = [
  {
    id: 4,
    tag_id: 2,
    mt_id: 2,
    st_id: 2,
    ma_id: 2,
    sc_id: null,
    name: '商品2',
    price: 20,
    created_at: '2024-05-16 00:46:04',
    updated_at: '2024-05-16 00:46:04',
    tag_name: '女裝',
    mt_name: '外套',
    st_name: '休閒',
    ma_name: '纖維',
    product_id: 1,
    color_id: 2,
    ph1: null,
    ph2: null,
    ph3: null,
    ph4: null,
    ph5: null,
    phs: null,
    color_name: '灰色',
    color: '#c0c2c1',
    product_color_id: 6,
    size_id: 4,
    stock: 3340,
    size_name: 'XL',
  },
]

//只有商品資料
// export const laodprs = async () => {
//   try {
//     const res = await fetch(baseUrl)
//     const resData = await res.json()
//     //判斷是否成功
//     if (resData.status === 'success') {
//       return resData.data.products
//     } else {
//       console.warn('沒有商品資料')
//       return []
//     }
//   } catch (e) {
//     console.error(e)
//   }
// }
// export const loadpr = async (pid) => {
//   try {
//     const res = await fetch(`${baseUrl}/${pid}`)
//     const resData = await res.json()
//     //判斷是否成功
//     if (resData.status === 'success') {
//       return resData.data.product
//     } else {
//       console.warn('沒有商品資料')
//       return {}
//     }
//   } catch (e) {
//     console.error(e)
//   }
// }

//全部的Data資料
export const laodprs = async (params = {}) => {
  // 使用URLSearchParams產生查詢字串，內建的api幫忙把物件值轉換成查尋字串
  const searchParams = new URLSearchParams(params)
  const url = `${baseUrl}?${searchParams.toString()}`
  try {
    const res = await fetch(url)
    const resData = await res.json()
    //判斷是否成功
    if (resData.status === 'success') {
      return resData.data
    } else {
      console.warn('沒有商品資料')
      return {}
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const loadpr = async (pid) => {
  try {
    const res = await fetch(`${baseUrl}/${pid}`)
    const resData = await res.json()
    //判斷是否成功
    if (resData.status === 'success') {
      // 只取了商品
      return resData.data
    } else {
      console.warn('沒有商品資料')
      return {}
    }
  } catch (e) {
    console.error(e)
  }
}

//收藏
export const selectFavorite = async (uid) => {
  const url = `${favoriteUrl}/${uid}`
  try {
    const res = await fetch(url)
    const resData = await res.json()
    //判斷是否成功
    if (resData.status === 'success') {
      // console.log(resData.favoriteData)
      return resData.favoriteData
    } else {
      console.warn('沒有收藏商品資料')
      return {}
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}
export const addFavorite = async (uid, pid) => {
  // 使用URLSearchParams產生查詢字串，內建的api幫忙把物件值轉換成查尋字串
  const url = `${favoriteUrl}/addFavorite`
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify({
    uid: uid,
    pid: pid,
  })
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  }
  try {
    const res = await fetch(url, requestOptions)
    const resData = await res.json()
    //判斷是否成功
    if (resData.status === 'success') {
      return resData.data
    } else {
      console.warn(resData.message)
      return {}
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}
export const deleteFavorite = async (uid, pid) => {
  // 使用URLSearchParams產生查詢字串，內建的api幫忙把物件值轉換成查尋字串
  const url = `${favoriteUrl}/deleteFavorite`
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify({
    uid: uid,
    pid: pid,
  })
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
  }
  try {
    const res = await fetch(url, requestOptions)
    const resData = await res.json()
    //判斷是否成功
    if (resData.status === 'success') {
      return resData.data
    } else {
      console.warn(resData.message)
      return {}
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}
