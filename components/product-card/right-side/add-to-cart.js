import React from 'react'
import Image from 'next/image'
import styles from '@/styles/product/Product.module.css'
import Link from 'next/link'
import suggestColor from '@/public/product/imgs/suggest-color.svg'
import suggestSize from '@/public/product/imgs/suggest-size.svg'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { PiHeartLight } from 'react-icons/pi'
import { GoUpload } from 'react-icons/go'
// import { LineShareButton } from 'react-share'
export default function AddToCart() {
    // const currentPageUrl = window.location.href;
    return (
        <>
            <div className={` d-flex flex-column `}>
                <div className="d-flex mt-n5 ms-n5">
                    <Image
                        src={suggestColor}
                        alt=""
                        width={'40'}
                        height={'40'}
                        blurDataURL=""
                    />
                </div>

                <div className="d-flex ps-1">
                    <div
                        className={`d-flex postion-relative mb-3 py-0 ${ styles['goods-color-radio-container-div'] } `}
                    >
                        <div
                            className={`d-flex justify-content-center align-items-center ${ styles['goods-color-radio-container'] } `}
                        >
                            <div className={`d-flex  ${ styles['goods-color-radio'] } `}></div>
                        </div>
                    </div>
                    <div
                        className={`d-flex postion-relative mb-3 py-0 ${ styles['goods-color-radio-container-div'] } `}
                    >
                        <div
                            className={`d-flex justify-content-center align-items-center ${ styles['goods-color-radio-container'] } `}
                        >
                            <div
                                className={`d-flex    ${ styles['goods-color-radio'] } `}
                                style={{ backgroundColor: '#726e6c' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={` mt-3 ${ styles['xxs-none'] }  ${ styles['border-weight'] }`}
            ></div>
            {/* <!-- TODO:size-suggest  */}
            <div className="d-flex flex-column  mt-2 mt-sm-0">
                <div className="d-flex">
                    <Image
                        src={suggestSize}
                        alt=""
                        width={'40'}
                        height={'40'}
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSU"
                    />
                </div>
                <div className="d-flex  ps-1 ">
                    <div
                        className={`d-flex postion-relative mb-3 py-0 ${ styles['goods-color-radio-container-div'] }  `}
                    >
                        <div
                            className={` bg-ddprimary-light  d-flex justify-content-center align-items-center  ${ styles['goods-size-radio-container'] }`}
                        >
                            <div
                                className=" d-flex align-items-end justify-content-center  "
                                style={{ fontSize: '12px' }}
                            >
                                S
                            </div>
                        </div>
                    </div>
                    <div
                        className={`d-flex postion-relative mb-3 py-0 ${ styles['goods-color-radio-container-div'] }  `}
                    >
                        <div
                            className={` bg-ddprimary-light  d-flex justify-content-center align-items-center  ${ styles['goods-size-radio-container'] }`}
                        >
                            <div
                                className=" d-flex align-items-end justify-content-center"
                                style={{ fontSize: '12px' }}
                            >
                                M
                            </div>
                        </div>
                    </div>
                    <div
                        className={`d-flex postion-relative mb-3 py-0 ${ styles['goods-color-radio-container-div'] }  `}
                    >
                        <div
                            className={` bg-ddprimary-light  d-flex justify-content-center align-items-center  ${ styles['goods-size-radio-container'] }`}
                        >
                            <div
                                className=" d-flex align-items-end justify-content-center"
                                style={{ fontSize: '12px' }}
                            >
                                L
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={` mt-3  mb-1 ${ styles['xxs-none'] }  ${ styles['border-weight'] }`}
            ></div>

            <div className={`d-flex align-items-center   ${ styles['fixed-cus'] } `}>
                <div className="d-flex align-items-center ms-2">庫存5件</div>
                <div className="d-flex ms-5 me-2 align-items-center">
                    <BiLeftArrow size={10} color="#000000" />
                    &nbsp;&nbsp;
                    <span className={` ${ styles['text-20'] }  `}>2</span>
                    &nbsp;&nbsp;
                    <BiRightArrow size={10} color="#000000" />
                </div>
                <div className="d-flex">
                    <div
                        className={`  rounded-3  d-flex  mx-2 align-items-center justify-content-center ${ styles['add-button'] } `}
                    >
                        <Link className={` ${ styles['a-div'] } `} href="#">
                            ADD
                        </Link>
                    </div>
                    <div className=" d-flex align-items-center ">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        {/* <LineShareButton url={currentPageUrl}>  </LineShareButton> */}
                        <GoUpload size={20} color="#000000" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <PiHeartLight size={20} color="#000000" />
                    </div>
                </div>
            </div>
        </>
    )
}
