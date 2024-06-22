// components/AddressItem.js
import styles from '@/styles/member/edit-address.module.css'
import { FaEdit, FaTrash, FaTruck } from 'react-icons/fa'
import 'animate.css/animate.css'

const AddressItem = ({
  name,
  address,
  phone,
  isDefault,
  onSetDefault,
  onDelete,
  onModal,
  isEditing,
}) => {
  // const [isEditing, setIsEditing] = useState(false)
  // *編輯按鈕

  return (
    <div
      style={{ marginTop: 15, borderBottom: '1px solid rgb(199, 193, 193)' }}
    >
      <p>聯絡人 : {name}</p>
      <p>聯絡人電話 : {phone}</p>
      <p>收貨地址 : {address}</p>
      <div className={`d-flex ${styles['editAddress']}`}>
        <button
          type="button"
          className={`${styles['keep-buying']} ${
            styles['custom-btn']
          } ${styles['btn-7']} animate__animated ${
            isEditing ? 'animate__flipInX' : 'animate__flipOutX'
          } `}
          data-bs-target={onModal}
          data-bs-toggle="modal"
          style={{
            width: '80px',
            marginBottom: '15px',
            display: isEditing ? 'block' : 'none',
          }}
        >
          <span>
            <FaEdit style={{ marginRight: 5, marginBottom: 2 }} /> 編輯
          </span>
        </button>
        <button
          type="button"
          className={`${styles['keep-buying']} ${
            styles['custom-btn']
          } ${styles['btn-7']} animate__animated ${
            isEditing ? 'animate__flipInX' : 'animate__flipOutX'
          } `}
          onClick={onDelete}
          style={{
            width: '80px',
            marginLeft: 15,
            marginRight: 15,
            display: isEditing ? 'block' : 'none',
          }}
        >
          <span>
            <FaTrash
              style={{
                marginRight: 5,
                marginBottom: 2,
              }}
            />
            刪除
          </span>
        </button>
        {isDefault === '1' ? (
          <button
            type="button"
            className={`${styles['keep-buying']} ${
              styles['custom-btn']
            } ${styles['btn-7']} animate__animated ${
              isEditing ? 'animate__flipInX' : 'animate__flipOutX'
            } `}
            style={{ width: '80px', display: isEditing ? 'block' : 'none' }}
          >
            <span>
              <FaTruck style={{ marginRight: 5, marginBottom: 2 }} /> 配送
            </span>
          </button>
        ) : (
          <button
            type="button"
            className={` ${styles['keep-buying']} ${
              styles['custom-btn']
            } ${styles['btn-7']} animate__animated ${
              isEditing ? 'animate__flipInX' : 'animate__flipOutX'
            } `}
            style={{
              width: '80px',
              fontWeight: 600,
              fontSize: 16,
              display: isEditing ? 'block' : 'none',
            }}
            onClick={onSetDefault}
          >
            <span>預設</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default AddressItem
