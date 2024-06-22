import Navbar from './navbar/navbar'
import { useLoader } from '@/hooks/use-loader'

export default function NofooterLayout({ children }) {
  // 全域的載入動畫指示器
  const { loader } = useLoader()

  return (
    <>
      <Navbar />
      <main>
        {children}
        {/* 全域的載入動畫指示器 */}
        {loader()}
      </main>
    </>
  )
}
