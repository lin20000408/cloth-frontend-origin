const baseUrl = 'http://localhost:3005/api/posts'
const bookmarkUrl = 'http://localhost:3005/api/bookmark'
const likeUrl = 'http://localhost:3005/api/like'

const sample = [
  {
    id: 1,
    picture: 'https://via.placeholder.com/150',
    stock: 5,
    name: '無資料預設範例-1',
    price: 25000,
    tags: '蘋果,大螢幕',
  },
  {
    id: 2,
    picture: 'https://via.placeholder.com/150',
    stock: 5,
    name: '無資料預設範例-2',
    price: 15000,
    tags: '蘋果,小螢幕',
  },
]

// 因應要分頁和查詢，所以回應整個data
export const loadPosts = async (params = {}) => {
  // 使用URLSearchParams產生查詢字串
  const searchParams = new URLSearchParams(params)
  const url = `${baseUrl}?${searchParams.toString()}`

  try {
    const res = await fetch(url)
    const resData = await res.json()
    // 判斷是否成功
    if (resData.status === 'success') {
      // 因應要分頁和查詢，所以回應整個data
      return resData.data
    } else {
      console.warn('沒有得到資料')
      return {}
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const loadPost = async (pid = '') => {
  try {
    if (!pid) throw new Error('pid是必要參數')

    const res = await fetch(`${baseUrl}/${pid}`)
    const resData = await res.json()
    // 判斷是否成功
    if (resData.status === 'success') {
      return resData.data.posts
    } else {
      console.warn('沒有得到資料')
      // 用範例資料當作例外資料
      return sample[0]
    }
  } catch (e) {
    console.error(e)
    // 用範例資料當作例外資料
    return sample[0]
  }
}

export const loadBookmarks = async (uid = 0) => {
  // 使用URLSearchParams產生查詢字串
  const url = `${bookmarkUrl}/${uid}`

  try {
    const res = await fetch(url)
    const resData = await res.json()
    // 判斷是否成功
    if (resData.status === 'success') {
      // 因應要分頁和查詢，所以回應整個data
      return resData.bookmarks
    } else {
      console.warn('沒有得到資料')
      return {}
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const addBookmark = async (uid, pid) => {
  // 使用URLSearchParams產生查詢字串，內建的api幫忙把物件值轉換成查尋字串
  const url = `${bookmarkUrl}/add`
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

export const deleteBookmark = async (uid, pid) => {
  // 使用URLSearchParams產生查詢字串，內建的api幫忙把物件值轉換成查尋字串
  const url = `${bookmarkUrl}/delete`
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

export const loadLikes = async (uid = 0) => {
  // 使用URLSearchParams產生查詢字串
  const url = `${likeUrl}/${uid}`

  try {
    const res = await fetch(url)
    const resData = await res.json()
    // 判斷是否成功
    if (resData.status === 'success') {
      // 因應要分頁和查詢，所以回應整個data
      return resData.bookmarks
    } else {
      console.warn('沒有得到資料')
      return {}
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export const addLike = async (uid, pid) => {
  // 使用URLSearchParams產生查詢字串，內建的api幫忙把物件值轉換成查尋字串
  const url = `${likeUrl}/add`
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

export const deleteLike = async (uid, pid) => {
  // 使用URLSearchParams產生查詢字串，內建的api幫忙把物件值轉換成查尋字串
  const url = `${likeUrl}/delete`
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
