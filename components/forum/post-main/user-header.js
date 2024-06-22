import React from 'react'
import { Avatar } from 'antd'
import { RiUserAddFill } from 'react-icons/ri'

const UserHeader = ({
  avatar,
  username,
  handle,
  badges,
  gender,
  height,
  age,
  bio,
}) => {
  return (
    <div className="page-user-header bg-light my-4 p-4 rounded-4">
      <div className="user-profile d-flex align-middle">
        <div className="user-avatar me-3">
          <Avatar width={32} height={32} src={avatar} alt="" />
        </div>
        <div className="user-info d-flex flex-column justify-content-center">
          <div className="user-title d-flex flex-row align-items-center gap-3">
            <span>
              <strong>{username}</strong>
            </span>
            <span>@{handle}</span>
            <div className="user-badges">
              {badges.map((badge, index) => (
                <i key={index} className="ri-award-fill" />
              ))}
            </div>
            <div className="btn btn-ddsecondary btn-follow">
              <RiUserAddFill />
              追隨
            </div>
          </div>
          <div className="user-specs d-flex gap-3">
            <div className="user-gender border-end border-black pe-3">
              {gender}
            </div>
            <div className="user-height border-end border-black pe-3">
              {height}
            </div>
            <div className="user-age">{age}歲</div>
          </div>
          <div className="user-bio">{bio}</div>
        </div>
      </div>
    </div>
  )
}

export default UserHeader
