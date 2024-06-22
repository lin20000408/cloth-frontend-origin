import { useState, useCallback } from 'react'
import InputIME from '@/components/InputIME'
import _ from 'lodash'

function DemoInput(props) {
  const [search, setSearch] = useState('')
  const [validationCssClassname, setValidationCssClassname] = useState('')

  // 處理過濾的函式
  const handleSearch = (searchWord) => {
    if (!searchWord) {
      setValidationCssClassname('')
      return
    }

    if (searchWord.length <= 10 && searchWord.length >= 6) {
      setValidationCssClassname('is-valid')
    } else {
      setValidationCssClassname('is-invalid')
    }
  }

  // debounce function + useCallback
  // 用途: 當不斷輸入input時，同一時間內要先停止觸發事件，直到輸入停止，400ms為等待時間
  // 使用debounce的主因，是因項目呈現、退場動畫、重新排位動畫三者均需計算與時間
  // 觸發太頻繁時，會造成動畫卡頓或卡住的現象
  const debounceHandleSearch = useCallback(_.debounce(handleSearch, 400), [])

  const handleChange = (e) => {
    // 可控元件綁用state使用
    setSearch(e.target.value)

    // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
    const searchWord = e.target.value.trim().toLowerCase()

    // 傳至debounceFn中
    debounceHandleSearch(searchWord)
  }

  return (
    <div className="container" style={{ minWidth: 1200, minHeight: '90vh' }}>
      <div className="row">
        <div className="col-auto">
          <InputIME
            type="text"
            value={search}
            placeholder="輸入名稱過濾搜尋"
            onChange={handleChange}
            className={`form-control ${validationCssClassname}`}
            minLength="6"
            maxLength="10"
          />
        </div>
      </div>
    </div>
  )
}

export default DemoInput
