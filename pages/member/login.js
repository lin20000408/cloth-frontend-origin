// import Login from '@/components/member/login'
import styles from '@/styles/member/login.module.css'
import { FaGoogle, FaFacebookSquare } from 'react-icons/fa'
import { SiLine } from 'react-icons/si'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
import { auth, provide } from '../../configs/firbase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useBackEndData } from '@/hooks/use-backEnd-catchData' // 抓取後端json - context
import { selectFavorite } from '@/services/product' //打api 到後端拿 收藏資料import toast, { Toaster } from 'react-hot-toast'
// 取後端json - context
import toast, { Toaster } from 'react-hot-toast'

//*加入吐司套件
const notifySuccess = () => toast.success('成功登入')
const notifyFailed = () => toast.error('登入失敗')

//*使用line第三方登入
const LINE_LOGIN_URL = 'https://access.line.me/oauth2/v2.1/authorize'
const CLIENT_ID = 2005424688 // 替换为你的 Channel ID
const REDIRECT_URI = 'http://localhost:3000/member/edit-personal-data' // 替换为你的回调 URL
const STATE = 'someRandomString' // 用于防止 CSRF 攻击
const SCOPE = 'profile openid email'

const handleLineLogin = async () => {
  try {
    const response = await fetch('http://localhost:3005/api/member-line-login')
    const { loginUrl } = await response.json()
    console.log({ loginUrl: '回傳url' })
    window.location.assign(loginUrl)
  } catch (error) {
    console.error('Error fetching LINE login URL:', error)
    console.log('錯誤的url')
  }
}

// const baseUrl = 'http://localhost:3005/api/member-login'

export default function MemberLogin() {
  const [account, setaccount] = useState('')
  const [password, setpassword] = useState('')
  const [message, setmessage] = useState('')
  const router = useRouter()
  const [redirectPath, setRedirectPath] = useState('./edit-personal-data') // 初始化跳轉地址

  // 抓取後端json
  const {
    userIdData,
    updateUserIdData,
    avatarData,
    updateAvatarData,
    favorites,
    setFavoritesData, //設定收藏狀態
  } = useBackEndData({
    id: 0,
    pictureFile: '',
  })

  //* 登入後判斷跳轉的路徑
  useEffect(() => {
    // 設定窗口大小監聽器
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRedirectPath('./phone-sidebar')
      } else {
        setRedirectPath('./edit-personal-data')
      }
    }

    // 初次加載時檢查窗口大小
    handleResize()

    // 添加事件監聽器(這個其實可以省略，因為只有useEffect一次)
    window.addEventListener('resize', handleResize)

    // 移除事件監聽器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //* 使用 google 做第三方登入
  const signInWithGoogle = async () => {
    // 限制只有帶 ckex.tech 才會出現在選項
    // provider.setCustomParameters({
    //   hd: 'ckex.tech',
    // })
    try {
      const response = await signInWithPopup(auth, provide)
      console.log(response)
      const token = response.user.accessToken
      // localStorage.setItem('access_token', token)
      // 登入成功就轉址
      if (token) router.push('./edit-personal-data')
    } catch (error) {
      console.log(error)
    }
  }

  //* 點選登入觸發onSubmit函數
  const handleSubmit = async (e) => {
    e.preventDefault()
    let user, token
    let loginKey = 'userKey' //!localstorage裡面的索引值

    try {
      const response = await fetch('http://localhost:3005/api/member-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, password }),
      })

      if (response.ok) {
        const result = await response.json()
        // console.log(data)
        token = result.token
        user = jwtDecode(token)
        const pictureFile = user.avatar.substring(8)

        console.log(user)
        console.log(token)
        localStorage.setItem(loginKey, token) //將token寫入localStorage

        updateUserIdData(user.id) //後端json可以傳給下一頁
        console.log(updateUserIdData)

        updateAvatarData(pictureFile) //後端json可以傳給下一頁
        console.log('pictureFile', pictureFile)

        setmessage(result.message) // 承接後端返回的訊息
        setTimeout(() => {
          router.push(redirectPath)
        }, 1000)
      } else {
        const data = await response.json()
        setmessage(data.message) // 承接後端返回的錯誤訊息
        console.log(data.message) // 可以在控制台打印錯誤訊息
        notifyFailed()
      }
    } catch (error) {
      console.log('An error occurred', error)
    }
  }

  return (
    <>
      <div className={styles['topContainer']}>
        {/* {`text-white  ${styles['footer-nav1']}`} */}
        <main className={`container ${styles['smallContainer']}`}>
          <div className={`row loginFor ${styles[`subContainer`]} `}>
            <div className={`col-md-6  ${styles[`loginForm`]}`}>
              {/* Login Form */}
              <form
                id="loginForm"
                method="post"
                className="p-4 rounded "
                onSubmit={handleSubmit}
              >
                <div className={`mb-4 ${styles['loginFormWelcome']}`}>
                  歡迎回來
                  <button
                    type="button"
                    onClick={() => {
                      setaccount('pigpuppy880919@gmail.com'),
                        setpassword('qq570219')
                    }}
                    style={{
                      fontSize: '12px',
                      border: 'none',
                      backgroundColor: 'transparent',
                    }}
                  >
                    點我
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="account" className="form-label">
                    帳號:
                  </label>
                  <input
                    type="text"
                    name="account"
                    id="account"
                    className={`form-control ${styles['form-controlFrame']}`}
                    placeholder="請輸入帳號"
                    value={account}
                    onChange={(e) => {
                      setaccount(e.target.value)
                    }}
                    required=""
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    密碼:
                  </label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control ${styles['form-controlFrame']}`}
                    placeholder="請輸入密碼"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value)
                    }}
                    required=""
                  />
                </div>
                <div
                  className={`d-flex justify-content-between align-items-center ${styles['RememberAccount']}`}
                >
                  <div>
                    <input
                      type="checkbox"
                      id="forgotPasswordCheckbox"
                      style={{ marginRight: '5px' }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="forgotPasswordCheckbox"
                    >
                      記住我的帳號
                    </label>
                  </div>
                  <div>
                    <a
                      href="./reset-password"
                      className={`text-dark ${styles['forgotPasswordLink']}`}
                      id="forgotPasswordLink"
                    >
                      忘記密碼 ?
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                >
                  <span style={{ fontSize: '16px' }}>登 入</span>
                </button>
                <div className={`text-center ${styles['hasNotAccount']}`}>
                  還沒有帳號嗎？
                  <a
                    href="./register"
                    className={`${styles['text-orange']} ${styles['register']}`}
                  >
                    點擊註冊
                  </a>
                </div>
                <div className="text-center">or</div>
                <div
                  className={`d-flex justify-content-between ${styles['twoQuickLogin']}`}
                >
                  <div className={`${styles['quickLogin']}`}>
                    <button
                      type="button"
                      onClick={signInWithGoogle}
                      className={`${styles['custom-btn']} ${styles['btn-7']}`}
                    >
                      <span className="icon-container">
                        <FaGoogle className="icon" size={18} />
                      </span>
                      <span>登 入</span>
                    </button>
                  </div>
                  <div className={`${styles['quickLogin']}`}>
                    <button
                      type="button"
                      className={`${styles['custom-btn']} ${styles['btn-7']}`}
                      onClick={handleLineLogin}
                      // onClick={() => {
                      //   setaccount('pigpuppy880919@gmail.com'),
                      //     setpassword('11111')
                      // }}
                    >
                      <span className={`${styles['icon-container']}`}>
                        {/* <FaFacebookSquare className="icon" /> */}
                        {/* 一鍵填入 */}
                        <SiLine size={20} />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </>
  )
}
