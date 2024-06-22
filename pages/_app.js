import { useEffect } from 'react'
import '@/styles/globals.scss'
import '@/styles/loader.scss'
import Head from 'next/head'
import DefaultLayout from '@/components/layout/default-layout'
import { CartProvider } from '@/hooks/use-cart-state'
// 後端抓取資料給其他頁context
import { BackEndCatchDataProvider } from '@/hooks/use-backEnd-catchData'
// 載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'
// 自訂用載入動畫元件
import { GameLoader } from '@/hooks/use-loader/components'

// //* 抓取會員大頭照 context
// import { UserProfileProvider } from '../hooks/useFetchUserProfile'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <>
      <Head>
        <html lang="zh-Hant-TW" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DD shop</title>
      </Head>

      <BackEndCatchDataProvider>
        <LoaderProvider close={2} CustomLoader={GameLoader}>
          <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
        </LoaderProvider>
      </BackEndCatchDataProvider>
    </>
  )
}
