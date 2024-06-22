import { Modal, ConfigProvider } from 'antd'
import styles from '@/styles/colorology/colorology.module.css'
import Link from 'next/link'

export default function ColorologyJumpPageModal({ visible }) {
  // 取得當前日期
  const currentDate = new Date()
  // 取得當前年份
  const currentYear = currentDate.getFullYear()
  // 取得當前月份，注意 JavaScript 中月份是從 0 開始計算的，因此要加 1
  const currentMonth = currentDate.getMonth() + 1
  // 將月份轉換為兩位數的字串表示，如果月份小於 10，則在前面補 0
  const currentMonthString =
    currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'IBM Plex Sans TC',
          },
        }}
      >
        <Modal
          visible={visible}
          footer={null}
          keyboard={false}
          closable={false}
          maskClosable={false}
          centered
          width={400}
        >
          <div className={styles['modal-body']}>
            <h2>您已領取過</h2>
            <h5>{`${currentYear}年${currentMonthString}月色彩學優惠劵`}</h5>
            <button
              className={`${styles['custom-btn']} ${styles['btn-7']} ${styles['btn-11']}`}
            >
              {' '}
              <Link href="./colorology/colorology-result">
                <span>查看測驗結果</span>
              </Link>
            </button>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  )
}
