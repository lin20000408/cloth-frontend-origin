// import { useAuth } from '@/hooks/use-auth'
// import { addFav, removeFav } from '@/services/user'
import toast from 'react-hot-toast'

// 愛心圖示(svg)
const Heart = ({ size = 20, color = 'red' }) => (
  <svg
    className="heart"
    viewBox="0 0 32 29.6"
    style={{ width: size, fill: color, stroke: 'red', position: 'relative' }}
  >
    <path d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.1-9.3 16-12.1 16-21.2C32 3.8 28.2 0 23.6 0z" />
  </svg>
)

export default function FavIcon() {
  return (
    <>
      <Heart />
    </>
  )
}
