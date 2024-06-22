const baseUrl = 'http://localhost:3005/api/member-bio'

export const loadBio = async (uid = '') => {
  try {
    if (!uid) throw new Error('uid是必要參數')

    const res = await fetch(`${baseUrl}/${uid}`)
    const resData = await res.json()
    // 判斷是否成功
    if (resData.status === 'success') {
      return resData.data.member
    } else {
      console.warn('沒有得到資料')
      // 用範例資料當作例外資料
      // return sample[0]
    }
  } catch (e) {
    console.error(e)
    // 用範例資料當作例外資料
    // return sample[0]
  }
}
