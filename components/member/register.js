import React from 'react'
import styles from '@/styles/member/register.module.css'

export default function Register() {
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
            </div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              已經有帳號?
              <a href="#" style={{ color: '#eea68d', textDecoration: 'none' }}>
                點擊登入
              </a>
            </div>
          </div>
          <form action="/register" method="post">
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
                  required=""
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
                  required=""
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
                    required=""
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
                    className={`form-control ${styles['form-control-1']} ${styles['selectRegister']}`}
                    style={{ height: 38, marginBottom: 15 }}
                    required=""
                  >
                    <option value="male">男生</option>
                    <option value="female">女生</option>
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
                      required=""
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
                  required=""
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
                    onchange="populateDistricts()"
                    className={`form-control ${styles['form-control-1']} ${styles['selectRegister']}`}
                    required=""
                  >
                    <option value="">請選擇居住縣市</option>
                    <option value="基隆市">基隆市</option>
                    <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="桃園市">桃園市</option>
                    <option value="新竹市">新竹市</option>
                    <option value="新竹縣">新竹縣</option>
                    <option value="苗栗縣">苗栗縣</option>
                    <option value="台中市">台中市</option>
                    <option value="彰化縣">彰化縣</option>
                    <option value="南投縣">南投縣</option>
                    <option value="雲林縣">雲林縣</option>
                    <option value="嘉義市">嘉義市</option>
                    <option value="嘉義縣">嘉義縣</option>
                    <option value="台南市">台南市</option>
                    <option value="高雄市">高雄市</option>
                    <option value="屏東縣">屏東縣</option>
                    <option value="台東縣">台東縣</option>
                    <option value="花蓮縣">花蓮縣</option>
                    <option value="宜蘭縣">宜蘭縣</option>
                    <option value="澎湖縣">澎湖縣</option>
                    <option value="金門縣">金門縣</option>
                    <option value="連江縣">連江縣</option>
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
                  >
                    <option
                      value=""
                      className={`form-control ${styles['form-control-1']}`}
                    >
                      請選擇鄉鎮區
                    </option>
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
    </>
  )
}
