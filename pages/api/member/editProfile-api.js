// pages/api/editProfile.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import users from '@/data/User'
import fs from 'fs'


let token, userId

dotenv.config() // 解析.env用的
const secretKey = process.env.SECRET_KEY
const filePath = './data/User.json'
const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const {
        name,
        birthdate,
        gender,
        password,
        phone,
        city,
        district,
        address,
      } = req.body

      //* 從請求標頭中獲取驗證令牌
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).json({ success: false, error: '未提供驗證令牌' })
      }
      token = authHeader.split(' ')[1] // 假設令牌放在 Authorization 標頭中的 Bearer 方案中

      // 解析令牌以驗證用戶身份
      const userData = jwt.verify(token, secretKey)
      userId = userData.id
      console.log(userId)

      // 使用 map 方法更新用户数据
      const updatedData = users.map((user) => {
        // 如果当前用户的 id 与要更新的用户 id 相匹配，则更新用户信息
        if (user.id === userId) {
          return {
            ...user, // 复制原始用户对象的其他属性
            name,
            birthdate,
            gender,
            password,
            phone,
            city,
            district,
            address,
          }
        }
        // 如果当前用户的 id 与要更新的用户 id 不匹配，则保持不变
        return user
      })

      // 寫入至 user.json 檔案中
      fs.writeFile(filePath, JSON.stringify(updatedData), (err) => {
        if (err) {
          throw new Error('無法寫入使用者資料')
        }
        console.log('資料已成功寫入檔案：', filePath)
      })

      // 假設更新成功，回傳成功訊息
      res.status(200).json({ status: true, message: '個人資料更新成功！' })
    } catch (error) {
      console.error('更新個人資料時發生錯誤：', error)
      console.log('資料讀寫錯誤')
      res.status(500).json({ status: false, message: '內部伺服器錯誤' })
    }
  } else {
    // 不支持除 PUT 以外的其他請求方法
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
