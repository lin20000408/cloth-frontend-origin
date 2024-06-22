import React from 'react'
import styles from '@/styles/member/reset-password.module.css'

export default function ResetPassword() {
  return (
    <>
      <div className={styles['topContainer']}>
        <main className={styles['subcontainer']}>
          <div className={`row justify-content-center`}>
            <div>
              {/* Register Form */}
              <form
                id="registerForm"
                action="/register"
                method="post"
                className={`p-4 rounded ${styles['registerForm']}`}
              >
                <div className={styles['custom-heading']}>忘記密碼</div>
                <div className={styles['custom-subheading']}>
                  回到<span>登入</span>或<span>註冊</span>帳號
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className={`form-label`}
                    style={{ fontWeight: 600 }}
                  >
                    輸入註冊會員的電子信箱:
                  </label>
                  <div className="mb-3 position-relative d-flex align-items-center">
                    <input
                      type="text"
                      name="username"
                      className={`form-control ${styles['form-control-1']}`}
                      placeholder="請輸入註冊帳號"
                      required=""
                    />
                    <button
                      className={`position-absolute ${styles['sendVerify']} ${styles['custom-btn']} ${styles['btn-7']}`}
                    >
                      寄送驗證碼
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className={'form-label'}
                    style={{ fontWeight: 600 }}
                  >
                    輸入驗證碼:
                  </label>
                  <div
                    className={`mb-3 position-relative d-flex align-items-center`}
                  >
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${styles['form-control-1']}`}
                      placeholder="請輸入驗證碼"
                      required=""
                    />
                    <button
                      className={`position-absolute ${styles['verifyPassword']} ${styles['custom-btn']} ${styles['btn-7']} `}
                    >
                      驗證驗證碼
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className={`form-label`}
                    style={{ fontWeight: 600 }}
                  >
                    輸入新密碼:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${styles['form-control-1']}`}
                    placeholder="請輸入新密碼 "
                    required=""
                    style={{ marginBottom: 18 }}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control  ${styles['form-control-1']}`}
                    placeholder="重新輸入新密碼 "
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className={`btn ${styles['submitResetPassword']} ${styles['custom-btn-1']} ${styles['btn-7']}`}
                >
                  <span style={{ fontWeight: 600 }}>重設密碼</span>
                </button>
                <div
                  style={{ fontSize: 16, textAlign: 'center', marginTop: 10 }}
                >
                  點選重設密碼將會跳轉到登入畫面
                </div>
                <div style={{ fontSize: 16, textAlign: 'center' }}>
                  請使用重設密碼登入
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
