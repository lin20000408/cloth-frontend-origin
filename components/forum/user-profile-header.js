import { Avatar, Button, Card } from 'antd'
import Link from 'next/link'
import { IoPersonAddOutline } from 'react-icons/io5'

const UserProfileHeader = ({
  id,
  name,
  height,
  gender,
  avatar,
  bio,
  hideBio,
}) => {
  let normalizedSex = ''
  if (!!gender === true) {
    normalizedSex = '男'
  } else {
    normalizedSex = '女'
  }

  const { Meta } = Card

  return (
    <Card
      style={{
        fontFamily: 'var(--bs-font-sans-serif)',
      }}
      // loading={loading}
    >
      <Link
        href={`/forum/user/${id}`}
        className="text-reset text-decoration-none"
      >
        <Meta
          avatar={<Avatar src={avatar} size={64} />}
          title={
            <>
              <div className="d-flex align-items-center gap-2">
                <div className="fs-5">{name}</div>
                {/* <Button
                className={`btn-ddsecondary d-flex align-items-center ms-auto`}
              >
                追隨
                <IoPersonAddOutline className="ms-1" />
              </Button> */}
              </div>
            </>
          }
          description={
            <div className="text-body fs-6 d-flex flex-column gap-2">
              <div className="user-meta">
                {normalizedSex}｜{height}cm
              </div>
              {hideBio ? null : <div className="user-bio">{bio}</div>}
            </div>
          }
        />
      </Link>
    </Card>
  )
}

export default UserProfileHeader
