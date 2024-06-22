import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import TimelineSectionTrending from './timeline-section-trending'

export default function TimelineAsideRight() {
  return (
    <aside className="right">
      <section>
        <div id="search" className="mb-3">
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜尋"
            allowClear
            enterButton={<SearchOutlined />}
          />
        </div>
      </section>
      {/* <section>
        <h4 className="mb-3">熱門話題</h4>
        <div className="hashtag-list">
          <ul className="list-unstyled">
            <li>#本日穿搭</li>
            <li>#休閒</li>
            <li>#運動</li>
            <li>#復古</li>
            <li>#牛仔褲</li>
          </ul>
        </div>
      </section> */}
      <TimelineSectionTrending />
    </aside>
  )
}
