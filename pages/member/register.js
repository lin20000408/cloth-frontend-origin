import styles from '@/styles/member/register.module.css'
import cityOfDistricts from '@/data/City&District' //!載入各鄉鎮區
import { useState } from 'react'
import { useRouter } from 'next/router'
const RegisterUrl = 'http://localhost:3005/api/member-register'
import toast, { Toaster } from 'react-hot-toast'

export default function MemberRegister() {
  const [city, setcity] = useState('')
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState('')
  const [address, setaddress] = useState('')
  const [account, setaccount] = useState('')
  const [password, setpassword] = useState('')
  const [name, setname] = useState('')
  const [gender, setgender] = useState('')
  const [phone, setphone] = useState('')
  const [birthdate, setbirthdate] = useState('')
  const [message, setMessage] = useState('') //* 新增 setMessage 狀態
  const router = useRouter()
  const districtsByCity = cityOfDistricts //!將各地區的資料放到districtsByCity

  //* 加入吐司套件
  const notifySuccess = () => toast.success('註冊成功')
  const notifyFailed = () => toast.error('註冊失敗')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let user, token
    try {
      const response = await fetch(RegisterUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account,
          password,
          name,
          gender,
          phone,
          city,
          address,
          birthdate,
          district: district, // 如果沒有選擇鄉鎮區，則設为空字符串
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log(result)
        setMessage(result.message) // 承接後端返回的訊息
        console.log(message)
        notifySuccess()
        setTimeout(() => {
          router.push('./login')
        }, 1000)
      } else {
        const data = await response.json()
        setMessage(data.message) // 承接後端返回的錯誤訊息
        console.log(data.message) // 可以在控制台打印錯誤訊息
        notifyFailed()
      }
    } catch (error) {
      console.error(error)
    }
  }

  //* 載入各鄉鎮區資料，select選完各縣市後，會跳出鄉鎮區
  const handleCityChange = (event) => {
    const selectedCity = event.target.value
    setcity(selectedCity)
    const selectedDistricts = districtsByCity[selectedCity] || []
    setDistricts(selectedDistricts)
  }

  const handleQuickRegister = () => {
    setaccount('peter@gmail.com')
    setpassword('qqq570219')
    setname('王井天')
    setgender('1')
    setphone('0912345678')
    setcity('台北市')
    setDistricts(districtsByCity['台北市'])
    setDistrict('大安區')
    setaddress('信義路')
    setbirthdate('2000-01-01')
    
    // // 自動提交表單
    // setTimeout(() => {
    //   document.getElementById('registerForm').submit()
    // }, 500)
  }

  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
      >
        <main
          className={`container  ${styles['topContainer']}`}
          style={{ marginTop: 90, marginLeft: 0, marginRight: 0 }}
        >
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 5 }}>
              註冊帳號
              <button type="button" onClick={handleQuickRegister} style={{border:"none",backgroundColor:"transparent",fontSize:"12px"}}>點我</button>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              已經有帳號?
              <a
                href="./login"
                style={{ color: '#eea68d', textDecoration: 'none' }}
              >
                點擊登入
              </a>
              
            </div>
          </div>
          <form id="registerForm" method="post" onSubmit={handleSubmit}>
            <div
              style={{ marginTop: 15 }}
              className={styles['accountAndPassword']}
            >
              <div className={styles['email']}>
                <label htmlFor="email" className={styles['labelForm']}>
                  Email 帳號:
                </label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${styles['form-control-1']} ${styles['emailRegister']}`}
                  placeholder="請輸入帳號"
                  style={{ height: 38 }}
                  onChange={(e) => {
                    setaccount(e.target.value)
                  }}
                  required=""
                  value={account} // 綁定值
                />
              </div>
              <div className={styles['password']}>
                <label htmlFor="password" className={styles['labelForm']}>
                  密碼:
                </label>{' '}
                <br />
                <input
                  type="password"
                  id="password"
                  name="password "
                  className={`form-control ${styles['form-control-1']} ${styles['passwordRegister']}`}
                  placeholder="請輸入密碼"
                  style={{ height: 38 }}
                  onChange={(e) => {
                    setpassword(e.target.value)
                  }}
                  required=""
                  value={password} // 綁定值
                />
              </div>
            </div>
            <div className={styles['nameGenderBirthdate']}>
              <div>
                <div className={styles['name']}>
                  <label
                    htmlFor="name"
                    className={styles['labelForm']}
                    style={{ marginTop: 15 }}
                  >
                    姓名:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${styles['form-control-1']} ${styles['textRegister']}`}
                    placeholder="請輸入姓名"
                    style={{ height: 38, marginBottom: 15 }}
                    onChange={(e) => {
                      setname(e.target.value)
                    }}
                    required=""
                    value={name} // 綁定值
                  />
                </div>
                <div className={styles['gender']}>
                  <label
                    htmlFor="gender"
                    className={styles['labelForm']}
                    style={{ marginTop: 15 }}
                  >
                    生理性別:
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={gender} // 綁定值
                    className={`form-control ${styles['form-control-1']} ${styles['selectRegister']}`}
                    style={{ height: 38, marginBottom: 15 }}
                    onChange={(e) => {
                      setgender(e.target.value)
                      console.log(e.target.value)
                    }}
                    required=""
                  >
                    <option value="">請選擇</option>
                    <option value="1">男生</option>
                    <option value="0">女生</option>
                  </select>
                </div>
                <div className={styles['birthdate']}>
                  <label htmlFor="birthdate" className={styles['labelForm']}>
                    出生(西元):
                  </label>
                  <div className={`input-group ${styles['input-group1']}`}>
                    <input
                      type="date"
                      className={`form-control ${styles['form-control-1']}`}
                      placeholder="年 / 月 / 日"
                      style={{ height: 38 }}
                      onChange={(e) => {
                        setbirthdate(e.target.value)
                      }}
                      required=""
                      value={birthdate} // 綁定值
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['phone']}>
              <div>
                <label htmlFor="phone" className={styles['labelForm']}>
                  手機:
                </label>
                <br />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-control ${styles['form-control-1']} styles['telRegister']`}
                  placeholder="請輸入手機號碼"
                  style={{ height: 38 }}
                  onChange={(e) => {
                    setphone(e.target.value)
                  }}
                  required=""
                  value={phone} // 綁定值
                />
              </div>
            </div>
            <div className={styles['cityDistrictAddress']}>
              <div className={styles['cityDistrict']}>
                <div className={styles['city']}>
                  <label htmlFor="city" className={styles['labelForm']}>
                    居住縣市:
                  </label>
                  <br />
                  <select
                    id="city"
                    name="city"
                    className={`form-control ${styles['form-control-1']} ${styles['selectRegister']}`}
                    onChange={handleCityChange}
                    required=""
                    value={city} // 綁定值
                  >
                    <option value="">請選擇居住縣市</option>
                    {Object.keys(districtsByCity).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles['district']}>
                  <label htmlFor="district" className={styles['labelForm']}>
                    鄉鎮區:
                  </label>
                  <br />
                  <select
                    id="district"
                    name="district"
                    className={`form-control ${styles['form-control-1']} ${styles['selectRegister']}`}
                    onChange={(e) => {
                      setDistrict(e.target.value)
                    }}
                    value={district} // 綁定值
                  >
                    <option
                      value=""
                      className={`form-control ${styles['form-control-1']}`}
                    >
                      請選擇鄉鎮區
                    </option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles['address']}>
                <label htmlFor="address" className={styles['labelForm']}>
                  居住地址:
                </label>
                <br />
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="請輸入地址"
                  style={{ height: 38 }}
                  className={`form-control ${styles['form-control-1']} ${styles['textRegister']}`}
                  onChange={(e) => {
                    setaddress(e.target.value)
                  }}
                  value={address} // 綁定值
                />
              </div>
            </div>
            <div className={`d-flex justify-content-center`}>
              <div>
                <input type="checkbox" id="agreereg" />
                <label
                  htmlFor="agreereg"
                  style={{ marginBottom: 30, marginTop: 30 }}
                >
                  我已閱讀並同意會員
                  <span style={{ color: '#eea68d' }}>註冊帳號</span>
                  
                </label>
              </div>
            </div>
            <div className={'d-flex'}>
              <div style={{ width: '100%' }}>
                <button
                  type="submit"
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                >
                  <span> 註 冊 </span>
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
      <Toaster />
    </>
  )
}
