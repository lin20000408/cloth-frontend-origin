import { useState, useEffect } from 'react'
import { Space } from 'antd'
import PostCard from '@/components/forum/post-card'

export default function BookmarkList({ userId }) {
  const [posts, setPosts] = useState([])

  const getBookmarks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/bookmark/${userId}`
      )
      if (response.ok) {
        const data = await response.json()
        return data.bookmarks.map((bookmark) => bookmark.pid)
      } else {
        console.error('Error fetching bookmarks:', response.statusText)
        return []
      }
    } catch (e) {
      console.error('Error fetching bookmarks:', e)
      return []
    }
  }

  const getPostById = async (pid) => {
    try {
      const response = await fetch(`http://localhost:3005/api/posts/${pid}`)
      if (response.ok) {
        const data = await response.json()
        console.log('???', data.data.posts)
        return data.data.posts
      } else {
        console.error(`Error fetching post ${pid}:`, response.statusText)
        return null
      }
    } catch (e) {
      console.error(`Error fetching post ${pid}:`, e)
      return null
    }
  }

  const getPosts = async () => {
    try {
      const postIds = await getBookmarks()
      const postPromises = postIds.map((pid) => getPostById(pid))
      const postResults = await Promise.all(postPromises)
      console.log('postResults:', postResults) // Log postResults to check if it contains null values
      const validPosts = postResults.filter((post) => post !== null)
      console.log('validPosts:', validPosts) // Log validPosts to check if it contains the expected data
      setPosts(validPosts)
    } catch (e) {
      console.error('Error fetching posts:', e)
    }
  }

  useEffect(() => {
    if (userId) {
      getPosts()
    }
  }, [userId])

  return (
    <Space direction="vertical" className="w-100 mb-4">
      {posts.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </Space>
  )
}
