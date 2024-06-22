import UserLayout from '@/components/layout/user-layout'
import styles from '@/styles/member/add-address.module.css'
import { useState } from 'react'
import cityOfDistricts from '@/data/City&District' //!載入各鄉鎮區

export default function Addaddress() {
  const [name, setname] = useState('')
  const [city, setcity] = useState('')
  const [districts, setDistricts] = useState([])
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('123456')
  const districtsByCity = cityOfDistricts //!將各地區的資料放到districtsByCity
  const [message, setMessage] = useState('') //! 新增 setMessage 狀態
  //* 載入各鄉鎮區資料，select選完各縣市後，會跳出鄉鎮區
  const handleCityChange = (event) => {
    const selectedCity = event.target.value
    setcity(selectedCity)
    const selectedDistricts = districtsByCity[selectedCity] || []
    setDistricts(selectedDistricts)
  }

  //*新增地址
  const addAddress = async (e) => {
    e.preventDefault()
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    let user, token
    try {
      const response = await fetch(
        `http://localhost:3005/api/member-address/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            city,
            district: districts.length > 0 ? districts[0] : '', // 如果沒有選擇鄉鎮區，則設为空字符串
            address,
          }),
        }
      )

      if (response.ok) {
        const result = await response.json()
        console.log(result)
        setMessage(result.message) // 承接後端返回的訊息
        console.log(message)
        alert('新增地址成功')
        // router.push('./edit-personal-data')
      } else {
        const data = await response.json()
        setMessage(data.message) // 承接後端返回的錯誤訊息
        console.log(data.message) // 可以在控制台打印錯誤訊息
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={styles['topContainer']}>
        <main className={styles['mainAddAddress']}>
          <div>
            <div className={styles['recipientAddress']}>
              <div className={styles['recipient-address']}>收件地址一覽</div>
              <div className={styles['sub-recipient-address']}>
                可更新您的宅配配送地址
              </div>
            </div>
            <form method="post" id="post" className={styles['formAddAdress']}>
              <div className="d-flex">
                <div style={{ width: '30%', marginRight: 30 }}>
                  <label
                    htmlFor="name"
                    style={{ fontWeight: 600 }}
                    className={styles['labelAddAdress']}
                  >
                    收件人姓名
                  </label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="姓名"
                    style={{ height: 38 }}
                    required=""
                    className={styles['textAddAdress']}
                    onChange={(e) => {
                      setname(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className={styles['addAddress']}>
                <div style={{ marginRight: 30 }}>
                  <label htmlFor="city" className={styles['labelAddAdress']}>
                    收件地址
                  </label>
                  <br />
                  <select
                    id="city"
                    name="city"
                    onChange={handleCityChange}
                    className={styles['selectAddAddress']}
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
                <div style={{ marginRight: 30 }}>
                  <label
                    htmlFor="district"
                    className={styles['labelAddAdress']}
                  >
                    鄉鎮區
                  </label>
                  <br />
                  <select
                    id="district"
                    name="district"
                    className={styles['selectAddAddress']}
                    required=""
                  >
                    <option value="" className={styles['form-control']}>
                      請選擇鄉鎮區
                    </option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="liveAddress">
                  <label
                    htmlFor="address"
                    className={`${styles['address']} ${styles['labelAddAdress']}`}
                  >
                    地址
                  </label>
                  <br />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="請詳填地址"
                    className={styles['textAddAdress']}
                    onChange={(e) => {
                      setaddress(e.target.value)
                    }}
                    required=""
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className={styles['phone']}>
                  <label htmlFor="phone" className={styles['labelAddAdress']}>
                    手機號碼
                  </label>
                  <br />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    style={{ height: 30 }}
                    value={phone}
                    className={styles['textAddAdress']}
                    onChange={(e) => {
                      setphone(e.target.value)
                    }}
                    required=""
                  />
                </div>
              </div>
              <div
                className="d-flex justify-content-evenly"
                style={{ marginTop: 35 }}
              >
                <button
                  type="submit"
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                >
                  <span>取 消</span>
                </button>

                <button
                  type="button"
                  id="save"
                  className={`${styles['custom-btn']} ${styles['btn-7']}`}
                  onClick={addAddress}
                >
                  <span>儲 存</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

// 這裡代表要套用NofooterLayout，取代原本的DefaultLayout
// 要寫在元件的函式之外
Addaddress.getLayout = function (page) {
  return <UserLayout>{page}</UserLayout>
}
