import Image from 'next/image'

export default function TimelineSectionTrending() {
  return (
    <section
      id="trending-posts"
      className="d-flex flex-column justify-content-center"
    >
      <h4 className="my-4 mx-auto">熱門文章?</h4>
      <div id="trending-post-list" class="">
        <ul className="list-unstyled d-flex gap-1">
          <li>
            <div className="trending-post-item">
              <Image
                src="/images/forum/pop_cat.jpg"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="post-desc">2024-04-01</div>
          </li>
          <li>
            <div className="trending-post-item">
              <Image
                src="/images/forum/pop_cat.jpg"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="post-desc">2024-03-31</div>
          </li>
          <li>
            <div className="trending-post-item">
              <Image
                src="/images/forum/pop_cat.jpg"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="post-desc">2024-03-31</div>
          </li>
        </ul>
      </div>
    </section>
  )
}
