import { v4 as uuidv4 } from 'uuid'
import users from '@/data/User'
import fs from 'fs'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { account, password, name, gender,birthdate, phone, city, address, district } = req.body

      const existingUser = users.find(u => u.account === account)
      if (existingUser) {
        throw new Error('帳號已經有人使用')
      }
      // 在這裡處理其他驗證邏輯...
      const id = uuidv4()
      const newUser = {
        id,
        account,
        password,
        name,
        gender,
        birthdate,
        phone,
        city,
        address,
        district,
      }
			const filePath = './data/User.json'

      const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

      // 合併新的使用者資料
      const newData = [...existingData, newUser]

      // 寫入至 user.json 檔案中
      fs.writeFile(filePath, JSON.stringify(newData), (err) => {
        if (err) {
          throw new Error('無法寫入使用者資料')
        }
        console.log('資料已成功寫入檔案：', filePath)
      })

      res.status(201).json({ status: 'success', id, message: '使用者新增成功' })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message })
    }
  } else {
    res.status(405).json({ status: 'error', message: 'Method Not Allowed' })
  }
}
