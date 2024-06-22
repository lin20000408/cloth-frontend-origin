import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import ReactStarRating from 'react-rating-stars-component'
import Swal from 'sweetalert2'
import styles from '@/styles/product/reviewed.module.css'
import { Tag, Modal, Flex } from 'antd'
import Sidebar from '@/components/comment-review/review-sidebar'
import { FaStar } from 'react-icons/fa';
import { Button } from 'react-bootstrap'
export default function ReviewTable() {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [reviews, setReviews] = useState({
        id: 0,
        name: '',
        size: '',
        color: '',
        ph1: '',
        product_id: 0,
        reviews_id: 0,
        ph_1: '',
        ph_2: '',
        ph_3: '',
        content: '',
        stars: 0,
    })

    //--get

    const sample = [
        {
            id: 1,
            name: '風琴褶V領短袖上衣',
            size: 'S',
            color: '白',
            ph1: '/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風2.webp',
            product_id: 11091,
            reviews_id: 1,
            ph_1: '/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風2.webp',
            ph_2: '/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風2.webp',
            ph_3: '/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風2.webp',
            content: 'YES',
            stars: 2,
        },
        {
            id: 2,
            name: '風琴褶V領短袖上衣',
            size: 'S',
            color: '白',
            ph1: '/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風2.webp',
            product_id: 11091,
            reviews_id: 1,
            ph_1: '/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風2.webp',
            ph_2: '/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風2.webp',
            ph_3: '/main-card/女-Meier.Q-風琴褶V領短袖上衣-白色-日系風2.webp',
            content: 'YES',
            stars: 3,
        },
    ]

    const baseUrl = 'http://localhost:3005/api'

    const fetchReviews = async (orderDetailsId = '') => {
        try {
            if (!orderDetailsId) throw new Error('orderDetailsId是必要參數')
            const response = await fetch(
                `${ baseUrl }/pr-reviews-edit/${ orderDetailsId }`
            )
            const resData = await response.json()

            if (resData.status === 'success') {
                setReviews(resData.data.response)
            } else {
                setError('沒有得到資料')
                Swal.fire({
                    icon: 'error',
                    title: '錯誤',
                    text: resData.message || '獲取評論失敗',
                })
            }
        } catch (error) {
            setError('取得資料時發生錯誤')
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: error.message,
            })
        }
    }

    useEffect(() => {
        if (router.isReady) {
            const { orderDetailsId } = router.query
            fetchReviews(orderDetailsId)
        }
    }, [router.isReady, router.query])

    const handleSubmit = async (reviewId) => {
        // const reviewId = reviews.reviews_id
        try {
            Swal.fire({
                title: '確認刪除評論?',
                text: '送出後將刪除評論',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#b0b2c5',
                cancelButtonColor: '#cebbbb',
                confirmButtonText: '確認',
                cancelButtonText: '取消',
                iconColor:'#dbcab5',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await fetch(
                        `${ baseUrl }/pr-reviews-delete/${ reviews.reviews_id }`,
                        {
                            method: 'DELETE',
                        }
                    )

                    if (response.ok) {
                        setReviews((prevReviews) => {
                            const updatedReviews = { ...prevReviews }
                            delete updatedReviews[reviewId]
                            return updatedReviews
                        })
                        Swal.fire({
                            title: '評論已刪除!',
                            text: '感謝您的反饋',
                            icon: 'success',
                            confirmButtonText: '回到訂單頁',
                            confirmButtonColor: '#b0b2c5',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // 確定按鈕被點擊,跳轉到評論頁面
                              window.location.href = 'http://localhost:3000/order/order-details';
                            }
                          });
                    } else {
                        throw new Error('刪除評論失敗')
                    }
                }
            })
            //   setReviews(reviews.filter((reviews) => reviews.id !== reviewId))
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: error.message,
            })
        }
    }
    return (
        <>
            <div className={` container bg-secondary-deep mt-5 pt-sm-0 `}>
                <div className="d-flex flex-row mb-5 ">
                    <div
                        className={`  mt-0 pt-0 ${ styles['xxs-none'] }  `}
                        style={{ width: '35vw' }}
                    >
                        <Sidebar />
                    </div>
                    <div
                        style={{ height: '380px' }}
                        className={`w-sm-50 mt-sm-5  mt-5 pt-0  border-ddprimary border ${ styles['direction'] } justify-content-center`}
                    >
                        <div
                            className="d-flex justify-content-center align-items-center bg-ddprimary"
                            style={{ height: '30px', color: 'white' }}
                        >
                            確定刪除此項評論?
                        </div>
                        <div className="px-3">
                            <div
                                className={`d-flex  flex-column mt-sm-1 pt-sm-1 mt-0 pt-0   } `}
                            >
                                {/* <!-- -此商品概要 --> */}
                                <div className="d-flex">
                                    <div style={{ width: '70px' }}>
                                        <img src={`${ reviews.ph1 }`}
                                            className={`w-100 d-flex  flex-sm-row flex-column ${ styles['cell-pr'] } `} />
                                    </div>
                                    <div className="d-flex flex-column ms-2">
                                        <div
                                            className={`d-flex  flex-sm-row flex-column ${ styles['cell-pr'] } `}
                                        >
                                            {reviews.name}
                                        </div>
                                        <div className='d-flex'>
                                            <div
                                                className={`d-flex  me-3 flex-sm-row flex-column ${ styles['cell-pr'] } `}
                                            >
                                                尺寸: {reviews.size}
                                            </div>
                                            <div
                                                className={`d-flex  flex-sm-row flex-column ${ styles['cell-pr'] } `}
                                            >
                                                顏色:{reviews.color}色
                                            </div></div></div>
                                </div>
                                {/* //--reviews */}
                                <div style={{justifyContent:'start'}}> <div  
                                    className={`d-flex  flex-sm-row flex-column  `}
                                >
                                    <div className="d-flex mt-2  mb-sm-2 mb-2 ">
                                        {[...Array(reviews.stars)].map((_, index) => (
                                            <FaStar key={index} color="#9d0e16" />
                                        ))}
                                    </div>

                                </div>
                                <h6  >評論內容</h6></div>
                               
                                <div
                                    className={`d-flex mb-sm-2 mb-0 flex-sm-row flex-column ${ styles['cell-pr'] } `}
                                >
                                    {reviews.content}
                                </div>

                                {/* //-缺少照片 */}
                                <Button
                                    type="button"
                                    className="btn  btn-outline-light btn-secondary"
                                    onClick={handleSubmit}
                                >
                                    刪除
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* explain  Modal */}
                    <div
                        className="modal fade "
                        id="explain"
                        tabindex="-1"
                        aria-labelledby="explainLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="explainLabel">
                                        回到上一頁
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {' '}
                                    店鋪評分是匿名的。
                                    請您根據本次交易，給予真實、客觀、仔細地評估。
                                    您的評價將是其他會員的參考，也是我們前進的動力。
                                    可於完成訂單後30天內評價，
                                    評價如超過30字並含有照片即可或的優惠卷一張!
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn  btn-outline-success">
                                        關閉
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
