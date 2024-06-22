import users from '@/data/User'
import fs from 'fs'

const filePath = './data/User.json'

const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

export default async function handler(req, res) {
  console.log("進來了")
  if (req.method === 'PUT') {
    try {
      const { verifyEmail, newPassword } = req.body

      const updatePassword = users.map((user) => {
        if (user.account === verifyEmail) {
          
          return { ...user, password: newPassword }
        } else {
          return user
        }
      })
      // 寫入至 user.json 檔案中
      fs.writeFile(filePath, JSON.stringify(updatePassword), (err) => {
        if (err) {
          throw new Error('無法寫入使用者資料')
        }
        console.log('資料已成功寫入檔案：', filePath)
				res.status(200).json({status: true ,message:"修改成功" })
      })
    } catch (error) {
      res.status(500).json({ status: false, message: '修改失敗' })
    }
  }
}
