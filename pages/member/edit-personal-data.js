import React from 'react' // 增加这一行
import UserLayout from '@/components/layout/user-layout'
import styles from '@/styles/member/edit-personal-data.module.css'
import cityOfDistricts from '@/data/City&District' //載入各鄉鎮區
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { FaPencilAlt } from 'react-icons/fa'
import 'animate.css/animate.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import toast, { Toaster } from 'react-hot-toast'

//*加入載入動畫
import LottieAnimation from '@/components/member/LottieAnimation'
import animationData from '@/public/welcome/welcome.json'

const memberDataUrl = 'http://localhost:3005/api/member-data'

const logoutUrl = 'http://localhost:3005/api/member-logout'

export default function EditPersonalData() {
  // eslint-disable-next-line prettier/prettier
  const [userData, setuserData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    password: '',
    phone: '',
    city: '',
    district: '',
    address: '',
  })

  const [pictureFileRoute, setpictureFileRoute] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [gender, setGender] = useState('')
  const [bornYear, setBornYear] = useState('')
  const [bornMonth, setBornMonth] = useState('')
  const [bornDay, setBornDay] = useState('')
  const [days, setDays] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [liveCity, setliveCity] = useState('')
  const [liveDistrict, setliveDistrict] = useState('')
  const [liveAddress, setliveAddress] = useState('')
  const [districts, setDistricts] = useState([])
  const [myPassword, setmyPassword] = useState([])
  const [myPhone, setmyPhone] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false) //處理 button 特性
  const [animationLoaded, setAnimationLoaded] = useState(false)

  let newUserData = JSON.parse(JSON.stringify(userData))

  const router = useRouter()
  const districtsByCity = cityOfDistricts //!將各地區的資料放到districtsByCity

  // 抓取後端json
  const { clearUserIdData } = useBackEndData()

  //*判斷是否有載入過動畫
  useEffect(() => {
    // 檢查是否已經顯示過動畫
    const hasShownAnimation = localStorage.getItem('hasShownAnimation')

    if (!hasShownAnimation) {
      // 如果沒有顯示過動畫，顯示動畫並設置狀態
      setAnimationLoaded(false)
    } else {
      // 如果已經顯示過動畫，設置狀態為已加載
      setAnimationLoaded(true)
    }
  }, [])

  //*執行完成後將記錄存放到localstorage裡面
  // const handleAnimationComplete = () => {
  //   // 當動畫完成時，設置狀態並保存到 localStorage
  //   setAnimationLoaded(true)
  //   localStorage.setItem('hasShownAnimation', 'true')
  // }

  //*載入動畫的時間
  useEffect(() => {
    // 模擬動畫載入的時間，在實際應用中，這裡應該是從外部資源載入動畫資料
    setTimeout(() => {
      setAnimationLoaded(true)
      localStorage.setItem('hasShownAnimation', 'true')
    }, 3500) // 這裡設置了 3.0 秒的載入時間，您可以根據實際情況進行調整
  }, [])

  //*加入吐司套件
  const notifySuccess = () => toast.success('修改成功')

  // *編輯按鈕
  const handleEditClick = () => {
    isEditing === true ? setIsEditing(false) : setIsEditing(true)
    console.log(isEditing)
  }

  // *取消按鈕
  const handleCancelClick = () => {
    isEditing === true ? setIsEditing(false) : setIsEditing(true)
  }
  //*取得個人資料
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('userKey') //!localstorage裡面的索引值

      // console.log(token)
      try {
        const response = await fetch('http://localhost:3005/api/member-data', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          let userData = await response.json()
          newUserData = { ...userData }
          setuserData(newUserData)
          // console.log(newUserData)
          // 將user.id資料保存到 localStorage 中，命名為userIdLocalStorage
          localStorage.setItem(
            'userIdLocalStorage',
            JSON.stringify(newUserData.id)
          )
        } else {
          console.error('Error fetching user profile:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchData()
  }, [])

  //*取得個人大頭照路徑
  useEffect(() => {
    if (newUserData.avatar) {
      const pictureFile = newUserData.avatar.substring(8)
      setpictureFileRoute(`../images/member/` + pictureFile)
      localStorage.setItem('userPicture', JSON.stringify(pictureFileRoute))
      console.log(pictureFile)
    }
  }, [newUserData.avatar])

  //*在组件加载时初始化 lastName
  useEffect(() => {
    if (newUserData.name) {
      setLastName(newUserData.name.substring(0, 1))
    }
  }, [newUserData.name])

  //*在組件加載時初始化 firstName
  useEffect(() => {
    if (newUserData.name) {
      setFirstName(newUserData.name.substring(1))
    }
  }, [newUserData.name])

  //*在組件加載時初始化 bornYear
  useEffect(() => {
    if (userData.birthdate) {
      setBornYear(parseInt(userData.birthdate.split('-')[0]))
    }
  }, [userData.birthdate])

  //*在组件加载时初始化 bornMonth
  useEffect(() => {
    if (userData.birthdate) {
      let Mybirthdate = userData.birthdate.split('-')
      setBornMonth(parseInt(Mybirthdate[1]))
    }
  }, [userData.birthdate])

  //*在組件加載時初始化 bornDay
  useEffect(() => {
    if (userData.birthdate) {
      setBornDay(parseInt(userData.birthdate.split('-')[2])) // 从生日中提取日期部分并解析为整数
    }
  }, [userData.birthdate])

  //*登出功能
  const handleLogout = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('userKey')
    console.log(token)
    try {
      const response = await fetch(logoutUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, //? 寄送token，讓驗證的token被現在宋過去的token給覆蓋掉
        },
      })

      if (response.ok) {
        const result = await response.json()
        console.log(result)

        // 清除本地存儲的 會員id
        localStorage.removeItem('userIdLocalStorage')

        // 清除本地存儲的 token
        // localStorage.removeItem('userKey')
        // 跳转到登录页面或其他需要的页面

        // 清除Context中的所有数据
        clearUserIdData()

        router.push('./login')
      } else {
        // 處理錯誤情況
        console.error('Failed to logout')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  //*修改會員資料
  // 將此函數放在您的前端代碼中，用於向後端發送編輯個人資料的請求
  async function editProfile(e) {
    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    e.preventDefault()
    const token = localStorage.getItem('userKey') //*token的索引值
    const editUrl = `http://localhost:3005/api/member-edit/${userIdLocalStorage}`
    try {
      const response = await fetch(editUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 將身份驗證令牌添加到請求標頭中
        },
        body: JSON.stringify({
          name: lastName + firstName, // 組合姓和名成完整姓名
          birthdate: `${bornYear}-${bornMonth}-${bornDay}`, // 將年、月、日組合成生日日期
          gender: gender, // 使用從前端獲取的性別值
          password: myPassword, // 使用從前端獲取的密碼值
          phone: myPhone, // 使用從前端獲取的電話號碼值
          city: liveCity, // 使用從前端獲取的居住城市值
          district: liveDistrict, // 使用從前端獲取的居住地區值
          address: liveAddress, // 使用從前端獲取的居住地址值
        }),
      })

      if (response.ok) {
        // 如果編輯個人資料成功，則顯示成功消息
        const result = await response.json()
        console.log(result.message)
        notifySuccess()
      } else {
        // 如果編輯個人資料失敗，則顯示錯誤消息
        console.error('編輯個人資料失敗：', response.message)
      }
    } catch (error) {
      console.error('發生錯誤：', error)
    }
  }

  //*在组件加载时初始化 lastName
  useEffect(() => {
    if (newUserData.name) {
      setLastName(newUserData.name.substring(0, 1))
    }
  }, [newUserData.name])

  //*在組件加載時初始化 firstName
  useEffect(() => {
    if (newUserData.name) {
      setFirstName(newUserData.name.substring(1))
    }
  }, [newUserData.name])

  //*資料庫回傳回來的是男生就勾選男生，如果是女生就勾選女生
  useEffect(() => {
    if (userData.gender) {
      setGender(userData.gender)
    }
  }, [userData.gender])

  //*在組件加載時初始化 bornYear
  useEffect(() => {
    if (userData.birthdate) {
      setBornYear(parseInt(userData.birthdate.split('-')[0]))
    }
  }, [userData.birthdate])

  //*處理複選框變化的函數
  const handleGenderChange = (event) => {
    setGender(event.target.value)
  }

  //*在组件加载时初始化 bornMonth
  useEffect(() => {
    if (userData.birthdate) {
      let Mybirthdate = userData.birthdate.split('-')
      setBornMonth(parseInt(Mybirthdate[1]))
    }
  }, [userData.birthdate])

  //*在組件加載時初始化 bornDay
  useEffect(() => {
    if (userData.birthdate) {
      setBornDay(parseInt(userData.birthdate.split('-')[2])) // 从生日中提取日期部分并解析为整数
    }
  }, [userData.birthdate])

  //*在組件加載時初始化 city
  useEffect(() => {
    if (userData.city) {
      setliveCity(userData.city)
    }
  }, [userData.city])

  //*在組件加載時初始化 district
  useEffect(() => {
    if (userData.district) {
      setliveDistrict(userData.district) // 將userData.district設定為一個陣列，然後再設定給districts
    }
  }, [userData.district])

  //*在組件加載時初始化 address
  useEffect(() => {
    if (userData.address) {
      setliveAddress(userData.address) // 將userData.district設定為一個陣列，然後再設定給districts
    }
  }, [userData.address])

  //*在組件加載時初始化 password
  useEffect(() => {
    if (userData.password) {
      setmyPassword(userData.password) // 將userData.district設定為一個陣列，然後再設定給districts
    }
  }, [userData.password])

  //*在組件加載時初始化 phone
  useEffect(() => {
    if (userData.phone) {
      setmyPhone(userData.phone) // 將userData.district設定為一個陣列，然後再設定給districts
    }
  }, [userData.phone])

  //*密碼顯示
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword)
  }

  //*在組件載入時設置預設值
  useEffect(() => {
    if (liveCity) {
      const selectedDistricts = districtsByCity[liveCity] || []
      setDistricts(selectedDistricts)
    }
  }, [liveCity])

  //* 載入各鄉鎮區資料，select選完各縣市後，會跳出鄉鎮區
  const handleCityChange = (event) => {
    const selectedCity = event.target.value
    setliveCity(selectedCity)
    const selectedDistricts = districtsByCity[selectedCity] || []
    setDistricts(selectedDistricts)
  }

  //*生成西元(年)
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 40
  const years = []
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year)
  }
  //*生成月份
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  //* 獲取给定月份的天数
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  //*根據所選月份更新日期選項
  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value)
    setSelectedMonth(month)
    setSelectedDay('')
  }

  //*當選中的月份變化時，更新日期選項
  useEffect(() => {
    if (bornMonth !== '') {
      const daysInMonth = getDaysInMonth(bornMonth, new Date().getFullYear())
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1))
      if (bornDay > daysInMonth) {
        setSelectedDay('')
      }
    }
  }, [bornMonth])

  const handleDayChange = (e) => {
    const day = parseInt(e.target.value)
    setSelectedDay(day)
  }

  {
    userData.name === '' && (
      <div className={styles['loadingAnimation']}>
        <LottieAnimation
          lotti={animationData} // 動畫資料
          width={500} // 寬度
          height={500} // 高度
        />
      </div>
    )
  }

  return (
    <>
      {!animationLoaded && (
        <div
          className={`${styles['afterLogingBackgroundColor']} ${styles['overlay']}`}
        >
          <div style={{ textAlign: 'center' }}>
            <LottieAnimation
              animationData={animationData}
              // onComplete={handleAnimationComplete}
            />
          </div>
        </div>
      )}

      {animationLoaded && (
        <div className={styles['topContainer']}>
          <main className={styles['personalData']}>
            <div className={styles['middleContainer']}>
              <form method="post" className={styles['formContainer']}>
                <div className={styles['mainTitle']}>
                  <div className={styles['mainWordTitle']}>
                    個人資料
                    <Tooltip title="編輯" placement="right-start" followCursor>
                      <button
                        type="button"
                        color="primary"
                        className={`${styles['personalDataButton']} ${styles['custom-fab']}`}
                        aria-label="edit"
                        sx={{ minHeight: 'unset' }}
                        onClick={handleEditClick}
                      >
                        <EditIcon />
                      </button>
                    </Tooltip>
                    {/* <button
                    className={styles['personalDataButton']}
                    type="button"
                    onClick={handleLogout}
                  >
                    登出
                  </button> */}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>
                    完成填寫個人資料可享有更多會員專屬權益
                  </div>
                </div>
                <div
                  className={`d-flex ${styles['writeName']}`}
                  style={{ marginTop: 15 }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className={styles['labelEditPersonData']}
                    >
                      姓名
                    </label>
                    <br />
                    <input
                      type="text"
                      id="lasttName"
                      name="name"
                      placeholder="姓"
                      style={{ height: 38 }}
                      className={styles['textEditPersonData']}
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value)
                      }}
                      required=""
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      name="name"
                      placeholder="名"
                      style={{ height: 38 }}
                      className={styles['textEditPersonData']}
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value)
                      }}
                      required=""
                    />
                  </div>
                </div>
                <div className={styles['editPersonGender']}>
                  <div>
                    <label
                      htmlFor="email"
                      className={styles['labelEditPersonData']}
                    >
                      生理性別
                    </label>
                    <div>
                      <input
                        type="checkbox"
                        id="male"
                        name="gender"
                        value="1"
                        checked={gender === '1'}
                        onChange={handleGenderChange}
                      />
                      <label
                        htmlFor="male"
                        className={`${styles['labelEditPersonData']} ${styles['maleEditData']}`}
                      >
                        男
                      </label>
                      <input
                        type="checkbox"
                        id="female"
                        name="gender"
                        value="0"
                        checked={gender === '0'} // 如果 gender 等于 '0'，则勾选女性复选框
                        onChange={handleGenderChange}
                      />
                      <label
                        htmlFor="female"
                        className={`${styles['labelEditPersonData']} ${styles['femaleEditData']}`}
                      >
                        女
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles['writeBirthday']}>
                  <div className={styles['writeBirthdayYear']}>
                    <label
                      htmlFor="year"
                      className={styles['labelEditPersonData']}
                    >
                      生日(西元)
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={bornYear}
                      onChange={(event) => {
                        setBornYear(event.target.value)
                      }}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}年
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles['writeBirthdayMonth']}>
                    <label
                      htmlFor="month"
                      className={styles['labelEditPersonData']}
                    >
                      月份
                    </label>
                    <select
                      id="month"
                      name="month"
                      value={bornMonth}
                      onChange={(event) => {
                        setBornMonth(event.target.value)
                        handleMonthChange(event)
                      }}
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}月
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="day"
                      className={styles['labelEditPersonData']}
                    >
                      日期
                    </label>
                    <select
                      id="day"
                      name="day"
                      value={bornDay}
                      onChange={(event) => {
                        setBornDay(event.target.value)
                        handleDayChange(event)
                      }}
                    >
                      <option value="">選擇日期</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}日
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles['writeAddress']}>
                  <div className={styles['writeAddressCity']}>
                    <label
                      htmlFor="city"
                      className={styles['labelEditPersonData']}
                    >
                      居住縣市:
                    </label>
                    <br />
                    <select
                      id="city"
                      name="city"
                      onChange={(event) => {
                        handleCityChange(event) // 调用 handleCityChange 处理函数
                        setliveCity(event.target.value) // 更新 liveCity 状态
                      }}
                      value={liveCity}
                      required=""
                    >
                      <option value="">請選擇居住縣市</option>
                      {Object.keys(districtsByCity).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles['writeAddressDistrict']}>
                    <label
                      htmlFor="district"
                      className={styles['labelEditPersonData']}
                      value={districts}
                    >
                      鄉鎮區
                    </label>
                    <br />
                    <select
                      id="district"
                      name="district"
                      value={liveDistrict}
                      onChange={(event) => {
                        setliveDistrict(event.target.value)
                      }}
                      required=""
                    >
                      <option value="" className="form-control">
                        選擇鄉鎮區
                      </option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles['liveAddress']}>
                    <label
                      htmlFor="address"
                      className={styles['labelEditPersonData']}
                    >
                      居住地址
                    </label>
                    <br />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="輸入地址"
                      className={styles['textEditPersonData']}
                      value={liveAddress}
                      onChange={(event) => {
                        setliveAddress(event.target.value)
                      }}
                      required=""
                    />
                  </div>
                </div>
                <div className={styles['writeAddressPassword']}>
                  <div className={styles['editPassword']}>
                    <label
                      htmlFor="password"
                      className={styles['labelEditPersonData']}
                    >
                      密碼
                    </label>
                    <div className={styles['writePasswordContainer']}>
                      <br />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="請輸入密碼"
                        value={myPassword}
                        onChange={(event) => {
                          setmyPassword(event.target.value)
                        }}
                        className={styles['textEditPersonData']}
                      />
                      <input
                        type="checkbox"
                        id="showPasswordCheckbox"
                        checked={showPassword}
                        className={styles['checkPassword']}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="showPasswordCheckbox"
                        className={styles['ifShowPassword']}
                      >
                        {showPassword ? '隱藏密碼' : '顯示密碼'}
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles['writeAddressPhone']}>
                  <div className={styles['writePhone']}>
                    <label
                      htmlFor="phone"
                      className={styles['labelEditPersonData']}
                    >
                      手機號碼
                    </label>
                    <br />
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={myPhone}
                      onChange={(event) => {
                        setmyPhone(event.target.value)
                      }}
                      className={styles['textEditPersonData']}
                    />
                  </div>
                </div>
                <div className={styles['editPersonalButton']}>
                  <div
                    className={`animate__animated  ${
                      isEditing ? 'animate__flipInX' : 'animate__flipOutX'
                    } `}
                  >
                    <button
                      type="button"
                      className={`${styles['custom-btn']} ${styles['btn-7']} `}
                      onClick={handleCancelClick}
                      style={{ display: isEditing ? 'block' : 'none' }}
                    >
                      <span style={{ fontWeight: '600' }}>取 消</span>
                    </button>
                  </div>
                  <div
                    className={`animate__animated ${
                      isEditing ? 'animate__flipInX' : 'animate__flipOutX'
                    }  `}
                  >
                    <button
                      type="submit"
                      className={`${styles['custom-btn']} ${styles['btn-7']}`}
                      style={{ display: isEditing ? 'block' : 'none' }}
                      onClick={editProfile}
                    >
                      <span>儲 存</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}
      <Toaster />
    </>
  )
}

EditPersonalData.getLayout = function (page) {
  return <UserLayout>{page}</UserLayout>
}
