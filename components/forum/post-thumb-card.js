import React from 'react'
import Link from 'next/link'

import { Avatar, Card } from 'antd'
import Image from 'next/image'

const { Meta } = Card

export default function PostThumbCard({
  size = 200,
  userId = 'tdkr114514',
  date = '2024-03-31',
}) {
  return (
    <Link href={'/forum/post'} className="text-decoration-none">
      <Card
        style={{ width: size }}
        cover={
          <Image
            width={size}
            height={size}
            layout="responsive"
            alt="example"
            src="/images/forum/pop_cat.jpg"
          />
        }
      >
        <Meta
          avatar={<Avatar src="/images/forum/pop_cat.jpg" />}
          title={'@' + userId}
          description={date}
        />
      </Card>
    </Link>
  )
}
