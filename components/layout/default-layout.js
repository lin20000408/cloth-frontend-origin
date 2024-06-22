import Navbar from './navbar/navbar'
import MyFooter from './footer'
import { useLoader } from '@/hooks/use-loader'

export default function DefaultLayout({ children }) {
  // 全域的載入動畫指示器
  const { loader } = useLoader()

  return (
    <>
      <Navbar />
      <main className="min-vh-100">
        {children}
        {/* 全域的載入動畫指示器 */}
        {loader()}
      </main>
      <MyFooter />
    </>
  )
}
