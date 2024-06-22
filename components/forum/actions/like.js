import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import { deleteLike, addLike } from '@/services/post'
import { Toaster, toast } from 'react-hot-toast'
import 'animate.css'

export default function ActionLike({ pc_id = 0 }) {
  const { likes, setLikesData, userIdData } = useBackEndData()
  const [liked, setLiked] = useState(false)
  const [animate, setAnimate] = useState(false)

  const toggleLike = async (uid, pid, likedState) => {
    if (uid && pid) {
      try {
        if (!likedState) {
          setLiked(true)
          setAnimate(true)
          const data = await addLike(uid, pid)
          setLikesData(data)
        } else {
          setLiked(false)
          const data = await deleteLike(uid, pid)
          setLikesData(data)
        }
      } catch (error) {
        console.error('Error toggling like:', error)
      }
    } else {
      console.log('需要登入會員')
      toast.error('需要登入會員')
    }
  }

  useEffect(() => {
    if (pc_id && likes && likes.length > 0) {
      setLiked(likes.some((like) => like.pid === pc_id))
    }
  }, [pc_id, likes])

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [animate])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <FaHeart
        size={20}
        color={liked ? 'lightcoral' : null}
        onClick={() => toggleLike(userIdData, pc_id, liked)}
        className={`cursor-pointer ${
          animate ? 'animate__animated animate__heartBeat' : ''
        }`}
      />
    </>
  )
}
