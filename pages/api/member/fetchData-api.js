import jwt from 'jsonwebtoken'
import users from '@/data/User'
import dotenv from 'dotenv'

// const users= [
//   {
//     id: 1,
//     name: '哈利',
//     username: 'herry',
//     password: '11111',
//     email: 'herry@test.com',
//     avatar: '1.webp',
//     sex: '男',
//     birth_date: '1980-07-13',
//     phone: '0906102808',
//     postcode: '330',
//     address: '桃園市桃園區劉南路377號18樓',
//   },
//   {
//     id: 2,
//     name: '金妮',
//     username: 'ginny',
//     password: '22222',
//     email: 'ginny@test.com',
//     avatar: '',
//     sex: '女',
//     birth_date: '1981-08-11',
//     phone: '0946840920',
//     postcode: '882',
//     address: '澎湖縣望安鄉高東路305號19樓',
//   },
// ]

dotenv.config()
const secretKey = process.env.SECRET_KEY

// eslint-disable-next-line no-unused-vars
const getTokenFromHeaders = function (headers) {
  if (!headers.authorization) {
    return null
  }

  // eslint-disable-next-line prettier/prettier
	const token = headers.authorization.split(' ')[1];
  return token
}

export default async function handler(req, res) {
  try {
    console.log('I am entering')
    const token = getTokenFromHeaders(req.headers)
    // console.log(token)
    const decoded = jwt.verify(token, secretKey) // 替换为你的 JWT 密钥
    // console.log(decoded)
    const userId = decoded.id
    // 在这里查询数据库，根据 userId 获取用户数据
    const user = users.find((u) => {
      return u.id === userId
    })

    console.log(user)

    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ message: 'Internal server error:內部系統錯誤' })
  }
}
