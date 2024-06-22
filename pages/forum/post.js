import React from 'react'
import styles from '@/styles/forum/post.module.css'
import Image from 'next/image'
import { Avatar, Button } from 'antd'
import {
  RiUserAddFill,
  RiHeartLine,
  RiChat1Line,
  RiShareLine,
  RiBookmarkLine,
} from 'react-icons/ri'

const PostMain = () => {
  return (
    <>
      <div className={`${styles['container']} container d-flex`}>
        <div className={styles['post']}>
          <div className={` ${styles['post-left']} d-flex flex-column`}>
            <div className={styles['photo-main'] + 'photo-main' + 'd-flex'}>
              <img src="/images/forum/pop_cat.jpg" alt="" />
            </div>
            <div className="photo-slide" />
          </div>
          <div className="post-right d-flex flex-column">
            <div className="page-user-header bg-light my-4 p-4 rounded-4">
              <div className="user-profile d-flex align-middle">
                <div className="user-avatar me-3">
                  <Avatar
                    width={32}
                    height={32}
                    src="/images/forum/pop_cat.jpg"
                    alt=""
                  />
                </div>
                <div className="user-info d-flex flex-column justify-content-center">
                  <div className="user-title d-flex flex-row align-items-center gap-3">
                    <span>
                      <strong>山田</strong>
                    </span>
                    <span>@yamada9487</span>
                    <div className="user-badges">
                      <i className="ri-award-fill" />
                      <i className="ri-award-fill" />
                      <i className="ri-award-fill" />
                    </div>
                    <div className="btn btn-ddsecondary btn-follow">
                      <RiUserAddFill />
                      追隨
                    </div>
                    {/* <Button> */}
                    {/*   追隨 */}
                    {/*   <RiUserAddFill /> */}
                    {/* </Button> */}
                  </div>
                  <div className="user-specs d-flex gap-3">
                    <div className="user-gender border-end border-black pe-3">
                      女
                    </div>
                    <div className="user-height border-end border-black pe-3">
                      155cm
                    </div>
                    <div className="user-age">30歲</div>
                  </div>
                  <div className="user-bio">
                    由於我經常和兩個孩子一起玩，所以我經常穿著方便移動的休閒衣服，而且我經常將舊衣服融入我的造型中！
                    在工作中，我會混合穿著夾克和其他漂亮的單品，我喜歡各種品味的造型！
                  </div>
                </div>
              </div>
            </div>
            <div className="post-content">
              <span className="timestamp text-ddsecondary">2023-3-30</span>
              <div className="text-content">
                今天的天氣真好，適合出門走走。我去了附近的公園散步，看到許多人在放風箏。看著五顏六色的風箏在空中飛舞，心情也跟著飛揚起來。
                回家的路上，我買了一杯奶茶。奶茶的香甜滋味讓我感到非常滿足。
                今天雖然沒有什麼特別的事情，但依然過得很充實。
                <br />
                <br />
                ・30代後半
                <br />
                ・身長151㎝
                <br />
                ・常用尺寸：上衣36/下34或36/鞋子：23或22.5 <br />
                <br />
                [尺寸]
                <br />
                外套：稍微寬鬆。
                <br />
                底部：標準。
                <br />
                鞋子：標準。
                <br />
                <br />
                [穿戴感受]
                <br />
                底部：白色，質感略顯粗糙。
                <br />
                <br />
                [協調點]
                <br />
                成人休閒造型，搭配休閒外套和裙子。
                我將它與芭蕾舞鞋搭配，盡量不讓它看起來太運動。
              </div>
              <ul className="tags-list list-unstyled text-ddprimary">
                <li>#休閒</li>
                <li>#女裝</li>
                <li>#春裝</li>
                <li>#帽子</li>
                <li>#裙子</li>
              </ul>
            </div>
            <div className="action-bar d-flex">
              <div className="action-like me-2">
                {/* <i className="ri-heart-line" />讚 */}
                <RiHeartLine />
                11
              </div>
              <div className="action-comment me-2">
                {/* <i className="ri-chat-1-line" /> */}
                <RiChat1Line />1
              </div>
              <div className="action-share me-2">
                {/* <i className="ri-share-line" /> */}
                <RiShareLine />
              </div>
              <div className="action-bookmark me-2">
                {/* <i className="ri-bookmark-line" /> */}
                <RiBookmarkLine />
              </div>
            </div>
            <div className="comments">
              <div className="comment d-flex">
                <div className="avatar me-2">
                  <Avatar src="/images/forum/pop_cat.jpg" alt="" />
                </div>
                <div className="comment-right d-flex flex-column">
                  <div className="comment-top">
                    <span className="username">山田</span>
                    <span className="comment-time">10秒前</span>
                  </div>
                  <p className="comment-text mb-0">啊是不會趕快跑喔還發文</p>
                  <div className="comment-actions d-flex gap-3">
                    <div className="post-action">
                      <i className="ri-heart-line" />讚
                    </div>
                    <div className="post-action">
                      <i className="ri-chat-1-line" />
                      留言
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="styling d-flex flex-column my-4">
              <div className="h5 styling-title d-flex justify-content-center my-2">
                所使用的商品
              </div>
              <div className="thumb-list d-flex">
                <div className="thumb-product-link me-2">
                  <div className="thumb-link-img">
                    <img
                      className="img-fluid"
                      src="/images/forum/pop_cat.jpg"
                      alt=""
                    />
                  </div>
                  <div className="product-desc">
                    <div className="thumb-product-category">T-shirt</div>
                    <div className="thumb-product-details">黑/S</div>
                    <div className="thumb-product-price">$500</div>
                  </div>
                </div>
                <div className="thumb-product-link me-2">
                  <div className="thumb-link-img">
                    <img
                      className="img-fluid"
                      src="/images/forum/pop_cat.jpg"
                      alt=""
                    />
                  </div>
                  <div className="product-desc">
                    <div className="thumb-product-category">T-shirt</div>
                    <div className="thumb-product-details">黑/S</div>
                    <div className="thumb-product-price">$500</div>
                  </div>
                </div>
                <div className="thumb-product-link me-2">
                  <div className="thumb-link-img">
                    <img
                      className="img-fluid"
                      src="/images/forum/pop_cat.jpg"
                      alt=""
                    />
                  </div>
                  <div className="product-desc">
                    <div className="thumb-product-category">T-shirt</div>
                    <div className="thumb-product-details">黑/S</div>
                    <div className="thumb-product-price">$500</div>
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

export default PostMain
