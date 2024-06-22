// pages/api/login.js
// 要在.env新增 SECRET_KEY=dd-shop-secret-key
import users from '@/data/User'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import multer from "multer"

dotenv.config() // 解析.env用的
const secretKey = process.env.SECRET_KEY
// const upload = multer().none()



export default function handler(req, res) {
  if (req.method === 'POST') {
    // 從請求中獲取使用者提供的帳號和密碼
    // console.log('進來了')
    const { account, password } = req.body
    const userData = users.find((u) => {
      return u.username === account && u.password === password
    })
    // console.log(userData)
    // console.log(secretKey)

    // 在實際應用中，你可以在這裡進行身份驗證、資料庫查詢等後端處理
    // 這裡我們使用一個簡單的比對來驗證使用者名稱和密碼是否正確
    if (userData) {
      const token = jwt.sign(
        { account: userData.username, userPassword: userData.password, id: userData.id },
        secretKey, // 密鑰，請替換為實際的密鑰
        { expiresIn: '3h' } // 過期時間，這裡設置為 3 小時
      )
      console.log(token)
      // 登入成功，回傳成功訊息
      res.status(200).json({ status: 'success', message: '驗證成功', token })
    } else {
      // 登入失敗，回傳錯誤訊息
      res.status(401).json({ status: 'error', message: '帳號或密碼錯誤' })
    }
  } else {
    // 如果不是 POST 請求，回傳錯誤訊息
    res.status(405).json({ status: 'error', message: '請求方法錯誤' })
  }
}
