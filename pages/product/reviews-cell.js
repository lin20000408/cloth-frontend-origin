import React from 'react'

import Link from 'next/link'
import styles from '@/styles/product/Product.module.css'
import FiveStars from '@/components/product-card/review/five-stars'
import Image from 'next/image'

import { GoMegaphone, GoUpload, GoThumbsup } from 'react-icons/go'
import switchPage from './/../../public/product/imgs/pageSwitch.svg'

export default function ReviewsCell() {
  return (
    <div class="container mt-5 pt-5">
      <div className="d-flex mt-1  flex-column ms-sm-0">
        {/* <!--TODO: ?上邊 --> */}
        <div className="d-flex ">
          {/* <!-- TODO:?details --> */}
          <div
            className={` me-sm-0 me-5 d-flex flex-column justify-content-evenly ${styles['review-details']} ${styles['review-font-size']} `}
          >
            <div className="d-flex">
              <div className="d-flex">
                a**123&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div className="d-flex">尺寸:S&nbsp;顏色:黑色</div>
            </div>
            <div className="d-flex me-5 pe-5 justify-content-between">
              <div className="d-flex">
                <FiveStars />
              </div>
              <div className="d-flex">2024/04/01</div>
            </div>
            <div className="d-flex ">
              <div
                className={` ${styles['xxs-none']}   ${styles['review-details']}`}
              >
                <GoThumbsup size={20} color="#000000" />{' '}
                探討包包評價時，如果發現非常複雜，
                那麼想必不簡單。回過神才發現， 思考包包評價的存在意義，
                已讓如果你憎恨性，你就是憎恨美。
              </div>
              <div className=" d-sm-none text-truncate">
                <GoThumbsup size={20} color="#000000" />{' '}
                探討包包評價時，如果發現非常複雜，
                那麼想必不簡單。回過神才發現， 思考包包評價的存在意義，
                已讓如果你憎恨性，你就是憎恨美。
              </div>
            </div>
          </div>
          {/* <!-- TODO:?照片欄 --> */}
          <div className="d-flex flex-column justify-content-evenly">
            <div
              className={` ps-2 d-flex align-items-center ${styles['review-photo']} `}
            >
              <Image
                src="https://ajuga.itembox.design/product/003/000000000310/000000000310-27.jpg?t=20240124033852"
                alt=""
                width={'44'}
                height={'44'}
              />
            </div>
            <div className="d-flex flex-column ">
              <div className="d-flex justify-content-between  mt-sm-0 mt-2">
                <div className={` me-2 d-flex ${styles['review-photo-sm']} `}>
                  <Image
                    src="https://ajuga.itembox.design/product/003/000000000310/000000000310-27.jpg?t=20240124033852"
                    alt=""
                    width={'25'}
                    height={'25'}
                  />
                </div>
                <div className={` d-flex ${styles['review-photo-sm']} `}>
                  <Image
                    src="https://ajuga.itembox.design/product/003/000000000310/000000000310-27.jpg?t=20240124033852"
                    alt=""
                    width={'25'}
                    height={'25'}
                  />
                </div>
              </div>
              <div className={`d-flex ${styles['review-scroll']} `}></div>
            </div>
          </div>
        </div>
        {/* TODO:<!-- ?下邊 --> */}

        <div className={` mt-sm-3 mt-1 ${styles['border-weight']} `}></div>
      </div>
      <div className="d-flex mt-0 flex-column"></div>
      <div className="d-flex mt-1  flex-column ms-sm-0">
        {/* <!--TODO: ?上邊 --> */}
        <div className="d-flex ">
          {/* <!-- TODO:?details --> */}
          <div
            className={` me-sm-0 me-5 d-flex flex-column justify-content-evenly ${styles['review-details']} ${styles['review-font-size']} `}
          >
            <div className="d-flex">
              <div className="d-flex">
                a**123&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div className="d-flex">尺寸:S&nbsp;顏色:黑色</div>
            </div>
            <div className="d-flex me-5 pe-5 justify-content-between">
              <div className="d-flex">
                <FiveStars />
              </div>
              <div className="d-flex">2024/04/01</div>
            </div>
            <div className="d-flex ">
              <div
                className={` ${styles['xxs-none']}   ${styles['review-details']}`}
              >
                <GoThumbsup size={20} color="#000000" />{' '}
                探討包包評價時，如果發現非常複雜，
                那麼想必不簡單。回過神才發現， 思考包包評價的存在意義，
                已讓如果你憎恨性，你就是憎恨美。
              </div>
              <div className=" d-sm-none text-truncate">
                <GoThumbsup size={20} color="#000000" />{' '}
                探討包包評價時，如果發現非常複雜，
                那麼想必不簡單。回過神才發現， 思考包包評價的存在意義，
                已讓如果你憎恨性，你就是憎恨美。
              </div>
            </div>
          </div>
          {/* <!-- TODO:?照片欄 --> */}
          <div className="d-flex flex-column justify-content-evenly">
            <div
              className={` ps-2 d-flex align-items-center ${styles['review-photo']} `}
            >
              <Image
                src="https://ajuga.itembox.design/product/003/000000000310/000000000310-27.jpg?t=20240124033852"
                alt=""
                width={'44'}
                height={'44'}
              />
            </div>
            <div className="d-flex flex-column ">
              <div className="d-flex justify-content-between  mt-sm-0 mt-2">
                <div className={` me-2 d-flex ${styles['review-photo-sm']} `}>
                  <Image
                    src="https://ajuga.itembox.design/product/003/000000000310/000000000310-27.jpg?t=20240124033852"
                    alt=""
                    width={'25'}
                    height={'25'}
                  />
                </div>
                <div className={` d-flex ${styles['review-photo-sm']} `}>
                  <Image
                    src="https://ajuga.itembox.design/product/003/000000000310/000000000310-27.jpg?t=20240124033852"
                    alt=""
                    width={'25'}
                    height={'25'}
                  />
                </div>
              </div>
              <div className={`d-flex ${styles['review-scroll']} `}></div>
            </div>
          </div>
        </div>
        {/* TODO:<!-- ?下邊 --> */}

        <div className={` mt-sm-3 mt-1 ${styles['border-weight']} `}></div>
      </div>
      <div className="d-flex mt-0 flex-column"></div>
      {/* TODO:<!-- ?暫定page switch --> */}
      {/* TODO:<!-- ?暫定page switch --> */}
      <div className={`${styles['xxs-none']} `}>
        <Image
          className={`${styles['pageSwitch']} `}
          src={switchPage}
          alt=""
          width={'100'}
          height={'40'}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSU"
        />
      </div>
      <div className="d-flex  justify-content-center d-sm-none">
        <div className="d-flex align-items-end ">
          <Link
            href="pr-specific-review.html"
            className={`fw-bold ${styles['a-div']} `}
            style={{ textDecoration: 'underline' }}
          >
            MORE
          </Link>
        </div>
      </div>
    </div>
  )
}
