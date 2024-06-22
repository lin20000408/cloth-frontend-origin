import React, { useEffect, useState } from 'react'
import styles from '@/styles/order/order.module.css'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlinePinDrop, MdOutlineLocalPhone } from 'react-icons/md'

export default function Receiver() {
  return (
    <>
      <div className={`border-ddsecondary ${styles['receiver']}`}>
        <p className={`border-ddsecondary ${styles['receiver-title']}`}>
          收件者
        </p>
        <ul className={styles['receiver_info']}>
          <li>
            <FaRegUser />
            宋雨琪
          </li>
          <li>
            <FaRegUser />
            送貨上門
          </li>
          <li>
            <MdOutlinePinDrop />
            71005台南市永康區南台街1號
          </li>
          <li>
            <MdOutlineLocalPhone />
            091-123-9218
          </li>
        </ul>

        <div className={`border-ddsecondary ${styles['changeBtn']}`}>
          {/* Button trigger modal */}
          <button
            type="button"
            className={`btn btn-outline-dark ${styles['keep-buying']}`}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop2"
          >
            修改
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="staticBackdrop2"
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
                    客戶資訊
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body px-5">
                  <div
                    className="border-ddsecondary p-3"
                    style={{ paddingBottom: 0 }}
                  >
                    <div className="text-start bg-ddprimary ps-2">
                      <input
                        type="radio"
                        name="selectAddress"
                        id="selectAddress2"
                      />
                      <span className="text-white">使用預設送貨地址</span>
                    </div>
                    <div
                      className="border-ddsecondary p-2"
                      style={{ border: '1px solid' }}
                    >
                      <ul className={`text-start ${styles['user_info']}`}>
                        <li>
                          <FaRegUser />
                          宋雨琪
                        </li>
                        <li>
                          <MdOutlinePinDrop />
                          71005台南市永康區南台街1號
                        </li>
                        <li>
                          <MdOutlineLocalPhone />
                          091-123-9218
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className="border-ddsecondary"
                    style={{ padding: '0 16px 0 16px' }}
                  >
                    <div className="text-start bg-ddprimary ps-2">
                      <input
                        type="radio"
                        name="selectAddress"
                        id="selectAddress2"
                      />
                      <span className="text-white">使用以下送貨地址</span>
                    </div>
                    <div
                      className="border-ddsecondary"
                      style={{
                        border: '1px solid',
                        padding: '16px 16px 25px 16px',
                      }}
                    >
                      <h6 className="text-start">姓名 *</h6>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          aria-label="First name"
                          className="form-control"
                        />
                        <input
                          type="text"
                          aria-label="Last name"
                          className="form-control ms-2"
                        />
                      </div>
                      <h6 className="text-start">電子郵件地址 *</h6>
                      <input
                        type="text"
                        aria-label="email"
                        className="form-control mb-3"
                      />
                      <h6 className="text-start">所在縣市 *</h6>
                      <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupSelect01">
                          <option selected="">請選擇居住縣市</option>
                          <option value={1}>One</option>
                          <option value={2}>Two</option>
                          <option value={3}>Three</option>
                        </select>
                        <select
                          className="form-select ms-2"
                          id="inputGroupSelect01"
                        >
                          <option selected="">請選擇鄉鎮區</option>
                          <option value={1}>One</option>
                          <option value={2}>Two</option>
                          <option value={3}>Three</option>
                        </select>
                      </div>
                      <h6 className="text-start">詳細地址 *</h6>
                      <input
                        type="text"
                        aria-label="address"
                        className="form-control mb-3"
                      />
                      <h6 className="text-start">您的電話號碼 *</h6>
                      <input
                        type="text"
                        aria-label="phone"
                        className="form-control"
                      />
                    </div>
                    <div className="modal-footer d-flex gap-2 justify-content-center">
                      <button
                        type="button"
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        className="btn btn-ddprimary text-white"
                      >
                        確認修改
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
