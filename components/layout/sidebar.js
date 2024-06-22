/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '@/styles/sidebar.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import 'animate.css/animate.min.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import toast, { Toaster } from 'react-hot-toast'

export default function Sidebar() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSrc, setPreviewSrc] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [userId, setUserId] = useState(null) // 定義狀態用於存儲用戶ID
  const [avatar, setAvatar] = useState('') // 定義狀態用於存儲用戶ID
  const [avatarUrl, setAvatarUrl] = useState('') // 定義狀態用於存儲用戶ID

  const [currentPage, setCurrentPage] = useState('')

  //* 加入吐司套件
  const notifySuccess = () => toast.success('上傳成功')
  const notifyFailed = () => toast.error('上傳失敗')

  //*用asPath抓取網頁的路由
  const router = useRouter()
  const { asPath } = router
  console.log(asPath)
  useEffect(() => {
    setCurrentPage(asPath)
  }, [asPath])

  // 抓取後端json
  const { userIdData, avatarData } = useBackEndData({
    id: 0,
    pictureFile: 0,
  })

  console.log('avatarData1111:', avatarData)

  //*點 sidebar，並且顯示該頁面特定顏色
  function getLastPartOfURL(url) {
    const parts = url.split('/')
    console.log(parts)
    setCurrentPage(parts[parts.length - 1])
    console.log(currentPage)
  }

  //*抓取會員照片路徑
  async function fetchPictureData(userId) {
    try {
      const response = await fetch(
        `http://localhost:3005/api/member-uploadImage/${userId}`,
        {
          method: 'GET',
        }
      )
      if (response.ok) {
        let bigHeads = await response.json()
        console.log(bigHeads)
        const pictureFile = bigHeads.data.avatar.substring(8)
        const pictureFileRoute = `../images/member/` + pictureFile
        console.log(pictureFileRoute)
        setAvatarUrl(pictureFileRoute)
      } else {
        console.error('Error fetching user profile:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  //*取得會員照片
  useEffect(() => {
    // setUserId(userIdData)
    // console.log('userId:', userIdData) //查詢是否有抓到id
    if (avatarData) {
      setAvatarUrl(`../images/member/${avatarData}`)
    } else {
      const pictureUrl = localStorage.getItem('userIdLocalStorage')
      console.log(pictureUrl)
      fetchPictureData(pictureUrl)
      // setAvatarUrl(pictureUrl)
      // console.log('avatarUrl:', pictureUrl) //查詢是否有抓到個人大頭照路徑
    }
    // localStorage.setItem('userPicture', JSON.stringify(avatarData))
  }, [avatarData])

  //*讀取照片並且顯示預覽
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    // console.log(file)
    setSelectedFile(file)

    const reader = new FileReader() //非同步讀取使用者文件
    reader.onloadend = () => {
      //因為'readAsDataURL'是非同步我們會先將onloadend先建置在前面，避免readAsDataURL放置在前，非同步的關係，無法正確改變'previewSrc'的狀態
      setPreviewSrc(reader.result)
    }
    // 將file字段加上去用來讓後端識別該字段的文件，來進行解析
    reader.readAsDataURL(file)
  }
  //*上傳圖片
  const handleFileUpload = async () => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      )
      const response = await fetch(
        `http://localhost:3005/api/member-uploadImage//${userIdLocalStorage}`,
        {
          method: 'POST',
          body: formData,
        }
      )
      if (!response.ok) {
        throw new Error('File upload failed')
      }
      setUploadSuccess(true)
      setUploading(false)
      console.log('File uploaded successfully')
      notifySuccess()
    } catch (error) {
      setUploading(false)
      console.error('Error uploading file:', error)
      notifyFailed()
    }
  }

  return (
    <>
      <aside className={styles['sidebarMain']}>
        <div className={styles['secondarySidebar']}>
          <div>
            <Link href="/">首頁&nbsp; /</Link>
          </div>
          {/* SECOND */}
          {(currentPage.includes('/member/edit-personal-data') ||
            currentPage.includes('/member/edit-address')) && (
            <div>&nbsp; 我的帳戶&nbsp; / </div>
          )}
          {(currentPage.includes('/order/order') ||
            currentPage.includes('/order/order-list')) && (
            <div>&nbsp; 訂單中心&nbsp; /</div>
          )}
          {(currentPage.includes('/coupon') || currentPage.includes('#')) && (
            <div>&nbsp; 會員專屬&nbsp; / </div>
          )}

          {/* THREE */}
          {currentPage.includes('/member/edit-personal-data') && (
            <div>&nbsp; 個人資料</div>
          )}
          {currentPage.includes('/member/edit-address') && (
            <div>&nbsp; 收件地址</div>
          )}
          {currentPage.includes('/order/order-list') && (
            <div>&nbsp; 購買紀錄</div>
          )}
          {/* {currentPage.includes('/order/order') && (
            <div>&nbsp; 購物車</div>
          )} */}
          {currentPage.includes('/coupon') && <div>&nbsp; 優惠券</div>}
        </div>
        <div className={styles['leftSidebar']}>
          <div className={styles['sidebar']}>
            <p className={styles['member']} style={{ fontSize: 24 }}>
              會員中心
            </p>
            {/* src={ avatarUrl || '../images/boy.jpeg'} */}
            <Link href="#" data-bs-toggle="modal" data-bs-target="#uploadModal">
              <img
                className={`${styles['bigHead']} animate__animated animate__fadeIn`}
                src={previewSrc || avatarUrl || '../images/avatar.jpg'}
                alt="Big Head"
              />
            </Link>
            <ul className={styles['myAccount']}>
              <p>我的帳戶</p>
              <li>
                <Link
                  href="../member/edit-personal-data"
                  className={
                    currentPage === '/member/edit-personal-data'
                      ? styles.activeLink
                      : styles.inactiveLink
                  }
                >
                  個人資料
                </Link>
              </li>
              <li>
                <Link
                  href="../member/edit-address"
                  className={
                    currentPage === '/member/edit-address'
                      ? styles.activeLink
                      : styles.inactiveLink
                  }
                >
                  收件地址
                </Link>
              </li>
            </ul>
            <ul className={styles['myOrder']}>
              <p>訂單中心</p>

              <li>
                <Link
                  href="../order/order-list"
                  className={
                    currentPage === '/order/order-list'
                      ? styles.activeLink
                      : styles.inactiveLink
                  }
                >
                  購買紀錄
                </Link>
              </li>

              <li>
                <Link
                  href="../cart/cart"
                  className={
                    currentPage === '#'
                      ? styles.activeLink
                      : styles.inactiveLink
                  }
                >
                  購物車
                </Link>
              </li>
            </ul>
            <ul className={styles['onlyForMember']}>
              <p>會員專屬</p>
              <li>
                <Link
                  href="../coupon"
                  className={
                    currentPage === '/coupon'
                      ? styles.activeLink
                      : styles.inactiveLink
                  }
                >
                  優惠券
                </Link>
              </li>

              <li>
                <Link
                  href="../colorology/colorology-result"
                  className={
                    currentPage === 'colorology-result'
                      ? styles.activeLink
                      : styles.inactiveLink
                  }
                >
                  色彩學
                </Link>
              </li>

              <li>
                <Link
                  href="../tarot/tarot-result"
                  className={
                    currentPage === 'tarot-result'
                      ? styles.activeLink
                      : styles.inactiveLink
                  }
                >
                  塔羅牌
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className={
                    currentPage === '#'
                      ? styles.activeLink
                      : styles.inactiveLink
                  }
                >
                  我的客製紀錄
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* modal */}
      <div
        className="modal fade "
        id="uploadModal"
        tabIndex="-1"
        aria-labelledby="uploadModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{backgroundColor:"#abc8bc"}}>
              <h5 className="modal-title" id="uploadModalLabel" style={{color:"white"}}>
                上傳圖片
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="file" onChange={handleFileChange} />
              {/* 當previewSrc 存在的時候及渲染&&後面的div*/}
              {previewSrc && (
                <div className="animate__animated animate__fadeInTopLeft">
                  <img
                    src={previewSrc}
                    alt="Preview"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              )}
              {/* 當uploadSuccess 存在的時候及渲染&&後面的顯示成功的畫面*/}
              {uploadSuccess && (
                <div
                  className="alert alert-success animate__animated animate__fadeIn"
                  role="alert"
                >
                  上傳成功
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                關閉
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFileUpload}
                disabled={uploading}
                style={{ backgroundColor: '#abc8bc', border: 'none' }}
              >
                {uploading ? '上傳中' : '上傳'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}
