import UserLayout from '@/components/layout/user-layout'
import styles from '@/styles/member/edit-address.module.css'
import AddressItem from '@/components/member/edit-address'
import cityOfDistricts from '@/data/City&District' //*載入各鄉鎮區
import { FaPlus } from 'react-icons/fa'
import { useState, useEffect, useRef, use } from 'react'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { FaTrash, FaHome, FaQuestionCircle } from 'react-icons/fa'
import Tooltip from '@mui/material/Tooltip'
import toast, { Toaster } from 'react-hot-toast'
//引入Swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function EditAddress() {
  //* 要改用sweetalert2-react-content來取代Swal
  const MySwal = withReactContent(Swal)
  const inputRef = useRef(null)
  const [addressId, setAddressId] = useState('')
  const [message, setMessage] = useState('')
  const [recipientphone, setRecipientphone] = useState('')
  const [recipientAddress, setrecipientAddress] = useState('')
  const [memberAddress, setMemberAddress] = useState([])
  const [city, setcity] = useState('')
  const [address, setaddress] = useState('')
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [name, setName] = useState('')
  const districtsByCity = cityOfDistricts //*將各地區的資料放到districtsByCity
  const [isEditing, setIsEditing] = useState(false)

  //*引用sweetalert2
  const notifyAndRemove = (AddressName, addressId) => {
    MySwal.fire({
      title: '確定要刪除嗎?',
      text: '這將無法復原',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: '刪除!',
          text: AddressName + '收件地址已被刪除',
          icon: 'success',
        })
        deleteAddress(addressId)
      }
    })
  }

  //*吐司訊息
  const notifySuccess = () => toast.success('修改成功')
  const notifyAddSuccess = () => toast.success('新增成功')

  //*顯示編輯，刪除，預設button
  const showButton = () => {
    isEditing === true ? setIsEditing(false) : setIsEditing(true)
    console.log(isEditing)
  }
  //*編輯地址
  // 將此函數放在您的前端代碼中，用於向後端發送編輯個人資料的請求
  async function editAddressProfile(id) {
    // 從localStorage的userIdLocalStorage中取出user.id資料

    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    const token = localStorage.getItem('userKey') //*token的索引值
    const editUrl = `http://localhost:3005/api/member-address/edit-address/${userIdLocalStorage}`
    try {
      const response = await fetch(editUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addressId: id,
          name, //收件姓名
          recipientphone, // 聯絡人電話
          city, // 收件縣市
          district, // 收件鄉鎮區
          address, // 收件詳細地址
        }),
      })

      if (response.ok) {
        // 編輯個人地址資料成功，則顯示成功消息
        const result = await response.json()
        console.log(result.message)
        setMemberAddress(result.result)
        notifySuccess('修改成功')
      } else {
        // 如果編輯個人資料失敗，則顯示錯誤消息
        console.error('修改地址失敗：', response.message)
      }
    } catch (error) {
      console.error('發生錯誤：', error)
    }
  }

  //*新增一件地址
  const quickAddAddress = () => {
    setRecipientName('蔡欣羽')
    setRecipientphone('0912345678')
    setcity('台北市')
    setDistricts(districtsByCity['台北市'])
    setDistrict('大安區')
    setrecipientAddress('中正路1號二段')
  }

  //*新增地址
  const addAddress = async (e) => {
    e.preventDefault()
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )
    try {
      const response = await fetch(
        `http://localhost:3005/api/member-address/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipientName: recipientName,
            recipientphone: recipientphone,
            recipientCity: city,
            recipientDistrict: district,
            recipientAddress: recipientAddress,
          }),
        }
      )

      if (response.ok) {
        const result = await response.json()
        console.log(result)
        setMessage(result.message) // 承接後端返回的訊息
        console.log(message)
        notifyAddSuccess()
        // router.push('./edit-personal-data')
      } else {
        const data = await response.json()
        setMessage(data) // 承接後端返回的錯誤訊息
        console.log(data.message) // 可以在控制台打印錯誤訊息
      }
    } catch (error) {
      console.error(error)
    }
  }

  //* 取得當前收件地址有幾個
  useEffect(() => {
    async function fetchAddressData() {
      try {
        const userIdLocalStorage = JSON.parse(
          localStorage.getItem('userIdLocalStorage')
        )
        const response = await fetch(
          `http://localhost:3005/api/member-address/${userIdLocalStorage}`,
          {
            method: 'GET',
          }
        )
        if (response.ok) {
          const userAddress = await response.json()
          console.log(userAddress.message)
          setMemberAddress(userAddress.message)
        } else {
          console.error('Error fetching user profile:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchAddressData()
  }, [message])

  //* 設為預設地址
  const setAsDefaultAddress = async (id) => {
    try {
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      )
      const response = await fetch(
        `http://localhost:3005/api/member-address/set-default/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: id,
          }),
        }
      )
      if (response.ok) {
        // 更新地址狀態以反映新的預設地址
        setMemberAddress((memberAddress) =>
          memberAddress.map((address) =>
            address.id === id
              ? { ...address, is_default: '1' }
              : { ...address, is_default: '0' }
          )
        )
      } else {
        console.error('Error setting default address:', response.statusText)
      }
    } catch (error) {
      console.error('Error setting default address:', error)
    }
  }

  //* 刪除地址
  const deleteAddress = async (id) => {
    try {
      const userIdLocalStorage = JSON.parse(
        localStorage.getItem('userIdLocalStorage')
      )
      const response = await fetch(
        `http://localhost:3005/api/member-address/delete-address/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: id,
          }),
        }
      )
      if (response.ok) {
        // 更新地址列表，刪除指定ID的地址
        setMemberAddress(memberAddress.filter((address) => address.id !== id))
        // alert('刪除成功')
      } else {
        console.error('Error deleting address:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting address:', error)
    }
  }

  let selectedCity
  //* 載入各鄉鎮區資料，預設or縣市出現後，會跳出預設or鄉鎮區
  const handleCityChange = (event) => {
    selectedCity = event.target.value
    console.log(selectedCity)
    setcity(selectedCity)
    console.log(city)
    const selectedDistricts = districtsByCity[selectedCity] || []
    setDistricts(selectedDistricts)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginBottom: '30px',
        }}
        className={styles['topContainer']}
      >
        <div style={{ width: '100%' }}>
          <main
            className={styles['subContainer']}
            style={{
              marginTop: 90,
              marginLeft: 0,
              marginRight: 0,
              width: '100%',
            }}
          >
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 5 }}>
                收件地址一覽
              </div>
            </div>
            <form action="/edit" method="post">
              <div>
                <div
                  style={{ fontWeight: 600 }}
                  className={styles['editAddressTitle']}
                >
                  新增收件地址
                </div>
                <div
                  className="d-flex"
                  style={{
                    marginTop: 15,
                    paddingBottom: 5,
                    borderBottom: '1px solid rgb(199, 193, 193)',
                    position: 'relative',
                    height: '45px',
                  }}
                >
                  <p
                    style={{
                      borderRight: '1px solid black',
                      display: 'inline-block',
                      margin: 0,
                      paddingRight: 10,
                      marginRight: 10,
                      marginTop: 15,
                      fontSize: 18,
                    }}
                  >
                    {memberAddress.length}個地址
                  </p>
                  <p
                    style={{
                      display: 'inline-block',
                      margin: 0,
                      marginTop: 15,
                      fontSize: 18,
                    }}
                  >
                    還可以創建
                    {20 - memberAddress.length}
                    個收貨地址
                  </p>
                  <div style={{ padding: '1px' }}>
                    <Tooltip
                      title="新增地址"
                      placement="right-start"
                      followCursor
                    >
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop1"
                        className={styles['addAddressButton']}
                        aria-label="add"
                      >
                        <FiPlus style={{ fontSize: '24px' }} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* 新增地址modal */}
              <div className={`border-ddsecondary`}>
                {/* Modal */}
                <div
                  className="modal fade"
                  id="staticBackdrop1"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content rounded-1">
                      <div className="modal-header bg-ddprimary rounded-0">
                        <h5
                          className="modal-title text-white"
                          id="staticBackdropLabel"
                        >
                          新增收件地址
                          <button
                            type="button"
                            style={{
                              border: 'none',
                              backgroundColor: 'transparent',
                              fontSize: '12px',
                            }}
                            onClick={quickAddAddress}
                          >
                            點我
                          </button>
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body px-5">
                        <div style={{ display: 'flex' }}>
                          <div style={{ width: '49%', marginRight: 9 }}>
                            <h6 className="text-start">姓名 *</h6>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                aria-label="recipientName"
                                className="form-control"
                                name="recipientName"
                                value={recipientName}
                                onChange={(e) =>
                                  setRecipientName(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div style={{ width: '50%' }}>
                            <h6 className="text-start">電話號碼</h6>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                aria-label="First name"
                                className="form-control"
                                name="recipientphone"
                                value={recipientphone}
                                onChange={(e) =>
                                  setRecipientphone(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <h6 className="text-start">所在縣市 *</h6>
                        <div className="input-group mb-3">
                          <select
                            className="form-select"
                            id="inputGroupSelect01"
                            name="recipientCity"
                            value={city}
                            onChange={handleCityChange}
                          >
                            <option value="">請選擇居住縣市</option>
                            {Object.keys(districtsByCity).map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          <select
                            className="form-select ms-2"
                            id="inputGroupSelect01"
                            name="recipientDistrict"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                          >
                            <option value="">請選擇鄉鎮區</option>
                            {districts.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                          </select>
                        </div>
                        <h6 className="text-start">詳細地址 *</h6>
                        <input
                          type="text"
                          aria-label="address"
                          className="form-control mb-3"
                          name="recipientAddress"
                          value={recipientAddress}
                          onChange={(e) => setrecipientAddress(e.target.value)}
                        />
                      </div>
                      <div className="modal-footer d-flex gap-2 justify-content-center">
                        <button
                          type="button"
                          className="btn"
                          data-bs-dismiss="modal"
                          style={{
                            backgroundColor: 'rgb(131, 128, 128)',
                            border: 'none',
                            color: 'white',
                          }}
                        >
                          取消
                        </button>
                        <button
                          type="button"
                          className="btn btn-ddprimary text-white"
                          onClick={addAddress}
                        >
                          確認新增
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 編輯地址modal 和 呈現地址 */}
              {[...memberAddress].map((data, index) => (
                <div key={data.id} style={{ marginTop: 30 }}>
                  {/* <input
                    type="hidden"
                    defaultValue={data.id}
                    ref={inputRef}
                    name="addressId"
                  /> */}
                  <div
                    style={{ fontWeight: 600 }}
                    className={styles['editAddressTitle']}
                  >
                    <span className={styles['subTitle']}>
                      可配送地址{' '}
                      <button
                        type="button"
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                        }}
                        onClick={showButton}
                      >
                        <FaQuestionCircle
                          className={styles.icon}
                          style={{ marginBottom: '3px' }}
                        />
                      </button>
                    </span>
                  </div>
                  <AddressItem
                    name={`${data.name}`}
                    address={`${data.city}${data.district}${data.address}`}
                    phone={data.phone}
                    isDefault={data.is_default}
                    onSetDefault={() => setAsDefaultAddress(data.id)}
                    onDelete={() => notifyAndRemove(data.name, data.id)}
                    // onEdit={() => editAddressProfile(data.id)}
                    onModal={`#modal-${data.id}`}
                    isEditing={isEditing}
                  />
                  <div
                    className="modal fade"
                    id={`modal-${data.id}`}
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content rounded-1">
                        <div className="modal-header bg-ddprimary rounded-0">
                          <h5
                            className="modal-title text-white"
                            id="staticBackdropLabel"
                          >
                            修改收件地址
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body px-5">
                          <div style={{ display: 'flex' }}>
                            <div style={{ width: '49%', marginRight: '10px' }}>
                              <h6 className="text-start">姓名 *</h6>
                              <div className="input-group mb-3">
                                <input
                                  type="text"
                                  aria-label="name"
                                  className="form-control"
                                  defaultValue={data.name}
                                  name="name"
                                  onChange={(e) => {
                                    setName(e.target.value)
                                  }}
                                />
                              </div>
                            </div>
                            <div style={{ width: '50%' }}>
                              <h6 className="text-start">您的電話號碼 *</h6>
                              <input
                                name="recipientphone"
                                type="text"
                                aria-label="phone"
                                className="form-control"
                                defaultValue={data.phone}
                                onChange={(e) => {
                                  setRecipientphone(e.target.value)
                                }}
                              />
                            </div>
                          </div>

                          <h6 className="text-start">所在縣市 *</h6>
                          <div className="input-group mb-3">
                            <select
                              className="form-select"
                              id="inputGroupSelect01"
                              name="city"
                              onChange={handleCityChange}
                              defaultValue={data.city}
                            >
                              <option selected="">請選擇居住縣市</option>
                              {Object.keys(districtsByCity).map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                            <select
                              className="form-select ms-2"
                              id="inputGroupSelect01"
                              defaultValue={data.district}
                              name="district"
                              onChange={(e) => {
                                setDistrict(e.target.value)
                              }}
                            >
                              <option selected="">請選擇鄉鎮區</option>
                              {districtsByCity[data.city].map((district) => (
                                <option key={district} value={district}>
                                  {district}
                                </option>
                              ))}
                            </select>
                          </div>
                          <h6 className="text-start">詳細地址 *</h6>
                          <input
                            type="text"
                            name="address"
                            aria-label="address"
                            className="form-control mb-3"
                            defaultValue={data.address}
                            onChange={(e) => {
                              setaddress(e.target.value)
                            }}
                          />
                        </div>
                        <div className="modal-footer d-flex gap-2 justify-content-center">
                          <button
                            type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            style={{
                              backgroundColor: 'rgb(131, 128, 128)',
                              border: 'none',
                              color: 'white',
                            }}
                          >
                            取消
                          </button>
                          <button
                            type="button"
                            className="btn btn-ddprimary text-white"
                            onClick={() => editAddressProfile(data.id)}
                          >
                            確認修改
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </main>
        </div>
      </div>
      <Toaster />
    </>
  )
}

EditAddress.getLayout = function (page) {
  return <UserLayout>{page}</UserLayout>
}
