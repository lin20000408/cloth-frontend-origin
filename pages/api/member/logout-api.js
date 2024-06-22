import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.SECRET_KEY

export default function handler(req, res) {
  console.log('有寫進來')
  let user
  if (req.method === 'POST') {
    const token = jwt.sign(
      {
        account: undefined,
        name: undefined,
        mail: undefined,
        head: undefined,
      },
      secretKey,
      {
        expiresIn: '-10s',
      }
    )
    // 返回成功注销的消息
    res.status(200).json({ status: 'success', message: '登出成功', token })
  } else {
    // 如果不是 POST 请求，返回错误消息
    res.status(405).json({ status: 'error', message: '请求方法错' })
  }
}
