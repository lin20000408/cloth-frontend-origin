import React from 'react'
import {
  RiHeartLine,
  RiChat1Line,
  RiShareLine,
  RiBookmarkLine,
} from 'react-icons/ri'

const ActionBar = ({ likes, comments }) => {
  return (
    <div className="action-bar d-flex">
      <div className="action-like me-2">
        <RiHeartLine />
        {likes}
      </div>
      <div className="action-comment me-2">
        <RiChat1Line />
        {comments}
      </div>
      <div className="action-share me-2">
        <RiShareLine />
      </div>
      <div className="action-bookmark me-2">
        <RiBookmarkLine />
      </div>
    </div>
  )
}

export default ActionBar
