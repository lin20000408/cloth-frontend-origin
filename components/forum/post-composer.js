import { useState, useContext, useEffect } from 'react'
import { UserContext } from '@/context/user-context'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import Link from 'next/link'
import {
  Row,
  ConfigProvider,
  Space,
  Input,
  Button,
  Avatar,
  Upload,
  message,
} from 'antd'
import { PictureOutlined } from '@ant-design/icons'

const PostComposer = ({ refreshPosts }) => {
  const [userData, setUserData] = useState(null) // State variable to store userData

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('userKey') //!localstorage裡面的索引值

      // console.log(token)
      try {
        const response = await fetch('http://localhost:3005/api/member-data', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          let userData = await response.json()
          setUserData(userData)
          console.log('!!!!!', userData)
        } else {
          console.error('Error fetching user profile:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchData()
  }, [])

  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState([])
  // const userData = useContext(UserContext)

  const { userIdData, avatarData, memberDefaultData } = useBackEndData()

  const [avatarUrl, setAvatarUrl] = useState('') // 定義狀態用於存儲用戶ID
  async function fetchPictureData(userId) {
    try {
      const response = await fetch(
        `http://localhost:3005/api/member-uploadImage/${userId}`,
        {
          method: 'GET',
        }
      )
      if (response.ok) {
        let bigHeads = await response.json()
        console.log(bigHeads)
        const pictureFile = bigHeads.data.avatar.substring(8)
        const pictureFileRoute = `../images/member/` + pictureFile
        console.log(pictureFileRoute)
        setAvatarUrl(pictureFileRoute)
      } else {
        console.error('Error fetching user profile:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  useEffect(() => {
    // setUserId(userIdData)
    // console.log('userId:', userIdData) //查詢是否有抓到id
    if (avatarData) {
      setAvatarUrl(`../images/member/${avatarData}`)
    } else {
      const pictureUrl = localStorage.getItem('userIdLocalStorage')
      console.log(pictureUrl)
      fetchPictureData(pictureUrl)
      // setAvatarUrl(pictureUrl)
      // console.log('avatarUrl:', pictureUrl) //查詢是否有抓到個人大頭照路徑
    }
    // localStorage.setItem('userPicture', JSON.stringify(avatarData))
  }, [avatarData])

  const handlePost = async () => {
    if (content.trim() || fileList.length > 0) {
      const formData = new FormData()
      formData.append('userId', userIdData)
      formData.append('text', content)
      fileList.forEach((file) => formData.append('picture', file.originFileObj))

      try {
        const response = await fetch('http://localhost:3005/api/posts', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()

        if (response.ok) {
          message.success('貼文發送成功')
          setContent('')
          setFileList([])
          refreshPosts()
        } else {
          message.error(`貼文發送失敗：${data.message}`)
        }
      } catch (error) {
        console.error('Error adding new post:', error)
        message.error('貼文發送失敗')
      }
    }
  }

  const handleChange = ({ fileList }) => setFileList(fileList)

  return (
    <ConfigProvider
      theme={{ token: { fontFamily: 'var(--bs-font-sans-serif)' } }}
    >
      <div
        style={{ padding: 20, border: '1px solid #e1e1e1', borderRadius: 10 }}
      >
        <Row className="d-flex align-items-center mb-2">
          {userData && (
            <Link
              href={`/forum/user/${userData.id}`}
              className="text-reset text-decoration-none"
            >
              <Avatar src={avatarUrl} size="large" className="me-2" />
              <span className="fw-bold fs-5">{userData.name}</span>
            </Link>
          )}
        </Row>
        <Row gutter={[16, 16]} align="top">
          <Input.TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="說點什麼吧"
            rows={4}
            maxLength={280}
            style={{ resize: 'none' }}
            className="m-2"
          />
        </Row>
        <Row justify="space-between" style={{ marginTop: 10 }}>
          <Space align="start">
            <Upload
              fileList={fileList}
              onChange={handleChange}
              listType="picture"
              accept="image/*"
              beforeUpload={() => false}
            >
              <Button icon={<PictureOutlined />}>上傳圖片</Button>
            </Upload>
          </Space>
          <Button
            type="primary"
            onClick={handlePost}
            disabled={!content.trim() && fileList.length === 0}
          >
            發文
          </Button>
        </Row>
      </div>
    </ConfigProvider>
  )
}

export default PostComposer
