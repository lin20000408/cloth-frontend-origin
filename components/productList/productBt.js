import React, { useEffect, useState } from 'react'
import ButtonEnlarge from '../button/button-enlarge'
import { Button, Drawer, Space, Card, Slider, InputNumber } from 'antd'
import styles from '@/styles/productList.module.css'
export default function ProductBt({
  nameLike = '',
  // setNameLike = () => {},
  tag = [],
  handleTagChecked = () => {},
  mt = [],
  handleMtChecked = () => {},
  style = [],
  handleStyleChecked = () => {},
  priceGte = 0,
  priceLte = 1500,
  setPriceGte = () => {},
  setPriceLte = () => {},
  handlerSearch = () => {},
  orderby = { sort: 'product_color.id', order: 'asc' },
  setOrderby = () => {},
}) {
  const [open, setOpen] = useState(false)
  //標籤選項陣列 number
  const tagOptions = [1, 2]
  const tags = {
    1: '女裝',
    2: '男裝',
  }

  //主類別選項陣列 number
  const mtOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // 主類別名稱對應
  const mtNames = {
    1: '短袖上衣',
    2: '長袖上衣',
    3: '短褲',
    4: '長褲',
    5: '短袖洋裝',
    6: '長袖洋裝',
    7: '短裙',
    8: '長裙',
    9: '長袖外套',
  }
  //風格選項陣列 number
  const styleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  // 風格名稱對應
  const styleNames = {
    1: '工裝',
    2: '文青',
    3: '休閒',
    4: '西裝',
    5: '英倫',
    6: '運動',
    7: '日系',
    8: 'OL',
    9: '性感',
    10: '氣質',
    11: '簡約',
  }
  const priceSlider = (value) => {
    if (value[0] <= value[1]) {
      setPriceGte(value[0])
      setPriceLte(value[1])
    } else {
      setPriceGte(value[1])
      setPriceLte(value[0])
    }
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const closeDrawer = () => {
    setOpen(false)
  }
  const onClose = () => {
    setOpen(false)
  }
  useEffect(() => {}, [])
  return (
    <>
      <button
        className={`btn btn-dark ${styles['btn-type']}`}
        onClick={showDrawer}
      >
        篩選
      </button>
      <Drawer
        // title="Basic Drawer"
        open={open}
        onClose={onClose}
        extra={
          <Space style={{}}>
            {/* <Button onClick={onClose}>Cancel</Button> */}
            {/* 送出按鈕 */}
            <button
              className="btn btn-dark"
              onClick={() => {
                handlerSearch(nameLike)
                closeDrawer()
              }}
            >
              搜尋
            </button>
          </Space>
        }
      >
        {/* 搜尋欄位 */}
        {/* <div>
          名稱:
          <input
            type="text"
            value={nameLike}
            onChange={(e) => {
              setNameLike(e.target.value)
            }}
          />
        </div>
        <hr /> */}
        {/* 性別標籤篩選 */}
        <Card title="性別:" bordered={false}>
          {tagOptions.map((v, i) => {
            return (
              <label
                // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                key={`tag${v}`}
              >
                <input
                  type="checkbox"
                  value={v}
                  checked={tag.includes(v)}
                  onChange={handleTagChecked}
                />
                {tags[v]}
              </label>
            )
          })}
        </Card>
        <hr />
        {/* 主要分類標籤篩選 */}
        <Card title="類別:" bordered={false}>
          {mtOptions.map((v, i) => {
            return (
              <label
                // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                key={`mt${v}`}
              >
                <input
                  type="checkbox"
                  value={v}
                  checked={mt.includes(v)}
                  onChange={handleMtChecked}
                />
                {mtNames[v]}
              </label>
            )
          })}
        </Card>
        <hr />
        {/* 風格篩選 */}
        <Card title="風格:" bordered={false}>
          {styleOptions.map((v, i) => {
            return (
              <label
                // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                key={`style${v}`}
              >
                <input
                  type="checkbox"
                  value={v}
                  checked={style.includes(v)}
                  onChange={handleStyleChecked}
                />
                {styleNames[v]}
              </label>
            )
          })}
        </Card>
        <hr />
        {/* 價格篩選 */}
        <div>
          價格大於:
          <InputNumber
            value={priceGte}
            onChange={(e) => {
              setPriceGte(e)
            }}
          />
          價格小於:
          <InputNumber
            value={priceLte}
            onChange={(e) => {
              setPriceLte(e)
            }}
          />
          <Slider
            range
            defaultValue={[0, 1500]}
            min={0}
            max={1500}
            value={[priceGte, priceLte]}
            onChange={priceSlider}
          />
        </div>
        <hr />
        {/* 排序 */}
        <div>
          <label>
            排序:
            <select
              value={`${orderby.sort},${orderby.order}`}
              onChange={(e) => {
                const selected = e.target.value
                setOrderby({
                  sort: selected.split(',')[0],
                  order: selected.split(',')[1],
                })
              }}
            >
              <option value="product_color.id,asc">ID排序(由小至大)</option>
              <option value="product_color.id,desc">ID排序(由大至小)</option>
              <option value="price, asc">價格排序(由低至高)</option>
              <option value="price, desc">價格排序(由高至低)</option>
            </select>
          </label>
        </div>
      </Drawer>
    </>
  )
}
