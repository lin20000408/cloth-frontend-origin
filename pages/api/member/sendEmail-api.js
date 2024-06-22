import nodemailer from 'nodemailer'
import users from '@/data/User'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { verifyEmail, generatedOtp } = req.body

    const hasUsers = users.find(u => u.account === verifyEmail)
    if (!hasUsers) {
      return res.status(400).json({ error: 'User not found' }); // 返回用户不存在的错误信息
    }
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'logitecha1073114@gmail.com', // 發件人郵箱地址
          pass: 'cvfw zzlv kwdf vjfe', //發件人的授權碼
        },
      })
      const mailOptions = {
        from: 'logitecha1073114@gmail.com', // 發件人郵箱地址
        to: verifyEmail, // 收件人郵箱地址
        subject: 'Password Reset OTP', // 郵件主题
        text: `Your OTP is: ${generatedOtp}`, // 郵件正文
      }
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error)
            reject('Failed to send email')
          } else {
            console.log('Email sent:', info.response)
            resolve('Email sent successfully')
          }
        })
      })


      res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ error: 'Failed to send email' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}