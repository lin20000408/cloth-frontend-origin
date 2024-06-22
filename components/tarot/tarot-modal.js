import { Modal, ConfigProvider } from 'antd'
import styles from '@/styles/tarot/tarot.module.css'
import Link from 'next/link'

function TarotModal({ visible, handleCancel }) {
  // 關閉模擬框
  const handleDisagree = () => {
    handleCancel()
  }

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
        >
          <div>
            <p>
              規則說明 :
              <br />
              親愛的使用者，
              <br />
              感謝您選擇我們的DD
              shop塔羅牌占卜，為您提供屬於您獨一無二的穿搭服務。
              <br />
              提醒您一些重要的事項，以確保您能夠正確理解並適當使用我們的服務。
            </p>
            <ol>
              <li>
                隨機抽卡 :
                我們將22張塔羅牌洗好提供您挑選，請不要將其視為真實的預言。
              </li>
              <br />
              <li>
                語意整合 :
                電腦會嘗試將您的問題與抽出的解牌結果進行整合，僅是娛樂性質的功能，請不要將這些結果當作現實中唯一的決策依據。
              </li>
              <br />
              <li>
                謹慎使用 :
                請註意，電腦沒辦法考量您的個人情況及環境給出客觀的建議，請將解牌結果作為娛樂用途，如果您有任何真實生活中的困惑，請尋求專業的意見和協助。
              </li>
              <br />
              <li>
                優惠劵 :
                每個月都能領一次當月的塔羅牌優惠劵，當月重新抽卡將不再發放優惠劵。
              </li>
            </ol>
            <p>
              最後，我們希望您玩的開心！如果您有任何疑問或意見，請於我們聯絡，祝您好運！
            </p>
            <p className="text-center">
              <img
                src="../images/logo.svg"
                alt=""
                className={`${styles['modal-logo']} mb-3`}
              />
              <br /> 敬上
            </p>
            <div className="d-flex justify-content-between">
              <button
                className={`${styles['custom-btn']} ${styles['btn-7']} mb-3`}
                onClick={handleDisagree}
              >
                <span> 不同意 </span>
              </button>
              <button
                className={`${styles['custom-btn']} ${styles['btn-7']} ${styles['btn-11']} mb-3`}
              >
                {' '}
                <Link href="./tarot/tarot-drawCards">
                  <span>同 意</span>
                </Link>
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  )
}

export default TarotModal
