import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { laodprs } from '@/services/product'
import BS5Pagination from '@/components/common/bs5-pagination'
import { Input, FloatButton, ConfigProvider } from 'antd'
import { BiSolidToTop } from 'react-icons/bi'
const { Search } = Input
// 元件
import ProductCard from '@/components/product-card/ProductCard'
import styles from '@/styles/productList.module.css'
import ProductBt from '@/components/productList/productBt'
import ButtonEnlarge from '@/components/button/button-enlarge'
import {
  ListMotionContainer,
  ListMotionItem,
} from '@/components/productList/ListMotion'
import InputIME from '@/components/productList/InputIME'
import _ from 'lodash'

// 資料來源:
// https://my-json-server.typicode.com/eyesofkids/json-fake-data/products

// const test = [
//   {
//     id: 1,
//     picture: 'https://via.placeholder.com/150',
//     stock: 5,
//     name: 'iPhone 12 Pro',
//     price: 25000,
//     tags: '蘋果,大螢幕',
//   },
//   {
//     id: 2,
//     picture: 'https://via.placeholder.com/150',
//     stock: 5,
//     name: 'iPhone 12',
//     price: 15000,
//     tags: '蘋果,小螢幕',
//   },
// ]

export default function List() {
  //最後得到的資料
  const [total, setTotal] = useState(0) //商品總數
  const [pr, setPr] = useState([]) //商品資料
  const [colorArr, setColorArr] = useState([]) //全部商品顏色
  const [pageCount, setPageCount] = useState(1) //最少一頁
  const [newp, setNewp] = useState('1') //1 新品
  const [hotp, setHotp] = useState('1') //1 熱門商品
  const [isVisibled, setIsVisable] = useState(false) //控制進出場特效
  const [loding, setLoding] = useState(false)
  //查詢條件用
  const [nameLike, setNameLike] = useState('') //搜尋商品名稱
  const [tag, setTag] = useState([]) //標籤 預設 1女裝 2男裝
  const [mt, setMt] = useState([]) //主要分類
  const [style, setStyle] = useState([]) //風格 預設 1 2 3 4 5
  const [priceGte, setPriceGte] = useState(0) //價格大於等於 預設0
  const [priceLte, setPriceLte] = useState(1500) //價格小於等於 預設1500

  // 排序
  const [orderby, setOrderby] = useState({
    sort: 'product_color.id',
    order: 'asc',
  })

  //分頁用
  const [page, setPage] = useState(1) //預設第幾頁
  const [perpage, setPerpage] = useState(12) //每頁顯示幾項 預設12

  // 加入參數條件params物件
  const getprs = async (params) => {
    // try {
    setIsVisable(false)
    const data = await laodprs(params)

    if (data.pageCount && typeof data.pageCount === 'number') {
      setPageCount(data.pageCount)
    }
    if (data.total && typeof data.total === 'number') {
      setTotal(data.total)
    }

    if (Array.isArray(data.Allproducts) && colorArr.length === 0) {
      const group = {}
      data.Allproducts.forEach((v) => {
        // 如果 group 中已存在该 product_id 的键，则将颜色添加到对应的数组中
        if (group[v.product_id]) {
          if (
            group[v.product_id].includes(v.color) ||
            group[v.product_id].includes(v.product_color_id)
          ) {
            return
          } else {
            group[v.product_id].push(v.color, v.product_color_id)
          }
        } else {
          // 如果 group 中不存在该 product_id 的键，则创建一个新数组，并将颜色添加进去
          group[v.product_id] = [v.color, v.product_color_id]
        }
      })
      setColorArr(group)
    }

    if (Array.isArray(data.products)) {
      setPr(data.products)
    }
    // 切換撥放呈現動畫
    setIsVisable(true)
    setLoding(false)
  }

  // console.log(pr)
  // console.log(userIdL)
  // console.log(favorite)

  // 分頁列表觸發事件用
  const handlePageClick = (e) => {
    setPage(e.selected + 1) //分頁套件用法
  }
  //按下全部搜尋按鈕
  const allSearch = () => {
    setPage(1) //設定倒回第一頁
    const params = {
      page: 1, //每次搜尋導向第一頁
      perpage,
      sort: orderby.sort,
      order: orderby.order,
      name_like: '',
      tag: [],
      style: [],
      price_gte: 0,
      price_lte: 1500,
    }
    setLoding(true)
    getprs(params)
  }
  //按下熱門搜尋按鈕
  const hotpSearch = () => {
    setPage(1) //設定倒回第一頁
    const params = {
      page: 1, //每次搜尋導向第一頁
      perpage,
      sort: orderby.sort,
      order: orderby.order,
      // name_like: nameLike,
      // tag: tag.join(','),
      // style: style.join(','),
      // price_gte: priceGte,
      // price_lte: priceLte,
      hotp: hotp,
    }
    setLoding(true)
    getprs(params)
  }
  //按下新品搜尋按鈕
  const newpSearch = () => {
    setPage(1) //設定倒回第一頁
    const params = {
      page: 1, //每次搜尋導向第一頁
      perpage,
      // sort: orderby.sort,
      // order: orderby.order,
      // name_like: nameLike,
      // tag: tag.join(','),
      // style: style.join(','),
      // price_gte: priceGte,
      // price_lte: priceLte,
      newp: newp,
    }
    setLoding(true)
    getprs(params)
  }
  //按下搜尋按鈕
  const handlerSearch = (nameLike) => {
    setPage(1) //設定倒回第一頁

    const params = {
      page: 1, //每次搜尋導向第一頁
      perpage,
      sort: orderby.sort,
      order: orderby.order,
      name_like: nameLike,
      tag: tag.join(','),
      style: style.join(','),
      price_gte: priceGte,
      price_lte: priceLte,
      mt: mt.join(','),
    }
    setLoding(true)
    getprs(params)
  }

  // debounce function + useCallback
  // 用途: 當不斷輸入input時，同一時間內要先停止觸發事件，直到輸入停止，400ms為等待時間
  // 使用debounce的主因，是因項目呈現、退場動畫、重新排位動畫三者均需計算與時間
  // 觸發太頻繁時，會造成動畫卡頓或卡住的現象
  const debounceHandleSearch = useCallback(_.debounce(handlerSearch, 400), [])

  const motionChange = (e) => {
    // 可控元件綁用state使用
    setNameLike(e.target.value)

    // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
    const searchWord = e.target.value.trim().toLowerCase()

    // 傳至debounceFn中
    debounceHandleSearch(searchWord)
  }
  //

  //標籤確認
  const handleTagChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    // 因為tag是數字 所以要記得轉型
    const tv = parseInt(e.target.value)
    // 判斷是否有在陣列中
    if (tag.includes(tv)) {
      // 如果有===>移出陣列
      const nextTag = tag.filter((v) => v !== tv)
      setTag(nextTag)
    } else {
      // 否則===>加入陣列
      const nextTag = [...tag, tv]
      setTag(nextTag)
    }
  }
  //分類確認
  const handleMtChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    // 因為tag是數字 所以要記得轉型
    const tv = parseInt(e.target.value)
    // 判斷是否有在陣列中
    if (mt.includes(tv)) {
      // 如果有===>移出陣列
      const nextMt = mt.filter((v) => v !== tv)
      setMt(nextMt)
    } else {
      // 否則===>加入陣列
      const nextMt = [...mt, tv]
      setMt(nextMt)
    }
  }
  //風格確認
  const handleStyleChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    // 因為tag是數字 所以要記得轉型
    const tv = parseInt(e.target.value)
    // 判斷是否有在陣列中
    if (style.includes(tv)) {
      // 如果有===>移出陣列
      const nextStyle = style.filter((v) => v !== tv)
      setStyle(nextStyle)
    } else {
      // 否則===>加入陣列
      const nextStyle = [...style, tv]
      setStyle(nextStyle)
    }
  }

  useEffect(() => {
    // 先設定參數值
    const params = {
      page,
      perpage,
      sort: orderby.sort,
      order: orderby.order,
      name_like: nameLike,
      tag: tag.join(','),
      style: style.join(','),
      price_gte: priceGte,
      price_lte: priceLte,
      mt: mt.join(','),
    }
    getprs(params)
  }, [page, perpage, orderby])
  return (
    <>
      <ConfigProvider
        theme={{
          // token: {
          //   colorPrimary: '#ffffff', // 主要顏色
          //   fontFamily: 'IBM Plex Sans TC',
          //   colorText: 'black',
          // },
          components: {
            Button: {
              defaultHoverBorderColor: '#ABC8BC',
              defaultActiveBorderColor: '#ABC8BC',
              defaultBorderColor: '#ABC8BC',
              defaultActiveColor: '#ABC8BC',
              defaultShadow: '0 0 0 rgba(0, 0, 0, 0.02)',
            },
            Input: {
              activeBorderColor: '#ABC8BC',
              activeShadow: '0 0 0 0px rgba(5, 145, 255, 0.1)',
              hoverBorderColor: '#ABC8BC',
            },
          },
        }}
      >
        <div className="container " style={{ marginTop: 70 }}>
          <div className="row justify-content-center align-items-center">
            {/* 上方列表 */}
            <div
              className={`row justify-content-center align-items-center mb-3 p-0 ${styles['product-top']} `}
            >
              <div className={`p-0 ${styles['top-link']}`}>
                <Link
                  href="/"
                  style={{
                    fontWeight: '600',
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  首頁&nbsp; /
                </Link>
                {tag.length === 0
                  ? '全部商品'
                  : tag.length === 1 && tag[0] === 1
                  ? '女裝'
                  : tag.length === 1 && tag[0] === 2
                  ? '男裝'
                  : '全部商品'}
              </div>
              {/* 收尋區塊 */}
              <Search
                type="text"
                // className="form-control ${styles['search-group']}"
                className={`input-group p-0 ${styles['search-group']}`}
                placeholder="請輸入商品名稱"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                value={nameLike}
                onChange={motionChange}
                allowClear
                loading={loding}
              
              />

              {/* 按鈕區塊 */}
              <div
                className={`d-flex justify-content-evenly align-items-center p-0 ${styles['product-topbtg']}`}
              >
                <button
                  type="button"
                  onClick={allSearch}
                  className={`btn btn-dark ${styles['btn-type']}`}
                >
                  全部
                </button>
                <button
                  type="button"
                  onClick={newpSearch}
                  className={`btn btn-dark ${styles['btn-type']}`}
                >
                  新品
                </button>
                <button
                  type="button"
                  onClick={hotpSearch}
                  className={`btn btn-dark ${styles['btn-type']}`}
                >
                  熱門
                </button>
                <ProductBt
                  nameLike={nameLike}
                  // setNameLike={setNameLike}
                  tag={tag}
                  handleTagChecked={handleTagChecked}
                  mt={mt}
                  handleMtChecked={handleMtChecked}
                  style={style}
                  handleStyleChecked={handleStyleChecked}
                  priceGte={priceGte}
                  priceLte={priceLte}
                  setPriceGte={setPriceGte}
                  setPriceLte={setPriceLte}
                  handlerSearch={handlerSearch}
                  orderby={orderby}
                  setOrderby={setOrderby}
                />
              </div>
            </div>

            {/* 商品列表 */}
            {pr.length > 0 ? (
              <>
                <ListMotionContainer
                  visible={isVisibled}
                  element="div"
                  className="row row-cols-2 row-cols-xxl-4 gy-3 justify-content-start align-items-center flex-wrap"
                >
                  {pr.map((v) => (
                    <ListMotionItem
                      key={v.product_color_id}
                      element="div"
                      noShift
                      className="col"
                    >
                      <ProductCard
                        pc_id={v.product_color_id}
                        product_id={v.product_id}
                        ProductsName={v.product_name}
                        ProductsPrice={v.price}
                        st_name={v.st_name}
                        phGroup={[v.ph1, v.ph2]}
                        colorName={v.color_name}
                        color={v.color}
                        colorArr={colorArr[v.product_id]}
                      />
                    </ListMotionItem>
                  ))}
                </ListMotionContainer>
                {/* 分頁按鈕 */}
                <div>
                  <FloatButton.BackTop
                    shape="circle"
                    style={{
                      height: '40px',
                      width: '40px',
                      // padding: 10,
                    }}
                    icon={<BiSolidToTop />}
                    duration="300ms"
                    className={`${styles['backtop']}`}
                  />
                </div>
                <div className="mt-5 mb-5">
                  <BS5Pagination
                    forcePage={page - 1} // 預設頁
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                  />
                </div>
              </>
            ) : (
              <div className="w-100 text-center">查無相關商品...</div>
            )}
          </div>
        </div>
      </ConfigProvider>
    </>
  )
}
