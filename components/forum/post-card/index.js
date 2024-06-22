import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, Image, Avatar, Space } from 'antd'
import PostContent from '../post-main/post-content'
import ActionBookmark from '../actions/bookmark'
import ActionLike from '../actions/like'
import ActionComment from '../actions/comment'
import { loadBio } from '@/services/bio'

const PostCard = ({ post }) => {
  const [bio, setBio] = useState({
    id: 0,
    name: '',
    avatar: '',
    gender: '',
    bio: '',
  })

  const getBio = async (uid) => {
    const data = await loadBio(uid)
    setBio(data)
  }

  useEffect(() => {
    if (post.user_id) {
      getBio(post.user_id)
    }
  }, [post.user_id])

  return (
    <Card
      className="w-auto"
      hoverable
      cover={
        post.picture && (
          <Link
            href={`/forum/post/${post.id}`}
            className="text-decoration-none"
          >
            <img
              className="img-fluid"
              src={`/images/forum/${post.picture
                .replace('uploads/', '')
                .replace('uploads\\', '')}`}
            />
          </Link>
        )
      }
      actions={[
        <>
          <ActionLike pc_id={post.id} />
          {post.like_counts}
        </>,
        <>
          <ActionComment article_id={post.id} />{' '}
          {/* Pass setComments to ActionComment */}
        </>,
        <>
          <ActionBookmark pc_id={post.id} />
        </>,
      ]}
    >
      <Space>
        <Avatar src={bio && bio.avatar} />
        <span className="fw-bold fs-6">{bio && bio.name}</span>
      </Space>
      <Link href={`/forum/post/${post.id}`} className="text-decoration-none">
        <PostContent text={(post.text && post.text) || 'Lorem ipsum'} />
      </Link>
    </Card>
  )
}

export default PostCard
