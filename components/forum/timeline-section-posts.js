import { Avatar, Image } from 'antd'
import { loadPosts } from '@/services/post'

export default function TimelineSectionPosts() {
  return (
    <section id="timeline-posts">
      {/* <div class="timeline-post-item bg-light border border-ddprimary rounded">
        <div class="post-top p-2">
          <span class="avatar">
            <Avatar src="/images/forum/pop_cat.jpg" alt="" />
          </span>
          <span class="username">山田</span>
          <span class="uid">@yamada9487</span>
          <span class="date ml-auto">2024-03-31</span>
        </div>
        <div class="post-img">
          <Image class="img-fluid" src="/images/forum/pop_cat.jpg" alt="" />
        </div>
        <div class="post-text m-2">
          <p>
            儘管如此，我們仍然需要對今天的穿搭保持懷疑的態度。若能夠洞悉今天的穿搭各種層面的含義，勢必能讓思維再提高一個層級。我們都知道，只要有意義，那麼就必須慎重考慮。在人生的歷程中，今天的穿搭的出現是必然的。劉鶚曾說過一句意義深遠的話，同君一席話，勝讀十年書。帶著這句話，我們還要更加慎重的審視這個……
          </p>
        </div>
        <div class="action-bar d-flex gap-3 m-2">
          <div class="action-like">
            <i class="ri-heart-line"></i>讚
          </div>
          <div class="action-comment">
            <i class="ri-chat-1-line"></i>
            留言
          </div>
          <div class="action-share">
            <i class="ri-share-line"></i>
            分享
          </div>
          <div class="action-bookmark">
            <i class="ri-bookmark-line"></i>
            收藏
          </div>
        </div>
        <div class="comments m-2">
          <div class="comment d-flex">
            <div class="avatar me-2">
              <Avatar src="/images/forum/pop_cat.jpg" alt="" />
            </div>
            <div class="comment-right d-flex flex-column">
              <div class="comment-top">
                <span class="username">山田</span>
                <span class="comment-time">10秒前</span>
              </div>
              <p class="comment-text mb-0">啊是不會趕快跑喔還發文</p>
              <div class="comment-actions d-flex gap-3">
                <div class="action-like">
                  <i class="ri-heart-line"></i>讚
                </div>
                <div class="action-comment">
                  <i class="ri-chat-1-line"></i>
                  留言
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  )
}
