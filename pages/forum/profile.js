import { useEffect, useState } from 'react'
import UserProfileHeader from '@/components/forum/user-profile-header'
import PostList from '@/components/forum/post-list'
import ProfileNav from '@/components/forum/profile-nav'
import { Container } from 'react-bootstrap'
import styles from '@/styles/forum/forum-profile.module.css'

function App() {
  const [userData, setUserData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    password: '',
    phone: '',
    city: '',
    district: '',
    address: '',
  })

  let newUserData = JSON.parse(JSON.stringify(userData))

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('userKey') // local storage 裡面的索引值

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
          newUserData = { ...userData }
          setUserData(newUserData)
          // console.log(newUserData)
          // 將user.id資料保存到 localStorage 中，命名為userIdLocalStorage
          localStorage.setItem(
            'userIdLocalStorage',
            JSON.stringify(newUserData.id)
          )
        } else {
          console.error('Error fetching user profile:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <Container>
      <UserProfileHeader />
      <ProfileNav />
      <main className="d-flex justify-content-center">
        <PostList />
      </main>
    </Container>
  )
}

export default App
