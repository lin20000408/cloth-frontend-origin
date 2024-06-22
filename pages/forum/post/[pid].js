import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ConfigProvider, Card, Image, Space } from 'antd'
import UserProfileHeader from '@/components/forum/user-profile-header'
import Comment from '@/components/forum/post-main/comment'
import ActionBookmark from '@/components/forum/actions/bookmark'
import ActionLike from '@/components/forum/actions/like'
import ActionComment from '@/components/forum/actions/comment'
import { loadPost } from '@/services/post'
import { loadBio } from '@/services/bio'
import { loadComment } from '@/services/comment'
import styles from '@/styles/forum/post.module.css'

const Comments = ({ comments = [] }) => (
  <Space direction="vertical" size="small" className="d-flex">
    {Array.isArray(comments) ? (
      comments.map((comment, index) => (
        <Comment key={index} uid={comment.user_id} text={comment.content} />
      ))
    ) : (
      <div>No comments available</div>
    )}
  </Space>
)

const PostContent = ({ timestamp, text }) => (
  <div className="post-content mt-4">
    <div className="text-content fs-6">
      <Card>
        <div className="timestamp text-ddsecondary">{timestamp}</div>
        <div className="fs-6">{text}</div>
      </Card>
    </div>
  </div>
)

const Post = ({ post, bio, comments, setComments }) => {
  const containerClasses = `d-flex flex-column flex-lg-row gap-3 container justify-content-center ${
    !post.picture ? 'col-lg-6' : ''
  }`

  return (
    <div className={containerClasses}>
      {post.picture ? (
        <div className={`photo d-lg-flex flex-lg-column col-lg-6`}>
          <Image
            className="img-fluid"
            src={`/images/forum/${post.picture
              .replace('uploads/', '')
              .replace('uploads\\', '')}`}
            alt=""
          />
        </div>
      ) : null}
      <div
        className={`d-flex flex-column w-100 ${
          !post.picture ? 'align-items-center' : ''
        }`}
      >
        <Card
          className="post-right d-flex flex-column w-100 mb-4"
          actions={[
            <>
              <ActionLike pc_id={post.id} />
              {post.like_counts}
            </>,
            <>
              <ActionComment article_id={post.id} setComments={setComments} />
            </>,
            <>
              <ActionBookmark pc_id={post.id} />
            </>,
          ]}
        >
          <UserProfileHeader
            id={bio.id}
            avatar={bio.avatar}
            name={bio.name}
            gender={bio.gender}
            height={bio.height}
            bio={bio.bio}
            hideBio
          />
          <div className={`d-flex d-lg-none flex-lg-column col-lg-6`}>
            <Image className="img-fluid" src={post.picture} alt="" />
          </div>
          <PostContent timestamp={post.created_at} text={post.text} />
        </Card>
        <div className="comments w-100">
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  )
}

export default function Detail() {
  const router = useRouter()

  const [post, setPost] = useState({
    id: 0,
    user_id: 0,
    category: '',
    text: '',
    picture: '',
  })

  const [bio, setBio] = useState({
    id: 0,
    nickname: '',
    avatar: '',
    gender: '',
    bio: '',
  })

  const [comments, setComments] = useState([])

  const getPost = async (pid) => {
    const data = await loadPost(pid)
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      setPost(data)
    }
  }

  const getBio = async (uid) => {
    const data = await loadBio(uid)
    setBio(data)
  }

  const getComments = async (postId) => {
    try {
      const loadedComments = await loadComment(postId)
      setComments(Array.isArray(loadedComments) ? loadedComments : [])
    } catch (error) {
      console.error('Error loading comments:', error)
      setComments([]) // Set to an empty array in case of error
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { pid } = router.query
      getPost(pid)
    }
  }, [router.isReady])

  useEffect(() => {
    if (post.user_id) {
      getBio(post.user_id)
    }
  }, [post.user_id])

  useEffect(() => {
    if (post.id) {
      getComments(post.id)
    }
  }, [post.id])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--bs-font-sans-serif)',
          colorPrimary: '#ABC8BC', // 主要顏色
        },
      }}
    >
      <Link href="/forum/timeline">回到論壇首頁</Link>
      <Post
        post={post}
        bio={bio}
        comments={comments}
        setComments={setComments}
      />
      <div className="d-lg-none" style={{ height: '50px' }}></div>
    </ConfigProvider>
  )
}
