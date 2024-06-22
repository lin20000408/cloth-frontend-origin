import Navbar from './home/navbar'
import MyFooter from './footer'
import Head from 'next/head'
import { useLoader } from '@/hooks/use-loader'
export default function HomeLayout({ children }) {
  // 全域的載入動畫指示器
  const { loader } = useLoader()
  return (
    <>
      <Head>
        <html lang="zh-Hant-TW" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DD shop</title>
      </Head>
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
