import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Radio, ConfigProvider } from 'antd'
import SevenElevenApi from '../ship/seven-api'
import styles from '@/styles/order/order.module.css'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

export default function ReceiverSelect({ setOrderShipId }) {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [store711, setStore711] = useState({})
  const [addressData, setAddressData] = useState([])
  const [shipAddress, setShipAddress] = useState([])
  const [value, setValue] = useState(1)

  const { updateSharData, shareData } = useBackEndData('')

  const onChange = (e) => {
    console.log('radio checked', e.target.value, store711)
    setValue(e.target.value)

    // 等待 updateSharData 完成
    updateSharData(e.target.value)
  }

  const fetchAddressData = async (finalValues) => {
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order_memberinfo/sevenEleven/${userIdLocalStorage}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalValues),
        }
      )
      const responseData = await response.json() // 解析數據
      // 處理響應
      if (responseData.status === 'success') {
        const orderAddressData = responseData.data.order_memberinfo

        setAddressData(orderAddressData)
        console.log('從後端接收到的數據：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的數據：', orderAddressData) // 在控制台console.log接收到的數據
      } else {
        console.warn('請求失敗')
        return {}
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return {}
    }
  }

  const fetchSelectAddressData = async (finalValues) => {
    // const userId = userIdData
    // console.log('userId:', userIdData) //查詢是否有抓到id

    // 從localStorage的userIdLocalStorage中取出user.id資料
    const userIdLocalStorage = JSON.parse(
      localStorage.getItem('userIdLocalStorage')
    )

    try {
      const response = await fetch(
        `http://localhost:3005/api/order_memberinfo/sevenEleven/${userIdLocalStorage}`,
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
        const orderShipAddress = responseData.data.order_ShipAddress
        setShipAddress(orderShipAddress)
        console.log('從後端接收到的數據888：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的數據：', orderShipAddress) // 在控制台console.log接收到的數據
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

  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const onFinish = (values) => {
    // 手动将 store711 的值添加到提交的数据中
    const finalValues = {
      ...values,
      storename: store711.storename,
      storeaddress: store711.storeaddress,
      storeId: store711.storeid,
      outside: store711.outside,
      ship: store711.ship,
      TempVar: store711.TempVar,
    }
    console.log('Success:', finalValues)
    fetchAddressData(finalValues)
    setOpen(false)
    // handleOk(); // 这里可以根据表单提交的逻辑来执行相应的操作，例如关闭 Modal
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleStoreSelect = (store) => {
    setStore711(store)
  }

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
              // buttonSolidCheckedActiveBg: '#aabec3',
              // buttonSolidCheckedHoverBg: '#aabec3',
              // buttonSolidCheckedBg: '#aabec3',
              colorPrimary: '#aabec3',
            },
            Button: {},
          },
        }}
      >
        <Radio.Group onChange={onChange} value={value}>
          {shipAddress.map((v) => {
            return (
              <Radio
                value={v.id}
                key={v.id}
                style={{
                  marginBottom: '10px',
                  marginRight: '20px',
                  width: '500px',
                }}
              >
                <ul style={{ marginBottom: '10px', marginRight: '20px' }}>
                  <li style={{ marginRight: '20px' }}>
                    <span style={{ marginRight: '10px' }}>{v.name}</span>
                    <span>{v.phone}</span>
                  </li>
                  <li>
                    <span style={{ marginRight: '15px' }}>{v.storename}</span>
                    <span style={{ color: '#929292' }}>{v.storeaddress}</span>
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
          <span>新增7-11地址</span>
        </button>
        <Modal
          title="新增超商地址"
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
            phone: '0966789456', }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              style={{
                border: '3px solid #ABC8BC',
                borderRadius: '9px',
              }}
            >
              <Input placeholder="請輸入收件人姓名" />
            </Form.Item>

            <Form.Item
              name="phone"
              style={{
                border: '3px solid #ABC8BC',
                borderRadius: '9px',
              }}
            >
              <Input placeholder="請輸入收件人電話" />
            </Form.Item>

            <Form.Item>
              <SevenElevenApi onStoreSelect={handleStoreSelect} />
            </Form.Item>

            <Form.Item label="門市名稱">
              <Input value={store711.storename || ''} disabled />
            </Form.Item>

            <Form.Item label="門市地址">
              <Input value={store711.storeaddress || ''} disabled />
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
