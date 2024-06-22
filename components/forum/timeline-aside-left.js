import SectionUserProfile from './timeline-section-user-profile'
import { ConfigProvider } from 'antd'

export default function AsideLeft() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--bs-font-sans-serif)',
        },
      }}
    >
      <aside className="left">
        <SectionUserProfile />
        <SectionSideNav />
      </aside>
    </ConfigProvider>
  )
}

const SectionSideNav = () => {
  return (
    <section id="side-nav">
      <h5>分類</h5>
      <ul className="list-unstyled">
        <li>男裝</li>
        <li>女裝</li>
        <li>上衣</li>
        <li>褲子</li>
        <li>裙子</li>
      </ul>
      <h5>買家秀</h5>
    </section>
  )
}
