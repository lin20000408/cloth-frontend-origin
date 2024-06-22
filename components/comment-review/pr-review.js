import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import React from 'react'
import lottie from 'lottie-web'
import styles from '@/styles/product/Product.module.css'
import { FaStar } from 'react-icons/fa'
import StarRating from '@/components/comment-review/StarRating'

import 'react-medium-image-zoom/dist/styles.css'
import { useRef, useState, useEffect } from 'react'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import Zoom from 'react-medium-image-zoom'
import { Image } from 'antd'

import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti'

import {
  PiHeartLight,
  PiSortAscendingLight,
  PiSortDescendingLight,
} from 'react-icons/pi'
import { SlPicture } from 'react-icons/sl'

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active')
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add('active')
    }
    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }
    slider.on('created', () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on('animationStarted', (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export default function PrReview(props) {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [photos, setPhotos] = useState([])
  const productId = props.id
  const [reviews, setReviews] = useState([])
  const [photoUrls, setPhotoUrls] = useState([])

  const sample = [
    {
      order_id: 1,
      size: 'S',
      name: '111',
      color: '111',
      product_id: 1,
      reviews_id: 1,
      ph_1: '111',
      ph_2: '111',
      ph_3: '111',
      content: '111',
      stars: 0,
      review_time: '2024-02-15',
    },
    {
      order_id: 2,
      size: 'S',
      name: '111',
      color: '111',
      product_id: 1,
      reviews_id: 1,
      ph_1: '111',
      ph_2: '111',
      ph_3: '111',
      content: '111',
      stars: 0,
      review_time: '2024-02-15',
    },
  ]

  const fetchReviews = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/single-pr-reviews/${productId}`
      )
      const resData = await response.json()
      if (resData.status === 'success') {
        // 對resData.data.response進行去重處理
        const uniqueReviews = resData.data.response.filter(
          (review, index, self) =>
            index === self.findIndex((t) => t.reviews_id === review.reviews_id)
        )
        setReviews(uniqueReviews)
      } else {
        setError('沒有得到資料')
      }
    } catch (error) {
      setError('取得資料時發生錯誤')
    }
  }

  useEffect(() => {
    const data = fetchReviews(productId)
    data.then((data) => {
      if (Array.isArray(data)) {
        setReviews(data)
      }
    })
  }, [productId])

  useEffect(() => {
    const fetchPhotos = async () => {
      const urls = await Promise.all(
        reviews.map(async (review) => {
          const photoUrl1 = await fetchAndDisplayPhoto(review.ph_1)
          const photoUrl2 = await fetchAndDisplayPhoto(review.ph_2)
          const photoUrl3 = await fetchAndDisplayPhoto(review.ph_3)
          return { photoUrl1, photoUrl2, photoUrl3 }
        })
      )
      // 對urls進行去重處理
      const uniqueUrls = urls.filter(
        (url, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.photoUrl1 === url.photoUrl1 &&
              t.photoUrl2 === url.photoUrl2 &&
              t.photoUrl3 === url.photoUrl3
          )
      )
      setPhotoUrls(uniqueUrls)
    }
    fetchPhotos()
  }, [reviews])

  const fetchAndDisplayPhoto = async (photoFilename) => {
    if (!photoFilename) return null
    try {
      const response = await fetch(
        `http://localhost:3005/api/single-pr-reviews/photo/${photoFilename}`
      )
      if (!response.ok) {
        throw new Error('無法取得照片')
      }
      const blob = await response.blob()
      return URL.createObjectURL(blob)
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  let total = 0
  for (let i = 0; i < reviews.length; i++) {
    total += reviews[i].stars
  }
  const average = total / reviews.length
  const averageResult = Number(average.toPrecision(4)).toString().slice(0, 4)

  const [ascActive, setAscActive] = useState(false)
  const [descActive, setDescActive] = useState(false)

  const handleAscClick = () => {
    const sortedReviews = [...reviews].sort((a, b) => a.stars - b.stars)
    setReviews(sortedReviews)
    const sortedPhotoUrls = sortedReviews.map((review) => {
      const reviewIndex = reviews.findIndex(
        (r) => r.reviews_id === review.reviews_id
      )
      return photoUrls[reviewIndex]
    })
    setPhotoUrls(sortedPhotoUrls)
    setAscActive(true)
    setDescActive(false)
  }

  const handleDescClick = () => {
    const sortedReviews = [...reviews].sort((a, b) => b.stars - a.stars)
    setReviews(sortedReviews)
    const sortedPhotoUrls = sortedReviews.map((review) => {
      const reviewIndex = reviews.findIndex(
        (r) => r.reviews_id === review.reviews_id
      )
      return photoUrls[reviewIndex]
    })
    setPhotoUrls(sortedPhotoUrls)
    setDescActive(true)
    setAscActive(false)
  }

  const container = useRef(null)
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: 2,
      autoplay: true,
      path: '/girl.json',
    })
  }, [])

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: { perView: 6, spacing: 10 },
    },
    [ThumbnailPlugin(instanceRef)]
  )
  const [thumbCounts, setThumbCounts] = useState(reviews.map((v) => v.thumb))
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    setThumbCounts(reviews.map((v) => v.thumb))
  }, [reviews])

  const handleThumbClick = async (i) => {
    try {
      const newThumbCounts = [...thumbCounts]
      newThumbCounts[i] =
        selectedIndex === i ? thumbCounts[i] - 1 : thumbCounts[i] + 1
      const response = await fetch(
        `http://localhost:3005/api/pr-reviews-edit/thumb/${reviews[i].reviews_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ thumbCount: newThumbCounts[i] }),
        }
      )
      if (response.ok) {
        setThumbCounts(newThumbCounts)
        setSelectedIndex(selectedIndex === i ? null : i)
      } else {
        console.error('Error updating thumb count')
      }
    } catch (error) {
      console.error('Error updating thumb count:', error)
    }
  }
  return (
    <>
      <div className={`mt-3`}>
        <section
          id="1"
          className={`mb-3 rounded-3 px-3 py-2 ${styles['review-title']} ${styles['scroll-right']}`}
          style={{ backgroundColor: '#9ba89a9c' }}
        >
          <div className={` ${styles['text-20']}`}>
            <div className={`fs-5 ${styles['a-div']}`}>[商品評價]</div>
          </div>
          <div className="mt-n1">
            <StarRating rating={averageResult} totalStars={5} />
            <span className={` ${styles['text-20']}`}>
              &nbsp;&nbsp;{isNaN(averageResult) ? 0 : averageResult}/5
            </span>
            &nbsp;&nbsp;
            <span>({reviews.length})</span>
          </div>
        </section>

        <section
          id="2"
          className={` ${styles['xxs-none']} ${styles['scroll-right']}`}
          style={{ marginBottom: '-4%' }}
        >
          <div
            className="d-flex mt-2 justify-content-between"
            style={{ marginRight: '50%', marginBottom: '5%' }}
          >
            <button
              onClick={handleAscClick}
              style={{
                borderColor: 'white',
                borderRadius: '10%',
                backgroundColor: ascActive ? 'lightgray' : 'transparent',
                marginLeft: '5%',
              }}
            >
              <PiSortAscendingLight /> 由低到高
            </button>
            <button
              onClick={handleDescClick}
              style={{
                borderColor: 'white',
                borderRadius: '10%',
                backgroundColor: descActive ? 'lightgray' : 'transparent',
              }}
            >
              <PiSortDescendingLight /> 由高到低
            </button>
          </div>
        </section>

        <div className={`d-flex ${styles['scrolling-box']}`}>
          <div className="d-flex flex-column">
            {reviews.length > 0 ? (
              reviews.map((v, i) => (
                <div key={v.product_id}>
                  <div className="d-flex mt-0 flex-column ms-sm-0">
                    <div className="d-flex">
                      <div
                        className={`me-sm-0 me-5  d-flex flex-column justify-content-evenly ${styles['review-details']} ${styles['review-font-size']}`}
                      >
                        <div className="d-flex">
                          <div className="d-flex">38*89{v.order_id}</div>
                          <div className="d-flex">
                            &nbsp;&nbsp;&nbsp; 尺寸:{v.size}&nbsp; 顏色:
                            {v.color}色
                          </div>
                        </div>
                        <div className="d-flex me-sm-5 pe-5 ">
                          <div className="d-flex">
                            {[...Array(v.stars)].map((_, index) => (
                              <FaStar
                                style={{ fontSize: '12px' }}
                                key={index}
                                color="#9d0e16"
                              />
                            ))}
                          </div>{' '}
                          &nbsp;
                          <div className="d-flex " style={{ fontSize: '12px' }}>
                            {v.review_time}
                          </div>
                          &nbsp;{' '}
                          {selectedIndex === i ? (
                            <FaThumbsUp
                              style={{ fontSize: '12px' }}
                              onClick={() => handleThumbClick(i)}
                              style={{ color: 'red' }}
                            />
                          ) : (
                            <FaRegThumbsUp
                              style={{ fontSize: '12px' }}
                              onClick={() => handleThumbClick(i)}
                            />
                          )}
                          <div style={{ fontSize: '12px' }}>
                            {thumbCounts[i]}
                          </div>
                        </div>
                        <div className="d-flex">
                          <div
                            className={`${styles['review-details']}`}
                            style={{ fontSize: '15px', fontWeight: '500' }}
                          >
                            {v.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`mt-sm-2 mb-2 mt-1 ${styles['border-weight']}`}
                  ></div>
                </div>
              ))
            ) : (
              <>
                <div
                  style={{
                    color: '#35553B',
                    fontSize: '24px',
                    marginLeft: '120px',
                    marginTop: '10%',
                    fontWeight: '500',
                    letterSpacing: '6px',
                  }}
                >
                  尚無評價
                </div>
                <div
                  style={{ width: '400px', height: '370px' }}
                  className="d-flex flex-column justify-content-center"
                >
                  <div
                    className="container"
                    style={{ marginTop: '-10%' }}
                    ref={container}
                  ></div>
                </div>
              </>
            )}
          </div>

          <div className={`d-flex flex-column  ${styles['photoGroupTop']}`}>
            <div className="slider-container">
              {photoUrls.length > 0 ? (
                <Image.PreviewGroup>
                  {photoUrls.map((urls, index) => (
                    <div
                      className={`slider-group ${styles['photogroup']}`}
                      key={index}
                    >
                      <div ref={sliderRef} className="keen-slider">
                        {urls.photoUrl1 && (
                          <div className="keen-slider__slide">
                            <Zoom>
                              <Image
                                width={100}
                                src={urls.photoUrl1}
                                alt={`Photo 1 - ${index}`}
                                preview={{ lazy: true }}
                              />
                            </Zoom>
                          </div>
                        )}
                        {urls.photoUrl2 && (
                          <div className="keen-slider__slide">
                            <Zoom>
                              <Image
                                width={100}
                                src={urls.photoUrl2}
                                alt={`Photo 2 - ${index}`}
                                preview={{ lazy: true }}
                              />
                            </Zoom>
                          </div>
                        )}
                        {urls.photoUrl3 && (
                          <div className="keen-slider__slide">
                            <Zoom>
                              <Image
                                width={100}
                                src={urls.photoUrl3}
                                alt={`Photo 3 - ${index}`}
                                preview={{ lazy: true }}
                              />
                            </Zoom>
                          </div>
                        )}
                      </div>
                      <div ref={thumbnailRef} className="keen-slider thumbnail">
                        {urls.photoUrl1 && (
                          <div className="keen-slider__slide">
                            <img
                              className="w-100"
                              src={urls.photoUrl1}
                              alt={`Thumbnail 1 - ${index}`}
                              loading="lazy"
                            />
                          </div>
                        )}
                        {urls.photoUrl2 && (
                          <div className="keen-slider__slide">
                            <img
                              className="w-100"
                              src={urls.photoUrl2}
                              alt={`Thumbnail 2 - ${index}`}
                              loading="lazy"
                            />
                          </div>
                        )}
                        {urls.photoUrl3 && (
                          <div className="keen-slider__slide">
                            <img
                              className="w-100"
                              src={urls.photoUrl3}
                              alt={`Thumbnail 3 - ${index}`}
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </Image.PreviewGroup>
              ) : (
                <div className="d-flex"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
