const baseUrl = 'http://localhost:3005/api/comment'

const sample = [
  {
    id: 1,
    user_id: 1,
    article_id: 1,
    content: '無資料預設範例-1',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 1,
    article_id: 2,
    content: '無資料預設範例-2',
    created_at: new Date().toISOString(),
  },
]

// Load all comments
export const loadComments = async (params = {}) => {
  const searchParams = new URLSearchParams(params)
  const url = `${baseUrl}?${searchParams.toString()}`

  try {
    const res = await fetch(url)
    const resData = await res.json()
    if (resData.status === 'success') {
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

// Load a single comment by ID
export const loadComment = async (cid = '') => {
  try {
    if (!cid) throw new Error('cid是必要參數')

    const res = await fetch(`${baseUrl}/${cid}`)
    const resData = await res.json()
    if (resData.status === 'success') {
      return resData.data.comments
    } else {
      console.warn('沒有得到資料')
      return sample[0]
    }
  } catch (e) {
    console.error(e)
    return sample[0]
  }
}

// Add a new comment
export const addComment = async (uid, aid, content) => {
  const url = `${baseUrl}`
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify({
    user_id: uid,
    article_id: aid,
    content: content,
  })
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  }
  try {
    const res = await fetch(url, requestOptions)
    const resData = await res.json()
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

// Delete a comment
export const deleteComment = async (id) => {
  const url = `${baseUrl}/${id}` // Assuming baseUrl is defined elsewhere
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  }

  try {
    const res = await fetch(url, requestOptions)
    const resData = await res.json()
    if (resData.status === 'success') {
      return resData.message // Returning the success message
    } else {
      console.warn(resData.message)
      throw new Error(resData.message) // Throwing an error for unsuccessful requests
    }
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete comment') // Throwing an error for network or server errors
  }
}
