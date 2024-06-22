import Link from 'next/link'
import styles from '../layout/menubar.module.scss'
export default function NavlinkTest({ data,href }) {
  return (
    <>
      {data.map((d) => {
        return (
          <li key={d.label}>
            <Link className={`dropdown-item`} style={{ backgroundColor: 'transparent' }}  href={d.href}>
              <div className="px-1" style={{ width: '200px' }}>
                {d.label}
              </div>
            </Link>
          </li>
        )
      })}
      <style jsx>
        {`
          li {
            list-style: none;
            padding: 10px;
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
