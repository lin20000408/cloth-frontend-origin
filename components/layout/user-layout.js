import Navbar from './navbar/navbar'
import MyFooter from './footer'
import Sidebar from './sidebar'

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-wrap min-vh-100">
        <Sidebar />
        {children}
      </div>
      <MyFooter />
    </>
  )
}
