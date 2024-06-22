import { Avatar } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'
import { RiAwardFill } from 'react-icons/ri'
import { UserContext } from '@/context/user-context'

export default function SectionUserProfile() {
  const userData = useContext(UserContext) // Consume the context

  return (
    <section>
      <div className="side-profile mb-4">
        <Link href="/forum/profile">
          <Avatar
            size={80}
            id="side-avatar"
            src={userData && userData.avatar}
            alt=""
          />
        </Link>
        <div className="badges">
          <div className="user-badges">
            <RiAwardFill />
            <RiAwardFill />
            <RiAwardFill />
          </div>
        </div>
        <div className="user-title">
          {userData && <div className="username h4">{userData.nickname}</div>}
          {userData && (
            <Link href={`/forum/user/${userData.id}`}>我的主頁</Link>
          )}
        </div>
      </div>
    </section>
  )
}
