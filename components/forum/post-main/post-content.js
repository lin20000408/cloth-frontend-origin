import React from 'react'
import { Card } from 'antd'

const PostContent = ({ timestamp, text, tags }) => {
  return (
    <div className="post-content mt-4">
      <div className="text-content fs-6">
        <Card>
          <div className="timestamp text-ddsecondary">{timestamp}</div>
          <div className="fs-6">{text}</div>
        </Card>
      </div>
      <ul className="tags-list list-unstyled text-ddprimary">
        {tags && tags.map((tag, index) => <li key={index}>#{tag}</li>)}
      </ul>
    </div>
  )
}

export default PostContent
