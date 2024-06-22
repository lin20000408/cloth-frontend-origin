import React from 'react'
import Link from 'next/link'
// import Image from 'next/image'
// import { Image } from 'antd'

import styles from '@/styles/forum/forum-profile.module.css'
import { Avatar, Card } from 'antd'
import Image from 'next/image'

const { Meta } = Card

const postItemStyle = {
  width: '400px',
}

export default function PostItem({ size = 400 }) {
  return (
    <div style={postItemStyle} className={`${styles['post-item']} post-item`}>
      <Link href="/forum/post" className={`${styles['post-thumb']}`}>
        <Image
          width={size}
          height={size}
          className="rounded-4"
          src="/images/forum/pop_cat.jpg"
          alt=""
          fluid
        />
      </Link>
      <div className="post-info">2024-03-31</div>
    </div>
    // <Link href={'/forum/post'} className="text-decoration-none">
    //   <Card
    //     style={{ width: 200 }}
    //     cover={
    //       <Image
    //         width={'200'}
    //         height={'200'}
    //         layout="responsive"
    //         alt="example"
    //         src="/images/forum/pop_cat.jpg"
    //       />
    //     }
    //   >
    //     <Meta
    //       avatar={<Avatar src="/images/forum/pop_cat.jpg" />}
    //       title="@tdkr114514"
    //       description="2024-03-31"
    //     />
    //   </Card>
    // </Link>
  )
}
