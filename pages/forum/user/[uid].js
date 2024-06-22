import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import UserProfileHeader from '@/components/forum/user-profile-header'
import ProfileMain from '@/components/forum/profile-main'
import { loadBio } from '@/services/bio'
import { ConfigProvider } from 'antd'

function App() {
  const router = useRouter()
  const [bio, setBio] = useState({
    id: 0,
    name: '',
    avatar: '',
    gender: '',
    bio: '',
  })

  const getBio = async (uid) => {
    const data = await loadBio(uid)
    console.log(data)
    setBio(data)
  }

  useEffect(() => {
    if (router.isReady) {
      const { uid } = router.query
      getBio(uid)
    }
    // eslint-disable-next-line
  }, [router.isReady])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--bs-font-sans-serif)',
          colorPrimary: '#ABC8BC', // 主要顏色
        },
      }}
    >
      <Container>
        <div className="d-flex flex-column col-lg-6 justify-content-center mx-auto mt-4">
          <div className="d-flex justify-content-center mb-3">
            <UserProfileHeader
              name={bio.name}
              height={bio.height}
              gender={bio.gender}
              avatar={bio.avatar}
              bio={bio.bio}
            />
          </div>
          <main className="d-flex justify-content-center mx-auto">
            <ProfileMain userId={bio.id} />
          </main>
        </div>
      </Container>
    </ConfigProvider>
  )
}

export default App
