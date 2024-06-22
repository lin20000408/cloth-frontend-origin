import UserLayout from '@/components/layout/user-layout'
import styles from '@/styles/member/recipient-address.module.css'
import { FaPlus } from 'react-icons/fa'
// import { FaPlus } from 'react-icons/fa'
import React from 'react'

export default function RecipientAddress() {
  return (
    <>
      <div className={styles['topContainer']}>
        <main>
          <div className={styles['getAddress']}>
            <div className={styles['getAddressTitle']}>收件地址一覽</div>
            <div className={styles['subAddressTitle']}>
              可更新您的宅配配送地址
            </div>
            <form
              action="/edit"
              method="post"
              className={styles['recipientAddress']}
            >
              <div className={styles['sendAddress']}>配送地址</div>
              <div>
                <input
                  type="text"
                  id="addAdress"
                  name="addAddress"
                  className={styles['addAddress']}
                  placeholder="最多可以創建20個地址"
                  required=""
                />
                <button className={styles['addAddressButton']}>
                  <FaPlus
                    className={styles['icon-hover']}
                    style={{ fontSize: '16px', color: '#abc8bc' }}
                  />
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
RecipientAddress.getLayout = function (page) {
  return <UserLayout>{page}</UserLayout>
}
