// const baseUrl = 'https://my-json-server.typicode.com/eyesofkids/json-fake-data/products'
const baseUrl = 'http://localhost:3005/api/single-products'

const sample = [
  {
    product_id: 1,
    name: '  ',
    price: 10,
    tag_name: '11',
    mt_name: '11',
    st_name: '11',
    ma_name: '11',
    ph1: '11',
    ph2: '11',
    ph3: '11',
    ph4: '11',
    ph5: '11',
    phs: '11',
    color_id: 10,
    color_name: '11',
    color: '1',
  },
  {
    product_id: 2,
    name: '  ',
    price: 10,
    tag_name: '11',
    mt_name: '11',
    st_name: '11',
    ma_name: '11',
    ph1: '11',
    ph2: '11',
    ph3: '11',
    ph4: '11',
    ph5: '11',
    phs: '11',
    color_id: 10,
    color_name: '11',
    color: '1',
  },
]



export const loadProduct = async (pid = '') => {
  try {
    if (!pid) throw new Error('pid是必要參數')

    const res = await fetch(`${baseUrl}/${pid}`)
    const resData = await res.json()
    // 判斷是否成功
    if (resData.status === 'success') {
      return resData.data.products
    } else {
      console.warn('沒有得到資料')
      // 用範例資料當作例外資料
      return sample
    }
  } catch (e) {
    console.error(e)
    // 用範例資料當作例外資料
    return sample
  }
}
