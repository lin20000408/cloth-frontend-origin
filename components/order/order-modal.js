import React, { useState, useEffect } from 'react'
import { Button, Modal, Collapse, ConfigProvider } from 'antd'
import styles from '@/styles/order/order.module.css'
import ReceiverSelect from './receiver-select'
import ReceiverSelectHome from './receiver-select-home'
import { useBackEndData } from '@/hooks/use-backEnd-catchData'

const items = [
  {
    key: '1',
    label: '宅配到家 $60',
    children: <ReceiverSelectHome />,
  },
  {
    key: '2',
    label: '7-ELEVEN $60',
    children: <ReceiverSelect />,
  },
]

const Collaspe2 = () => {
  const onChange = (key) => {
    console.log(key)
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'IBM Plex Sans TC',
          colorText: 'white',
        },
        components: {
          Collapse: {
            headerBg: '#ABC8BC',
            headerColor: '#ABC8BC',
          },
        },
      }}
    >
      <Collapse
        accordion
        items={items}
        defaultActiveKey={['1']}
        onChange={onChange}
      />
    </ConfigProvider>
  )
}

export default function OrderModal({ setOrderShipAddress }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { updateSharData, shareData } = useBackEndData('')
  console.log('share', shareData)

  const fetchSelectAddressData = async (setOrderShipAddress) => {
    const addressIdLocalStorage = JSON.parse(
      localStorage.getItem('selectedShipId')
    )
    try {
      //拉出1筆7-11或宅配的資料庫
      const response = await fetch(
        `http://localhost:3005/api/order_memberinfo/sevenEleven/pick/${shareData}`,
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
        const orderShipAddress = responseData.data.pick_ShipAddress

        console.log('從後端接收到的數據7-11：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的數據7-11：', orderShipAddress) // 在控制台console.log接收到的數據
        setOrderShipAddress(orderShipAddress)
      } else if (responseData.status === 'successHome') {
        const orderShipAddress = responseData.data.pick_HomeAddress

        console.log('從後端接收到的數據home：', responseData) // 在控制台console.log接收到的數據
        console.log('從後端接收到的數據home：', orderShipAddress) // 在控制台console.log接收到的數據
        setOrderShipAddress(orderShipAddress)
      } else {
        console.warn('請求失敗')
        return {}
      }
    } catch (error) {
      console.error('發送請求時出錯：', error)
      return {}
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // useEffect(() => {
  //   fetchSelectAddressData(setOrderShipAddress)
  // }, [])

  return (
    <>
      <Button
        type="dark"
        onClick={showModal}
        className={`btn btn-outline-dark ${styles['keep-buying']}`}
        style={{ height: '50px' }} // 注意此处的样式应该用双花括号包裹
      >
        修改
      </Button>
      <Modal
        title="選擇寄送方式"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={600}
        centered
      >
        {/* <p>{modalText}</p> */}
        <Collaspe2 />
        <div className="modal-footer d-flex gap-2 justify-content-center mt-3">
          <button
            className="btn btn-dark"
            onClick={() => {
              setIsModalOpen(false)
            }}
          >
            取消
          </button>
          <button
            className="btn btn-ddprimary text-white border-ddprimary"
            style={{ backgroundColor: '#00917c' }}
            htmlType="submit"
            onClick={() => {
              fetchSelectAddressData(setOrderShipAddress)
              setIsModalOpen(false)
            }}
          >
            完成
          </button>
        </div>
      </Modal>
    </>
  )
}
