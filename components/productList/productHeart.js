import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import { deleteFavorite, addFavorite, selectFavorite } from '@/services/product'
import { Toaster, toast } from 'react-hot-toast' //吐司套件
import 'animate.css' //動畫
export default function ProductHeart({ pc_id = 0, pname = '' }) {
  const { favorites, setFavoritesData, userIdData } = useBackEndData() //context 收藏狀態
  const [heart, setHeart] = useState(false) //設定是否收藏狀態
  const [uid, setUid] = useState(0)
  const [animate, setAnimate] = useState(false) // 設定動畫狀態
  //按下收藏按鈕
  const ToggleFavorite = async (uid, pid, pname, heart) => {
    if (uid && pid) {
      if (heart === false) {
        setHeart(true)
        toast.success(`已將 ${pname} 加入收藏!`)
        setAnimate(true) // 啟動動畫
        const data = await addFavorite(uid, pid)
        setFavoritesData(data)
        // console.log(favorites)
      } else if (heart === true) {
        setHeart(false)
        toast.success(`已將 ${pname} 移除收藏!`)
        const data = await deleteFavorite(uid, pid)
        setFavoritesData(data)
        // console.log(favorites)
      }
    } else {
      console.log('需要登入會員')
      toast.error('需要登入會員')
    }
  }

  useEffect(() => {
    if (userIdData !== null) {
      setUid(userIdData)
    } else {
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      )
      setUid(userIdLocalStorage)
    }
    if (favorites.length > 0) {
      setHeart(favorites.some((favorite) => favorite.pid === pc_id))
    }
  }, [])

  // 重置動畫狀態
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1000) // 動畫時間與 animate__pulse 的動畫時間一致
      return () => clearTimeout(timer)
    }
  }, [animate])
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <FaHeart
        size={20}
        color={heart ? 'red' : 'grey'}
        onClick={() => ToggleFavorite(uid, pc_id, pname, heart)}
        className={`cursor-pointer ${
          animate ? 'animate__animated animate__heartBeat' : ''
        }`}
      />
    </>
  )
}
