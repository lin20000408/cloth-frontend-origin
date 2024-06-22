import { useState, useEffect } from 'react'
import styles from '@/styles/tarot/tarot.module.css'
import NofooterLayout from '@/components/layout/nofooter-layout'
import { useLoader } from '@/hooks/use-loader'
import TarotModal from '@/components/tarot/tarot-modal.js'
import TarotBackground from '@/components/tarot/tarot-background'
import Link from 'next/link'

export default function Tarot() {
  // 自訂控制開關載入動畫
  // 要手動控制關閉，Context要給參數close={0} `<LoaderProvider close={0}>`
  // showLoader是開載入動畫函式，hideLoader為關動畫函式(手動控制關閉才有用)
  const { showLoader, hideLoader, loading, delay } = useLoader()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // 載入動畫
    showLoader()
  }, [])

  const handleOpenModal = () => {
    setShowModal(true)
  }

  return (
    <>
      {/* 背景動畫 */}
      <TarotBackground />

      <div
        className={`${styles['tarot']} ${styles['container']} container d-flex flex-wrap justify-content-center`}
      >
        <main className="d-flex flex-column">
          <div
            className={`${styles['tarotContent']} d-flex flex-column align-items-center`}
          >
            <h2 className="text-center text-white">DD shop</h2>
            <h2 className="text-center text-white my-3">塔羅牌占卜</h2>
            <Link href="#" onClick={handleOpenModal}>
              <img src="../images/tarot/tarot-home.jpg" alt="" />
            </Link>
            <h3 className="text-center text-white my-3">點擊卡牌</h3>
            <h3 className="text-center text-white">進入量身訂做的服飾世界</h3>
          </div>
          {/* Modal */}
          <TarotModal
            visible={showModal}
            handleCancel={() => setShowModal(false)}
          />
        </main>
      </div>
    </>
  )
}

// 這裡代表要套用NofooterLayout，取代原本的DefaultLayout
// 要寫在元件的函式之外
Tarot.getLayout = function (page) {
  return <NofooterLayout>{page}</NofooterLayout>
}
