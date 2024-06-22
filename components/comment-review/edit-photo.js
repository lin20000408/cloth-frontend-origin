import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const EditPhoto = ({ orderDetailsId, onPhotoUpload }) => {
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
    imageData1: null,
    imageData2: null,
    imageData3: null,
  })
  const orderDetailsID = orderDetailsId

  console.log(orderDetailsID)
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { orderDetailsId } = router.query
      getReviews(orderDetailsId)
    }
  }, [router.isReady])

  // 獲取評論數據
  const getReviews = async (orderDetailsID) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/pr-reviews-edit/${orderDetailsID}`
      )
      const resData = await response.json()
      if (resData.status === 'success') {
        localStorage.setItem(
          `reviews_${orderDetailsID}`,
          JSON.stringify(resData.data.response)
        )
        setReviews(resData.data.response)
        // 獲取圖片數據
        getImageData1(resData.data.response.ph_1)
        getImageData2(resData.data.response.ph_2)
        getImageData3(resData.data.response.ph_3)
      } else {
        setError('沒有得到資料')
      }
    } catch (error) {
      setError('取得資料時發生錯誤')
    }
  }

  // 獲取圖片數據
  const getImageData1 = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/pr-reviews-edit/photo/${fileName}`
      )
      const imageData1 = await response.blob()
      setReviews((prevReviews) => ({
        ...prevReviews,
        imageData1: URL.createObjectURL(imageData1),
      }))
    } catch (error) {
      setError('獲取圖片數據時發生錯誤')
    }
  }

  // 上傳新照片
  const uploadPhoto = async (file, photoIndex) => {
    try {
      const formData = new FormData()
      formData.append('photo', file)
      const response = await fetch(
        'http://localhost:3005/api/pr-reviews-edit',
        {
          method: 'POST',
          body: formData,
        }
      )
      const resData = await response.json()
      if (resData.status === 'success') {
        // 獲取新上傳的圖片數據
        if (photoIndex === 1) {
          getImageData1(resData.fileName)
          onPhotoUpload(resData.fileName, 'ph_1')
        } else if (photoIndex === 2) {
          getImageData2(resData.fileName)
          onPhotoUpload(resData.fileName, 'ph_2')
        } else if (photoIndex === 3) {
          getImageData3(resData.fileName)
          onPhotoUpload(resData.fileName, 'ph_3')
        }
      } else {
        setError('上傳照片時發生錯誤')
      }
    } catch (error) {
      setError('上傳照片時發生錯誤')
    }
  }

  // 顯示上傳照片對話框
  const showUploadPhotoModal = (photoIndex) => {
    Swal.fire({
      title: '上傳新照片',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': '上傳新照片',
      },
      showCancelButton: true,
      confirmButtonText: '上傳',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#9eafa2',
      preConfirm: (file) => {
        if (!file) {
          Swal.showValidationMessage('請選擇一個文件')
        } else {
          uploadPhoto(file, photoIndex)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  const getImageData2 = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/pr-reviews-edit/photo/${fileName}`
      )
      const imageData2 = await response.blob()
      setReviews((prevReviews) => ({
        ...prevReviews,
        imageData2: URL.createObjectURL(imageData2),
      }))
    } catch (error) {
      setError('獲取圖片數據時發生錯誤')
    }
  }

  const getImageData3 = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/pr-reviews-edit/photo/${fileName}`
      )
      const imageData3 = await response.blob()
      setReviews((prevReviews) => ({
        ...prevReviews,
        imageData3: URL.createObjectURL(imageData3),
      }))
    } catch (error) {
      setError('獲取圖片數據時發生錯誤')
    }
  }

  return (
    <div>
      <div style={{ width: '150px' }}>
        {reviews.imageData1 && (
          <img
            className="w-100 mb-2"
            src={reviews.imageData1}
            alt={reviews.ph_1}
            onClick={() => showUploadPhotoModal(1)}
          />
        )}
      </div>
      <div style={{ width: '150px' }}>
        {reviews.imageData2 && (
          <img
            className="w-100  mb-2"
            src={reviews.imageData2}
            alt={reviews.ph_2}
            onClick={() => showUploadPhotoModal(2)}
          />
        )}
      </div>
      <div style={{ width: '150px' }}>
        {reviews.imageData3 && (
          <img
            className="w-100  mb-2"
            src={reviews.imageData3}
            alt={reviews.ph_3}
            onClick={() => showUploadPhotoModal(3)}
          />
        )}
      </div>
    </div>
  )
}

export default EditPhoto
