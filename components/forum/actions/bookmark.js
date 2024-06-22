import { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import { loadLikes, deleteBookmark, addBookmark } from '@/services/post'
import { Toaster, toast } from 'react-hot-toast'
import 'animate.css'

export default function ActionBookmark({ pc_id = 0 }) {
  const { bookmarks, setBookmarksData, userIdData } = useBackEndData()
  const [bookmarked, setBookmarked] = useState(false)
  const [animate, setAnimate] = useState(false)

  // setBookmarked =

  const toggleBookmark = async (uid, pid, bookmarkedState) => {
    if (uid && pid) {
      try {
        if (!bookmarkedState) {
          setBookmarked(true)
          setAnimate(true)
          const data = await addBookmark(uid, pid)
          setBookmarksData(data)
        } else {
          setBookmarked(false)
          const data = await deleteBookmark(uid, pid)
          setBookmarksData(data)
        }
      } catch (error) {
        console.error('Error toggling bookmark:', error)
      }
    } else {
      console.log('需要登入會員')
      toast.error('需要登入會員')
    }
  }

  useEffect(() => {
    if (pc_id && bookmarks.length > 0) {
      setBookmarked(bookmarks.some((bookmark) => bookmark.pid === pc_id))
    }
  }, [pc_id, bookmarks])

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [animate])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <FaBookmark
        size={20}
        color={bookmarked ? 'lightgreen' : null}
        onClick={() => toggleBookmark(userIdData, pc_id, bookmarked)}
        className={`cursor-pointer ${
          animate ? 'animate__animated animate__heartBeat' : ''
        }`}
      />
    </>
  )
}
