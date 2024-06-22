import { useEffect, useState } from 'react'
import { UserProvider } from '@/context/user-context'
import { ConfigProvider, message, Pagination } from 'antd'
import PostComposer from '@/components/forum/post-composer'
import List from './post-list'
import { loadPosts } from '@/services/post'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

const Container = ({ children }) => {
  return (
    <div className="container d-flex justify-content-center col-lg-6 row mx-auto bg-bgColor">
      {children}
    </div>
  )
}

const App = () => {
  const [posts, setPosts] = useState([])
  const { userIdData } = useBackEndData()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const [pageSize, setPageSize] = useState(10) // Assuming 10 posts per page

  const getPosts = async (page = 1, pageSize = 10) => {
    setLoading(true)
    try {
      const data = await loadPosts({ page: page })
      setPosts(data.posts)
      setTotalPosts(data.total) // total number of posts
      setCurrentPage(page)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setError(e)
      message.error('Error loading posts')
    }
  }

  useEffect(() => {
    getPosts(currentPage, pageSize)
  }, [currentPage, pageSize])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--bs-font-sans-serif)',
          colorPrimary: '#ABC8BC',
        },
      }}
    >
      <UserProvider>
        <Container>
          <section id="page-title" className="d-flex justify-content-center">
            <div className="title h2 my-4 bg-bgColor fw-light">討論區</div>
          </section>
          <main>
            <section className="mb-3">
              <PostComposer
                refreshPosts={() => getPosts(currentPage, pageSize)}
              />
            </section>
            <List posts={posts} />
            <div className="d-flex justify-content-center mb-4">
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                total={totalPosts} // total number of posts
                onChange={handlePageChange}
                pageSize={pageSize}
              />
            </div>
          </main>
        </Container>
      </UserProvider>
    </ConfigProvider>
  )
}

export default App
