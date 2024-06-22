import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useLoader } from '@/hooks/use-loader' //載入動畫
import { eslint } from '@/next.config'
import { IoReturnUpBackOutline } from 'react-icons/io5' //返回icon
import { loadpr } from '@/services/product' //api
import { Radio, Input, Dropdown, Image as AntImage, ConfigProvider } from 'antd'
import PrDetailCarousel from '@/components/productList/prDetailCarousel' //商品詳情輪播
import ProductInfo from '@/components/product-card/right-side/product-info' //右上商品詳情
import styles from '@/styles/product-ditail.module.css' //商品詳情css
import pstyles from '@/styles/product/Product.module.css' //視覺差css
import { BackEndCatchDataProvider } from '@/hooks/use-backEnd-catchData' //會員...
import { useCart } from '@/hooks/use-cart-state' //加入購物車
import RecommendedSize from '@/components/recommended-size' //尺寸推薦
import { useBackEndData } from '@/hooks/use-backEnd-catchData' //context
import PrReview from '@/components/comment-review/pr-review'
import Recommend from '@/components/productList/recommend' //推薦商品
import ProductHeart from '@/components/productList/productHeart' //收藏
import parallaxLogo from '@/public/product/imgs/parallax-logo.png' //視覺差照片
import { Toaster, toast } from 'react-hot-toast' //吐司套件
// 資料來源:
// https://my-json-server.typicode.com/eyesofkids/json-fake-data/products/${pid}
export default function ProductDetail() {
  // 自訂控制開關載入動畫
  // 要手動控制關閉，Context要給參數close={0} `<LoaderProvider close={0}>`
  // showLoader是開載入動畫函式，hideLoader為關動畫函式(手動控制關閉才有用)
  const { showLoader, hideLoader, loading, delay } = useLoader()

  // 宣告能得到動態路由的路由器
  //router.quert(物件)
  //router.isReady(布林),如果式true代表頁面完成水合作用可以得到pid
  const router = useRouter()
  const { pid } = router.query
  //狀態區
  const [pr, setPr] = useState([]) //商品資料
  const [colorArr, setColorArr] = useState([]) //所有商品顏色
  const [recommend, setRecommend] = useState([]) //所有推薦商品
  const [sizeChart, setSizeChart] = useState([]) //所有商品尺寸圖
  const [chooseColor, setChooseColor] = useState(0) //顏色選擇
  const [sizeChange, setSizeChange] = useState(0) //size改變數量
  const [quantity, setQuantity] = useState(1) //購買商品數量
  const [phD, setPhD] = useState([]) //詳情照片
  const [sizeOption, setSizeOption] = useState([]) //size選項
  const [chooseSCT, setChooseSCT] = useState(0) //商品尺寸圖選項
  const [fpcid, setFpcid] = useState('') //設定收藏id
  const [addCart, setAddCart] = useState([]) //加入購物車狀態
  const { addItem } = useCart() //加入購物車方式
  const [backendColorsData, setBackendColorsData] = useState(null) //資料庫顏色
  const [sizeData, setSizeData] = useState(null) //資料庫尺寸
  // 上一頁傳來的後端json
  const { sizeContext } = useBackEndData({
    size: 0,
  })
  // const sizeChartOption = ['公分', '英吋']
  const items = [
    {
      key: 'sizeChartOption1',
      label: <div onClick={() => setChooseSCT(0)}>公分</div>,
    },
    {
      key: 'sizeChartOption2',
      label: <div onClick={() => setChooseSCT(1)}>英吋</div>,
    },
  ]
  // [{
  //   id: 1,
  //   name: '花秤山',
  //   pdColor: '黑色的',
  //   price: 3000,
  //   size: 'xl',
  //   img: '/PROJECT.M 側開岔寬鬆印花素TEE-休閒-牛仔藍.jpg',
  // }]
  //螞蟻組件
  const handleOptionChange = (e) => {
    setChooseColor(parseInt(e.target.value))
  }

  const handleSizeOptionChange = (e) => {
    setSizeChange(parseInt(e.target.value))
  }

  const handleClick = () => {
    try {
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      ) //抓會員id

      // 判斷 userIdLocalStorage 是否存在且大於 0
      if (userIdLocalStorage > 0) {
        addItem(addCart) // 假設 addItem 是一個已經定義的函數，用於添加項目到購物車
        // console.log(addCart)
        toast.success(
          `${addCart.name}(${addCart.pdColor})(${addCart.size})${addCart.quantity}件\n加入購物車`
        )
      } else {
        toast.error('需要登入會員') // 可以改成更具體的錯誤處理或提示信息
      }
    } catch (error) {
      console.error('尚未登入:', error)
    }
  }
  // 抓取商品資料
  const getpr = async (pid) => {
    try {
      // 只有商品
      const data = await loadpr(pid)
      if (typeof data === 'object' && data !== null) {
        const group = {}
        data.product.map((v) => {
          if (!group[v.product_id]) {
            group[v.product_id] = {
              id: v.product_id, //product_id
              tag_id: v.tag_id,
              mt_id: v.mt_id,
              st_id: v.st_id,
              ma_id: v.ma_id,
              name: v.product_name,
              price: v.price,
              tag_name: v.tag_name,
              mt_name: v.mt_name,
              st_name: v.st_name,
              ma_name: v.ma_name,
              colors: [],
            }
          }
          const existingColorIndex = group[v.product_id].colors.findIndex(
            (color) => color.color_id === v.color_id
          )
          if (existingColorIndex === -1) {
            group[v.product_id].colors.push({
              pc_id: v.product_color_id,
              color_id: v.color_id,
              color_name: v.color_name,
              color: v.color,
              photos: [],
              sizes: [],
            })
          }
          const colorIndex =
            existingColorIndex !== -1
              ? existingColorIndex
              : group[v.product_id].colors.length - 1
          const photos = [v.ph1, v.ph2, v.ph3, v.ph4, v.ph5].filter(
            (photo) =>
              photo &&
              !group[v.product_id].colors[colorIndex].photos.includes(photo)
          )
          group[v.product_id].colors[colorIndex].photos.push(...photos)
          group[v.product_id].colors[colorIndex].sizes.push({
            size_id: v.size_id,
            size_name: v.size_name,
            stock: v.stock,
          })
        })

        const result = Object.values(group)
        console.log(result[0])
        setChooseColor(
          result[0].colors.findIndex((color) => color.pc_id === Number(pid))
        )
        setPr(result[0])
        //抓取商品顏色
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
        //推薦商品資料
        if (Array.isArray(data.recommend) && recommend.length === 0) {
          setRecommend(data.recommend)
        }
        //推薦商品資料
        if (Array.isArray(data.sizeChart) && sizeChart.length === 0) {
          setSizeChart(data.sizeChart)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  // 處理送去購物車的商品資料
  const cartProduct = (data, chooseColor, sizeChange, quantity) => {
    console.log(data)
    const productInfo = {
      id: data.id, //商品id
      pid: data.colors[chooseColor].pc_id, //商品顏色id
      name: data.name,
      pdColor: data.colors[chooseColor].color_name, // 假设只取第一个颜色
      price: data.price,
      size: data.colors[chooseColor].sizes[sizeChange].size_name, // 假设只取第一个尺寸
      img: data.colors[chooseColor].photos[0], // 假设只取第一个图片
      quantity: quantity,
    }
    return productInfo
  }

  useEffect(() => {
    if (
      Array.isArray(pr.colors) &&
      Array.isArray(pr.colors[chooseColor].photos)
    ) {
      const sizes = pr.colors[chooseColor].sizes.map((v) => ({
        size_name: v.size_name,
        stock: v.stock,
      }))
      const photos = pr.colors[chooseColor].photos || []
      setSizeOption(sizes)
      setPhD(photos)
      setAddCart(cartProduct(pr, chooseColor, sizeChange, quantity))
    }
  }, [pr, chooseColor, sizeChange, quantity])
  //
  useEffect(() => {
    console.log(router.query)
    showLoader() //開啟動畫
    if (router.isReady) {
      //記得{}
      getpr(pid)
      setFpcid(Number(pid))
    }
  }, [router.isReady, pid])

  // 當 sizeContext 改變時，觸發 useEffect。
  // 這確保在 sizeContext 改變時，更新大小數據。
  useEffect(() => {
    if (sizeContext) {
      // 如果 sizeContext 不為空，將其設置為 setSizeData。
      setSizeData(sizeContext)
    }
  }, [sizeContext])
  // console.log('sizeContext:', sizeContext)
  useEffect(() => {
    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    if (userIdLocalStorage !== null) {
      fetchRecommendedColorologyData()
      fetchRecommendedSizeData()
    }
  }, [])

  // 顏色api
  const fetchRecommendedColorologyData = async () => {
    // // 從context的userIdData中取出user.id資料
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/colorology-result/${userIdLocalStorage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const responseData = await response.json() // 解析數據
      // 處理響應
      if (responseData.status === 'success') {
        // 從responseData中取出colorology_checklist資料
        const colorology = responseData.data.colorology_checklist
        console.log('從後端接收到的數據：', colorology.basic_color_upper_body_1) // 在控制台console.log接收到的數據

        setBackendColorsData([
          colorology.basic_color_lower_body_1,
          colorology.basic_color_lower_body_2,
          colorology.basic_color_lower_body_3,
          colorology.basic_color_upper_body_1,
          colorology.basic_color_upper_body_2,
          colorology.basic_color_upper_body_3,
          colorology.bright_color_lower_body_1,
          colorology.bright_color_lower_body_2,
          colorology.bright_color_upper_body_1,
          colorology.bright_color_upper_body_2,
        ])
      } else {
        console.warn('請求失敗')
        return {}
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return {}
    }
  }

  // 尺寸api
  const fetchRecommendedSizeData = async () => {
    // // 從context的userIdData中取出user.id資料
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/member-edit/recommended-size/${userIdLocalStorage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const responseData = await response.json() // 解析數據
      // 處理響應
      if (responseData.status === 'success') {
        const recommendedSizeData = responseData.data.result
        setSizeData(recommendedSizeData.map((item) => item.recommended_size))
        // console.log('從後端接收到的數據：', recommendedSizeData) // 在控制台console.log接收到的數據
        console.log(
          '從後端接收到的數據：',
          recommendedSizeData[0].recommended_size
        ) // 在控制台console.log接收到的數據
      } else {
        console.warn('請求失敗')
        return {}
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return {}
    }
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffffff', // 主要顏色
            fontFamily: 'IBM Plex Sans TC',
            colorText: 'black',
          },
          components: {
            Radio: {
              buttonCheckedBg: '#000000',
            },
          },
        }}
      >
        <div
          className="container justify-content-center pt-5 "
          style={{ marginTop: '50px', marginBottom: '100px' }}
        >
          {/* 將 sizeContext 傳遞給 RecommendedSize 組件作為 recommendedSizes 屬性。
            RecommendedSize 組件將根據提供的建議尺寸來呈現內容。 */}
          <RecommendedSize recommendedSizes={sizeContext} />
          {/* <div>
          <Link href={`/product-list`} style={{ color: 'black' }}>
            <IoReturnUpBackOutline size={'30px'} />
          </Link>
        </div> */}
          {/* 上半部 */}
          <div className="row mx-0 px-0  pt-5">
            {/* 左側 */}
            <div className="col-sm-6 col-12 mx-0 ">
              <PrDetailCarousel phGroup={phD} />
              <div className="d-flex flex-column align-items-center mt-2">
                <div className="d-flex justify-content-around align-items-center w-100 ">
                  <div className="">[尺寸表]</div>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomLeft"
                  >
                    <button className="btn btn-dark">切換單位</button>
                  </Dropdown>
                </div>
                <div className="mt-2 w-75">
                  {sizeChart.length > 0 ? (
                    <img
                      src={sizeChart[chooseSCT].size_chart}
                      className="w-100"
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            {/* 右側 */}
            <div className={`col-sm-6 col-12  py-0 ps-sm-5  ps-0 pe-2 `}>
              {/* 商品顏色尺寸 */}
              <div
                className={`row flex-column justify-content-start align-items-start ${styles['pgroup']} `}
              >
                <div className="text-danger-emphasis fs-4">D.D.SHOP原創</div>
                <span className=" fs-5">
                  {pr.name}(
                  {Array.isArray(pr.colors)
                    ? pr.colors[chooseColor].color_name
                    : ''}
                  )
                </span>
                <span>NT${pr.price}</span>
                <span className="text-danger-emphasis">產品編號:{pr.id}</span>
                <hr className="mb-5" />
                <div className="">
                  {/* 顏色區 */}
                  {Array.isArray(pr.colors)
                    ? pr.colors.map((v, i) => {
                        {
                          /* console.log('前端颜色：', v.color) */
                        }
                        const colorMatched =
                          backendColorsData &&
                          backendColorsData.includes(v.color) // 檢查當前顏色是否與後端返回的顏色匹配
                        return (
                          <>
                            <Link
                              href={`/product-list/${v.pc_id}`}
                              key={`color ${i}`}
                            >
                              <Radio.Button
                                // key={`color ${i}`}
                                type="radio"
                                value={i}
                                className={`${styles['recommended-color']} me-3`}
                                style={{
                                  backgroundColor: v.color,
                                  borderRadius: '10%',
                                  border: '1px black solid',
                                }}
                                name="colorgroup"
                                checked={chooseColor === i}
                                onChange={handleOptionChange}
                              >
                                {/* 顏色是否為推薦顏色 */}
                                {colorMatched && (
                                  <div
                                    className={styles['recommended-color-img']}
                                  >
                                    <img
                                      src="../images/recommended.png"
                                      className={styles['recommended-img']}
                                    />
                                  </div>
                                )}
                              </Radio.Button>
                            </Link>
                          </>
                        )
                      })
                    : 'LODING'}
                </div>
                <hr className="mb-5" />
                <div>
                  {/* 尺寸區 */}
                  {sizeOption?.map((v, i) => {
                    const recommendedSize = sizeData && sizeData[0] // 假設推薦尺寸是 Context 中的第一個尺寸
                    {
                      console.log('前端尺寸：', recommendedSize)
                    }
                    const isRecommendedSize = v.size_name === recommendedSize // 是否是推薦尺寸
                    {
                      console.log('前端尺寸2：', isRecommendedSize)
                    }
                    return (
                      <>
                        <Radio.Button
                          key={`size${i}`}
                          type="radio"
                          value={i}
                          name="sizegroup"
                          checked={sizeChange === i}
                          onChange={handleSizeOptionChange}
                          className={`${styles['recommended-size']} me-3`}
                          style={{
                            borderRadius: 0,
                            marginRight: '10px',
                            width: '40px',
                            border: '1PX black solid',
                          }}
                        >
                          {v.size_name}
                          {/* 尺寸是否為推薦尺寸 */}
                          {isRecommendedSize && (
                            <div className={styles['recommended-size-img']}>
                              <img
                                src="../images/recommended.png"
                                className={styles['recommended-img']}
                              />
                            </div>
                          )}
                        </Radio.Button>
                      </>
                    )
                  }) || 'LOADING'}
                </div>
                <hr className="mt-2" />
                <div
                  className="d-flex justify-content-between
                justify-content-xxl-start align-items-center"
                >
                  <div>
                    庫存:
                    {sizeOption.length > 0 ? sizeOption[sizeChange].stock : '0'}
                  </div>
                  <div
                    className={`d-flex justify-content-xxl-evenly 
                  justify-content-between
                  ${styles['addgroup']}`}
                  >
                    <button
                      className="btn bg-ddprimary text-white"
                      onClick={() => {
                        setQuantity(quantity - 1)
                      }}
                    >
                      -
                    </button>
                    <Input
                      value={quantity >= 1 ? quantity : setQuantity(1)}
                      style={{ width: '100px' }}
                      className="text-center"
                    />
                    {console.log(quantity)}
                    <button
                      className="btn bg-ddprimary text-white"
                      onClick={() => {
                        setQuantity(quantity + 1)
                      }}
                    >
                      +
                    </button>
                    <button
                      className="btn bg-ddprimary text-white"
                      onClick={() => {
                        handleClick()
                      }}
                    >
                      add
                    </button>
                  </div>
                  {Array.isArray(pr.colors)
                    ? pr.colors.map((v, i) => {
                        if (v.pc_id === fpcid) {
                          {
                            /* console.log(fpcid)
                          console.log(v.pc_id) */
                          }
                          return (
                            <ProductHeart
                              key={`Heartv${v.pc_id}`}
                              pc_id={v.pc_id}
                              pname={v.color_name}
                            />
                          )
                        }
                      })
                    : ''}
                </div>
                {/* // !change */}
                <PrReview id={pr.id} />
              </div>
            </div>
          </div>
          {/* 下半部 */}
          <div className="row mx-0 px-0  pt-5">
            {/* 推薦商品 */}
            <div className="d-flex flex-column align-items-center">
              <h2>推薦商品</h2>
              {recommend.length > 0 ? (
                <Recommend recommend={recommend} colorArr={colorArr} />
              ) : (
                ''
              )}
            </div>
          </div>
          {/* TODO:視差滾動 */}
          <section
            className={`my-5 d-flex justify-content-center align-items-center ${pstyles['parallax-scrolling-bg']} ${pstyles['parallax-BGimg']}   `}
          >
            <div className="d-flex">
              <Image
                src={parallaxLogo}
                alt=""
                width={'140'}
                height={'150'}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSU"
              />
            </div>
          </section>
        </div>
      </ConfigProvider>
    </>
  )
}
