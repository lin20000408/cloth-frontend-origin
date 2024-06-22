// pages/api/callback.js

import express from 'express'
import 'isomorphic-unfetch'
import querystring from 'querystring'

const router = express.Router()

const CLIENT_ID = 2005424688 // 替换为你的 Channel ID
const CLIENT_SECRET = '78ab5ed172e9443eaaa0a41540e1782c' // 替换为你的 Channel Secret
const REDIRECT_URI = 'http://localhost:3000/member/edit-personal-data' // 替换为你的回调 URL

router.get('/', async (req, res) => {
  const { code, state } = req.query

  try {
    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch token')
    }

    const tokenData = await tokenResponse.json()
    const { access_token } = tokenData

    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch profile')
    }

    const userProfile = await profileResponse.json()
    console.log('User profile:', userProfile)

    res
      .status(200)
      .json({ message: 'Login successful', userProfile: userProfile })
  } catch (error) {
    console.error('Error during LINE login process:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
