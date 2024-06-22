import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Radio, ConfigProvider, Select } from 'antd'
import styles from '@/styles/order/order.module.css'
import cityOfDistricts from '@/data/City&District' //!載入各鄉鎮區
import DemoInput from '@/pages/DemoInput'
// import { useBackEndData } from '@/hooks/use-backEnd-catchData'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function ReceiverSelectHome({ setOrderShipId }) {
  const [name, setname] = useState('柯學佳')
  const [city, setcity] = useState('')
  const [districts, setDistricts] = useState([])
  const [address, setaddress] = useState('')
  const [district, setDistrict] = useState('')
  const [phone, setphone] = useState('0977541278')
  const districtsByCity = cityOfDistricts //!將各地區的資料放到districtsByCity
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [addressData, setAddressData] = useState([])
  const [shipAddress, setShipAddress] = useState([])
  const [value, setValue] = useState(1)

  const { updateSharData, shareData } = useBackEndData('')

  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const onFinish = (values) => {
    console.log('Success:', values)
    fetchAddressData(values)
    setOpen(false)
    // handleOk(); // 这里可以根据表单提交的逻辑来执行相应的操作，例如关闭 Modal
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
    updateSharData(e.target.value)
  }

  //* 載入各鄉鎮區資料，select選完各縣市後，會跳出鄉鎮區
  const handleCityChange = (value) => {
    setcity(value)
    const selectedDistricts = districtsByCity[value] || []
    setDistricts(selectedDistricts)
  }

  const fetchAddressData = async () => {
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order_memberinfo/home/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            city,
            district, // 如果沒有選擇鄉鎮區，則設为空字符串
            address,
          }),
        }
      )
      const responseData = await response.json() // 解析數據
      // 處理響應
      if (responseData.status === 'success') {
        const orderAddressData = responseData.data.order_homeInfo
        setAddressData(orderAddressData)
        console.log('從後端接收到的新增住家數據：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到新增住家數據：', orderAddressData) // 在控制台console.log接收到的數據
      } else {
        console.warn('請求失敗')
        return {}
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return {}
    }
  }

  const fetchSelectAddressData = async () => {
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order_memberinfo/home/${userIdLocalStorage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const responseData = await response.json() // 解析數據
      // 處理響應
      if (responseData.status === 'success') {
        const orderHomeAddress = responseData.data.order_HomeAddress
        setShipAddress(orderHomeAddress)
             if (orderHomeAddress.length > 0) {
               setValue(orderHomeAddress[0].id)
             }
        console.log('從後端接收到的數據999999：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的數據999999：', orderHomeAddress) // 在控制台console.log接收到的數據
      } else {
        console.warn('請求失敗')
        return {}
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return {}
    }
  }

  useEffect(() => {
    fetchSelectAddressData()
  }, [addressData])

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ABC8BC', // 主要顏色
            fontFamily: 'IBM Plex Sans TC',
            colorText: 'black',
          },
          components: {
            Radio: {
              colorPrimary: '#aabec3',
            },
            Button: {
              defaultActiveBorderColor: '#ABC8BC',
            },
          },
          Input: {
            borderColor: '#ABC8BC',
            activeBorderColor: '#ABC8BC',
            hoverBorderColor: '#ABC8BC',
          },
        }}
      >
        <Radio.Group
          value={value}
          onChange={onChange}
          className="d-block"
          defaultValue="v.id[0]"
        >
          {shipAddress.map((v, i) => {
            return (
              <Radio
                value={v.id}
                key={v.id}
                style={{ marginBottom: '10px', marginRight: '20px' }}
              >
                <ul
                  style={{
                    marginBottom: '10px',
                    marginRight: '20px',
                    width: '500px',
                  }}
                >
                  <li style={{ marginRight: '20px' }}>
                    <span style={{ marginRight: '10px' }}>{v.name}</span>
                    <span>{v.phone}</span>
                  </li>
                  <li style={{ color: '#929292' }}>
                    <span>{v.city}</span>
                    <span>{v.district}</span>
                    <span>{v.address}</span>
                  </li>
                </ul>
              </Radio>
            )
          })}
        </Radio.Group>

        <br />
        <button
          onClick={showModal}
          className={`w-50  ${styles['custom-btn']} ${styles['btn-7']}`}
        >
          <span>新增住家地址</span>
        </button>
        <Modal
          title="新增住家地址"
          open={open}
          // onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <Form
            name="basic"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true,  name: '柯學佳',
            phone: '0977541278', }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="name">
              <Input
                placeholder="請輸入收件人姓名"
                onChange={(e) => {
                  setname(e.target.value)
                }}
                style={{
                  border: '3px solid #ABC8BC',
                  borderRadius: '9px',
                }}
              />
            </Form.Item>

            <Form.Item name="phone">
              <Input
                placeholder="請輸入收件人電話"
                onChange={(e) => {
                  setphone(e.target.value)
                }}
                style={{
                  border: '3px solid #ABC8BC',
                  borderRadius: '9px',
                }}
              />
            </Form.Item>
            <Form.Item
              name="city"
              initialValue=""
              style={{
                border: '3px solid #ABC8BC',
                borderRadius: '9px',
              }}
            >
              <Select onChange={handleCityChange}>
                <Select.Option value="">請選擇居住縣市</Select.Option>
                {Object.keys(districtsByCity).map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="district"
              initialValue=""
              style={{
                border: '3px solid #ABC8BC',
                borderRadius: '9px',
              }}
            >
              <Select
                onChange={(e) => {
                  setDistrict(e)
                }}
              >
                <Select.Option
                  value={district}
                  className={styles['form-control']}
                >
                  請選擇鄉鎮區
                </Select.Option>
                {districts.map((district) => (
                  <Select.Option key={district} value={district}>
                    {district}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="address"
              style={{
                border: '3px solid #ABC8BC',
                borderRadius: '9px',
              }}
            >
              <Input
                placeholder="請輸入居住詳細地址"
                onChange={(e) => {
                  setaddress(e.target.value)
                }}
              />
            </Form.Item>

            <Form.Item>
              <button
                className="btn btn-ddprimary text-white border-ddprimary"
                style={{ borderRadius: '5px' }}
                htmlType="submit"
              >
                完成
              </button>
            </Form.Item>
          </Form>
        </Modal>

        <style jsx>
          {`
            li,
            ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
          `}
        </style>
      </ConfigProvider>
    </>
  )
}
