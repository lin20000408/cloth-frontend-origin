/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import styles from '@/styles/phone-sidebar.module.css'
import Link from 'next/link'
import 'animate.css/animate.min.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function Sidebar() {
  //*抓取會員個人資訊，並且將id存放到localstorage裡面
  const [userData, setuserData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    password: '',
    phone: '',
    city: '',
    district: '',
    address: '',
  })
  let newUserData = JSON.parse(JSON.stringify(userData))

  //*抓取照片檔案路徑
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSrc, setPreviewSrc] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')

  const [showAccountDetails, setShowAccountDetails] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showMemberExclusive, setShowMemberExclusive] = useState(false)

  const { userIdData, avatarData } = useBackEndData({
    id: 0,
    pictureFile: 0,
  })

  //*取得個人資料
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('userKey') //!localstorage裡面的索引值

      // console.log(token)
      try {
        const response = await fetch('http://localhost:3005/api/member-data', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          let userData = await response.json()
          newUserData = { ...userData }
          setuserData(newUserData)
          // console.log(newUserData)
          // 將user.id資料保存到 localStorage 中，命名為userIdLocalStorage
          localStorage.setItem(
            'userIdLocalStorage',
            JSON.stringify(newUserData.id)
          )
        } else {
          console.error('Error fetching user profile:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchData()
  }, [])

  //*將抓回來的照片顯示到sidebar上，如果沒有抓到先從localstorage裡面去抓會員"id"並且fetch回來照片路徑資料(才不會報錯)
  async function fetchPictureData(userId) {
    try {
      const response = await fetch(
        `http://localhost:3005/api/member-uploadImage/${userId}`,
        {
          method: 'GET',
        }
      )
      if (response.ok) {
        const bigHeads = await response.json()
        const pictureFile = bigHeads.data.avatar.substring(8)
        const pictureFileRoute = `../images/member/${pictureFile}`
        setAvatarUrl(pictureFileRoute)
      } else {
        console.error('Error fetching user profile:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  useEffect(() => {
    if (avatarData) {
      setAvatarUrl(`../images/member/${avatarData}`)
    } else {
      const userId = localStorage.getItem('userIdLocalStorage')
      fetchPictureData(userId)
    }
  }, [avatarData])

  //*讀取照片並且顯示預覽
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewSrc(reader.result)
    }
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
        `http://localhost:3005/api/member-uploadImage/${userIdLocalStorage}`,
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
      alert('上傳成功')
    } catch (error) {
      setUploading(false)
      console.error('Error uploading file:', error)
      alert('上傳失敗')
    }
  }

  return (
    <>
      <aside className={styles.sidebarMain}>
        <div className={styles.leftSidebar}>
          <div className={styles.sidebar} style={{width:"100%"}}>
            <p
              className={styles.member}
              style={{
                width: '100%',
                fontSize: 25,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              會員中心
            </p>
            <Link
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#uploadModal"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                className={`${styles.bigHead} animate__animated animate__fadeIn`}
                src={previewSrc || avatarUrl || '../images/boy.jpeg'}
                alt="Big Head"
              />
            </Link>
            <ul className={styles.myAccount}>
              <button
                type="button"
                className={styles['phoneMyAccount']}
                onClick={() => setShowAccountDetails(!showAccountDetails)}
              >
                我的帳戶
              </button>
              {showAccountDetails && (
                <>
                  <li>
                    <Link
                      href="../member/edit-personal-data"
                      className={styles['centerLink']}
                    >
                      個人資料
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="../member/edit-address"
                      className={styles['centerLink']}
                    >
                      收件地址
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className={styles.myOrder}>
              <button
                type="button"
                className={styles['phoneMyOrder']}
                onClick={() => setShowOrderDetails(!showOrderDetails)}
              >
                訂單中心
              </button>
              {showOrderDetails && (
                <>
                  <li>
                    <Link href="#" className={styles['centerLink']}>
                      購買記錄
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={styles['centerLink']}>
                      購物車
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className={styles.onlyForMember}>
              <button
                type="button"
                className={styles['phoneForMember']}
                style={{}}
                onClick={() => setShowMemberExclusive(!showMemberExclusive)}
              >
                會員專屬
              </button>
              {showMemberExclusive && (
                <>
                  <li>
                    <Link href="../coupon" className={styles['centerLink']}>
                      優惠券
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="../colorology/colorology-result"
                      className={styles['centerLink']}
                    >
                      色彩學
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="../tarot/tarot-result"
                      className={styles['centerLink']}
                    >
                      塔羅牌
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={styles['centerLink']}>
                      我的客製記錄
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </aside>

      {/* modal */}
      <div
        className="modal fade"
        id="uploadModal"
        tabIndex="-1"
        aria-labelledby="uploadModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="uploadModalLabel">
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
              {previewSrc && (
                <div
                  style={{ marginTop: 20 }}
                  className="animate__animated animate__fadeInTopLeft"
                >
                  <img
                    src={previewSrc}
                    alt="Preview"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              )}
              {uploadSuccess && (
                <div
                  className="alert alert-success animate__animated animate__fadeIn"
                  role="alert"
                >
                  文件上傳成功！
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
              >
                {uploading ? '上傳中...' : '上傳'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
