import { useState, useEffect } from 'react'
import { Space } from 'antd'
import PostCard from '@/components/forum/post-card'

export default function PostList({ userId }) {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      let url = 'http://localhost:3005/api/posts?page=1&perpage=10'
      if (userId) {
        url += `&user_id=${userId}`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.data.posts)
      } else {
        console.error('Error fetching posts:', response.statusText)
      }
    } catch (e) {
      console.error('Error fetching posts:', e)
    }
  }

  useEffect(() => {
    getPosts()
  }, [userId])

  return (
    <Space direction="vertical" className="w-100 mb-4">
      {posts.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </Space>
  )
}
