import styles from '@/styles/member/login.module.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaGoogle, FaFacebookSquare } from 'react-icons/fa'

export default function Login() {
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
                action="/login"
                method="post"
                className="p-4 rounded "
              >
                <div className={`mb-4 ${styles['loginFormWelcome']}`}>
                  歡迎回來
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    帳號:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className={`form-control ${styles['form-controlFrame']}`}
                    placeholder="請輸入帳號"
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
                      href="/forgot-password"
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
                  <span> 登 入 </span>
                </button>
                <div className={`text-center ${styles['hasNotAccount']}`}>
                  還沒有帳號嗎？
                  <a
                    href="/register"
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
                      className={`${styles['custom-btn']} ${styles['btn-7']}`}
                    >
                      <span className="icon-container">
                        <FaGoogle className="icon" />
                      </span>
                      <span>登 入</span>
                    </button>
                  </div>
                  <div className={`${styles['quickLogin']}`}>
                    <button
                      type="button"
                      className={`${styles['custom-btn']} ${styles['btn-7']}`}
                    >
                      <span className={`${styles['icon-container']}`}>
                        <FaFacebookSquare className="icon" />
                      </span>
                      <span className="btn-text">登 入</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
