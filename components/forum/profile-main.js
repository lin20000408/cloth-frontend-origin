import React, { useState } from 'react'
import { Radio } from 'antd'
import PostList from './post-list'
import BookmarkList from './post-list/bookmark-list'

const options = [
  {
    label: '我的貼文',
    value: 'posts',
  },
  {
    label: '我的收藏',
    value: 'bookmarks',
  },
]

const BelowComponent = ({ selectedValue, userId }) => {
  // Render different content based on the selected radio button value
  let content
  if (selectedValue === 'posts') {
    content = <PostList userId={userId} />
  } else if (selectedValue === 'bookmarks') {
    content = <BookmarkList userId={userId} />
  } else {
    content = <div>No content selected</div>
  }

  return <div>{content}</div>
}

export default function ProfileNav({ userId }) {
  const [value, setValue] = useState('posts') // Default value should match one of the options
  const onChange = ({ target: { value } }) => {
    console.log('radio1 checked', value)
    setValue(value)
  }

  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        <Radio.Group
          options={options}
          onChange={onChange}
          value={value}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <BelowComponent selectedValue={value} userId={userId} />
    </div>
  )
}
