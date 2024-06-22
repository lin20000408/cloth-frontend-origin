// import ListGroup from 'react-bootstrap/ListGroup'
import { useState } from 'react'
import { Radio } from 'antd'

const options = [
  {
    label: '我的貼文',
    value: 'posts',
  },
  {
    label: '我的收藏',
    value: 'bookmarks',
  },
  {
    label: '我的追蹤',
    value: 'followings',
  },
]

export default function ProfileNav() {
  const [value, setValue] = useState('Apple')
  const onChange = ({ target: { value } }) => {
    console.log('radio1 checked', value)
    setValue(value)
  }

  return (
    <div className="d-flex justify-content-center mb-3">
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  )
}
