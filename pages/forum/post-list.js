import { Space } from 'antd'
import PostCard from '@/components/forum/post-card'

const List = ({ posts }) => {
  return (
    <Space direction="vertical" className="w-100 mb-4">
      {posts.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </Space>
  )
}

export default List
