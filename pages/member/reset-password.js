import styles from '@/styles/member/reset-password.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'

const editPasswordUrl = 'http://localhost:3005/api/member-resetPassword'
const sendEmailUrl = 'http://localhost:3005/api/member-sendEmail'

export default function MemberLogin() {
  const [verifyEmail, setVerifyEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const router = useRouter()

  //*吐司訊息
  const notifySendSuccess = () => toast.success('寄送Email成功')
  const notifyVerifySuccess = () => toast.success('驗證成功')
  const notifyFailVerifySuccess = () => toast.error('驗證失敗')
  const notifyEditPassword = () => toast.success('修改成功')
  const notifyFailEditPassword = () => toast.error('密碼不相同')

  //*寄發郵件
  const sendEmail = async (verifyEmail, generatedOtp) => {
    try {
      const response = await fetch(sendEmailUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verifyEmail, generatedOtp }),
      })
      const result = await response.json()
      if (response.ok) {
        notifySendSuccess()
        return true // 如果邮件发送成功，则返回 true
      } else {
        alert(result.error)
        return false // 如果邮件发送失败，则返回 false
      }
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  //* 生成 OTP
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    console.log(otp)
    setGeneratedOtp(otp)
    return otp
  }

  //*寄送包含otp密碼的郵件
  const handleSendOtp = async () => {
    const newGeneratedOtp = generateOTP()
    const emailSent = await sendEmail(verifyEmail, newGeneratedOtp)
    if (emailSent) {
      setMessage('OTP sent successfully!')
    } else {
      setMessage('Failed to send OTP. Please try again.')
    }
  }

  //*otp驗證是否符合
  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setMessage('OTP verified successfully!')
      notifyVerifySuccess()
      // 在这里执行其他需要验证的逻辑，比如重置密码等
    } else {
      setMessage('Invalid OTP. Please try again.')
      notifyFailVerifySuccess()
      console.log(generatedOtp)
    }
  }

  //*修改密碼
  const sendEditPassword = async () => {
    try {
      if (otp === generatedOtp && newPassword === verifyPassword) {
        const response = await fetch(editPasswordUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ verifyEmail, newPassword }),
        })
        const result = await response.json()
        if (response.ok) {
          console.log(result)
          notifyEditPassword()
          router.push('./login')
        } else {
          notifyFailEditPassword()
        }
      } else {
        alert('輸入密碼不相同')
      }
    } catch (error) {
      console.error('密碼更改失敗', error)
    }
  }

  //* 一键新增信箱
  const addDefaultEmail = () => {
    setVerifyEmail('pigpuppy880919@gmail.com')
  }

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
                  回到
                  <a href="./login">
                    <span>登入</span>
                  </a>
                  或
                  <a href="./register">
                    <span>註冊</span>
                  </a>
                  帳號
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className={`form-label`}
                    style={{ fontWeight: 600 }}
                  >
                    輸入註冊會員的電子信箱:
                  </label>
                  <button
                    type="button"
                    onClick={addDefaultEmail}
                    style={{ border: 'none', backgroundColor: 'transparent' }}
                  >
                    點我
                  </button>
                  <div className="mb-3 position-relative d-flex align-items-center">
                    <input
                      type="text"
                      name="email"
                      className={`form-control ${styles['form-control-1']}`}
                      placeholder="請輸入註冊帳號"
                      value={verifyEmail}
                      onChange={(e) => {
                        setVerifyEmail(e.target.value)
                      }}
                      required=""
                    />
                    <button
                      type="button"
                      className={`position-absolute ${styles['sendVerify']} ${styles['custom-btn']} ${styles['btn-7']}`}
                      onClick={handleSendOtp}
                    >
                      <span>寄送驗證碼</span>
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
                      type="text"
                      name="verifyCode"
                      className={`form-control ${styles['form-control-1']}`}
                      placeholder="請輸入驗證碼"
                      onChange={(e) => {
                        setOtp(e.target.value)
                      }}
                      required=""
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className={`position-absolute ${styles['verifyPassword']} ${styles['custom-btn']} ${styles['btn-7']} `}
                    >
                      <span>驗證驗證碼</span>
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
                    name="newPassword"
                    className={`form-control ${styles['form-control-1']}`}
                    placeholder="請輸入新密碼 "
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                    }}
                    required=""
                    style={{ marginBottom: 18 }}
                  />
                  <input
                    type="password"
                    name="verifyPassword"
                    className={`form-control  ${styles['form-control-1']}`}
                    value={verifyPassword}
                    onChange={(e) => {
                      setVerifyPassword(e.target.value)
                    }}
                    placeholder="重新輸入新密碼 "
                    required=""
                  />
                </div>
                <button
                  type="button"
                  className={`btn ${styles['submitResetPassword']} ${styles['custom-btn-1']} ${styles['btn-7']}`}
                  onClick={sendEditPassword}
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
      <Toaster />
    </>
  )
}
