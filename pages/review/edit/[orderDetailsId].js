import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import EditPhoto from '@/components/comment-review/edit-photo'
import Swal from 'sweetalert2'
import styles from '@/styles/product/reviewed.module.css'
import { Tag, Modal, Flex } from 'antd'
import Sidebar from '@/components/comment-review/review-sidebar'
import Star from '@/components/comment-review/stars'
import { Button } from 'react-bootstrap'
export default function ReviewTable() {
    const router = useRouter()
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

    const [error, setError] = useState(null)
    const [tagOptions, setTagOptions] = useState([])
    const [contList, setContList] = useState([
        { key: 'txt', label: '', content: reviews.content },
    ])

    const [rating, setRating] = useState(() => reviews.stars)
    //在程式碼中，被賦予的值，該值最初為0，因為使用預設值初始化，包括。這表示元件掛載時，為0，也初始化為
    //這裡的問題是變更時不更新。這是因為僅在組件安裝時分配一次該值。之後，即使發生變化，也保持不變。該函數僅在元件掛載時調用，它允許您使用其他狀態 useState 的最新值
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [previewURLs, setPreviewURLs] = useState([])
    const [describeNum, setDescribeNum] = useState(0)
    useEffect(() => {
        if (router.isReady) {
            console.log(router.query)
            const { orderDetailsId } = router.query
            getReviews(orderDetailsId)
        }
    }, [router.isReady])
    //--star
    useEffect(() => {
        setRating(reviews.stars)
    }, [reviews.stars])
    //--get
    const baseUrl = 'http://localhost:3005/api/pr-reviews-edit'

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
            stars: reviews.stars,
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
            stars: reviews.stars,
        },
    ]
    const reviewsId = reviews.reviews_id
    const fetchReviews = async (orderDetailsId = '') => {
        try {
            if (!orderDetailsId) throw new Error('pid是必要參數')
            const response = await fetch(`${ baseUrl }/${ orderDetailsId }`)
            const resData = await response.json()
            if (resData.status === 'success') {
                setReviews(resData.data.response)
            } else {
                setError('沒有得到資料')
                setReviews(sample)
            }
        } catch (error) {
            setError('取得資料時發生錯誤')
            setReviews(sample)
        }
    }

    const getReviews = async (orderDetailsId) => {
        const data = await fetchReviews(orderDetailsId)
        console.log(data)
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            setReviews(data)
        }
    }

    const productId = reviews.product_id
    const orderDetailsId = reviews.id
    console.log(productId)

    //--photo
    const [photo1, setPhoto1] = useState('')
    const [photo2, setPhoto2] = useState('')
    const [photo3, setPhoto3] = useState('')

    const handlePhotoUpload = (fileName, photoKey) => {
        const updatedReviews = {
            ...reviews,
            [photoKey]: fileName,
        }
        setReviews(updatedReviews)

        switch (photoKey) {
            case 'ph_1':
                setPhoto1(fileName)
                break
            case 'ph_2':
                setPhoto2(fileName)
                break
            case 'ph_3':
                setPhoto3(fileName)
                break
            default:
                break
        }
    }

    //--comment
    //我們使用了陣列的展開運算子 ...prevContList 來保留原有的 contList 中的元素，並在後面加入新的元素。
    useEffect(() => {
        if (reviews.content) {
            setContList((prevContList) => [
                ...prevContList,
                { key: 'txt', label: '', content: reviews.content },
            ])
        }
    }, [reviews.content])

    const tags = [
        { code: '1', label: '材質' },
        { code: '2', label: '外型' },
        { code: '3', label: '尺寸' },
    ]
    useEffect(() => {
        reloadTagOptions()
    }, [])
    //   当组件加载时，或者 tags 属性发生变化时
    const reloadTagOptions = () => {
        const updatedTagOptions = tags.map((tag) => ({ ...tag, selected: false }))
        setTagOptions(updatedTagOptions)
    }
    //当用户点击标签时，会根据标签的选中状态执行相应的操作，比如添加评论内容或者删除评论内容。
    const onClickTag = (item) => {
        const selected = !item.selected
        if (selected) {
            const newItem = { key: item.code, label: item.label, content: '' }
            const txtItem = contList.find((e) => e.key === 'txt')

            if (txtItem.content === '') {
                const list = contList.filter((e) => e.key !== 'txt')
                setContList([...list, newItem, txtItem])
            } else {
                setContList([...contList, newItem])
            }
            item.selected = selected
            let num = 0
            contList.forEach((v) => {
                num += v.label.length + v.content.length
            })
            setDescribeNum(num)
        } else {
            const contItemIndex = contList.findIndex((e) => e.key === item.code)
            if (contList[contItemIndex].content) {
                Swal.fire({
                    title: '確認刪除標籤?',
                    text: '已填寫的描述將會被刪除',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#b0b2c5',
                    cancelButtonColor: '#cebbbb',
                    confirmButtonText: '確認',
                    cancelButtonText: '取消',
                    color: '#040a06',
                    iconColor: '#dbcab5',
                }).then((result) => {
                    if (result.isConfirmed) {
                        const updatedContList = [...contList]
                        updatedContList.splice(contItemIndex, 1)
                        setContList(updatedContList)
                        item.selected = selected
                        let num = 0
                        updatedContList.forEach((v) => {
                            num += v.label.length + v.content.length
                        })
                        setDescribeNum(num)
                        Swal.fire('已刪除!', '標籤已被刪除.', 'success')
                    }
                })
            } else {
                const updatedContList = [...contList]
                updatedContList.splice(contItemIndex, 1)
                setContList(updatedContList)
                item.selected = selected
            }
        }
    }

    //并计算评论总字数。
    const onChange = (e, item) => {
        item.content = e.target.innerText
        let num = 0
        contList.forEach((v) => {
            num += v.label.length + v.content.length
        })
        setDescribeNum(num)
    }
    const getLabelsAndContents = () => {
        const labelsAndContents = []
        for (const item of contList) {
            const { key, label, content } = item
            labelsAndContents.push({ [label]: content })
        }
        return labelsAndContents
    }

    const labelsAndContents = getLabelsAndContents()
    const contents = labelsAndContents
        .map((obj, index) => {
            const value = Object.values(obj)[0]
            const key = Object.keys(obj)[0]
            return `${ key ? key : '' } ${ value }`
        })
        .join('且')
    //fetch
    const handleSubmit = async () => {
        setUploading(true)
        if (selectedFiles.length > 3) {
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '最多只能上傳 3 張照片',
                confirmButtonText: '去更改',
                color: '#040a06',
                confirmButtonColor: '#9eafa2',
            })
            return
        }
        if (describeNum > 92) {
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: '評價內容請小於100',
                confirmButtonText: '去更改',
                color: '#040a06',
                confirmButtonColor: '#9eafa2',
            })
            return
        }
        const baseUrl2 = 'http://localhost:3005/api/pr-reviews-edit/update'

        try {
            const response = await fetch(`${ baseUrl2 }/${ reviews.reviews_id }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, contents, photo1, photo2, photo3 }),
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                // router.push('/pr-reviews-edit')
                Swal.fire({
                    title: '評論已更改!',
                    text: '感謝您的反饋',
                    icon: 'success',
                    confirmButtonText: '查看評論',
                    confirmButtonColor: '#b0b2c5',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 確定按鈕被點擊,跳轉到評論頁面
                        window.location.href = 'http://localhost:3000/order/order-details'
                    }
                })
            } else {
                throw new Error('更改評論失败')
            }
        } catch (error) {
            setUploading(false)
            console.error(error)
            Swal.fire({
                icon: 'error',
                title: '錯誤',
                text: error.message,
            })
        }
    }
    const showExplainModal = () => {
        Swal.fire({
            title: '評論說明',
            html: `
        店鋪評分是匿名的。 請您根據本次交易，給予真實、客觀、仔細地評估。
        您的評價將是其他會員的參考，也是我們前進的動力。
        可於完成訂單後30天內評價，
        評價如超過30字並含有照片即可或的優惠卷一張!
      `,
            showCloseButton: true,

            confirmButtonText: '關閉',

            confirmButtonColor: '#b0b2c5',
        })
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
                        className={`w-sm-50 mt-sm-5  mt-0 pt-0  border-ddprimary border ${ styles['direction'] } `}
                    >
                        <div
                            className="d-flex justify-content-center align-items-center bg-ddprimary"
                            style={{ height: '30px', color: 'white' }}
                        >
                            評價此商品
                        </div>
                        <div className="px-3">
                            <div
                                className={`d-flex  flex-column mt-sm-1 pt-sm-1 mt-0 pt-0  ${ styles['cell-pr'] } `}
                            >
                                {/* <!-- -此商品概要 --> */}
                                <div
                                    className={`d-flex  flex-sm-row flex-column ${ styles['cell-pr'] } `}
                                >
                                    <div className={`d-flex ${ styles['pr-comment-photo'] } `}>
                                        <img className="w-100" src={`${ reviews.ph1 }`} alt="" />
                                    </div>
                                    <div className="d-flex flex-column ms-3">
                                        <div className="d-flex fs-4">{reviews.name}</div>
                                        <div className="d-flex">
                                            尺寸: {reviews.size} &nbsp;&nbsp;&nbsp; 顏色:{' '}
                                            {reviews.color}色
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex ">
                                    <div className="d-flex ">
                                        <span
                                            className={`d-flex ${ styles['text-21'] } ${ styles['comment-title'] }`}
                                        >
                                            總體星數
                                        </span>
                                    </div>
                                    <div className="d-flex ps-2">
                                        <Star rating={rating} setRating={setRating} />
                                    </div>
                                </div>

                                <div className="d-flex flex-column">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={showExplainModal}
                                        style={{ width: '100px' }}
                                    >
                                        評論說明
                                    </button>
                                    {/* content */}
                                    <div className={` mt-3 mb-3 ${ styles['comp-box'] } `}>
                                        <div className={` ${ styles['tag-box'] } `}>
                                            {tagOptions.map((item) => (
                                                <Tag
                                                    key={`menu-tag-${ item.code }`}
                                                    color={item.selected ? undefined : 'gray'}
                                                    onClick={() => onClickTag(item)}
                                                    className="tag"
                                                >
                                                    {item.label}
                                                </Tag>
                                            ))}
                                        </div>
                                        <div className={` ${ styles['content'] } `}>
                                            {contList.map((item) => (
                                                <div
                                                    key={`cont-item-${ item.key }`}
                                                    className={`${ styles['tag-item-content'] } `}
                                                >
                                                    {item.key !== 'txt' && (
                                                        <div className="label">{item.label}:</div>
                                                    )}
                                                    <div
                                                        contentEditable
                                                        className={
                                                            item.key !== 'txt'
                                                                ? 'cont tag-input-area'
                                                                : 'cont'
                                                        }
                                                        style={{
                                                            textIndent:
                                                                item.label.length === 0
                                                                    ? 0
                                                                    : item.label.length + 1 + 'em',
                                                        }}
                                                        onInput={(e) => onChange(e, item)}
                                                    >
                                                        {' '}
                                                        {item.content}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={`${ styles['tag-item-content-label'] } `}>
                                            {describeNum}/100
                                        </div>
                                    </div>
                                </div>
                                {/* content */}
                          <div>
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            點擊照片更換
                                            <span
                                                className={`align-items-end d-flex ${ styles['text-10'] } `}
                                            >
                                                (限3張)
                                            </span>
                                        </div>
                                        <hr />
                                        </div>
                                        <div  className='d-flex  flex-column align-items-center'   >
                                        <EditPhoto
                                            orderDetailsId={reviews.id}
                                            onPhotoUpload={handlePhotoUpload}
                                        />
                                 
                                    <div className="d-flex  justify-content-center">
                                        <Button
                                            type="button"
                                            className="btn  btn-outline-light btn-secondary"
                                            onClick={handleSubmit}
                                        >
                                            送出
                                        </Button>
                                    </div></div></div>
                            </div>
                        </div>
                        {/* onClick={handleSubmit} */}
                    </div>
                </div>
            </div>
        </>
    )
}
