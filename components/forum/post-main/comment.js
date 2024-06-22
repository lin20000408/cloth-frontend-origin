import { useEffect, useState } from 'react'
import { Avatar, Card } from 'antd'
import { loadBio } from '@/services/bio'

const Comment = ({ uid, text }) => {
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
    if (uid) {
      getBio(uid)
    }
  }, [uid])

  const { Meta } = Card
  return (
    <Card>
      <Meta
        avatar={<Avatar src={bio.avatar} />}
        title={bio.name}
        description={
          <div className="text-body fs-6 d-flex flex-column gap-2">
            <div>{text}</div>
          </div>
        }
      ></Meta>
    </Card>
  )
}

export default Comment
