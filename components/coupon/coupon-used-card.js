import styles from '@/styles/coupon/coupon-used.module.css'

export default function CouponUsedCard({ name, money, startDate, endDate }) {
  return (
    <>
      <div className={styles['couponCard']}>
        <div className={styles['hangingWire']} />
        <div className={styles['coverLine']} />
        <div className={`${styles['round']} bg-bgColor`} />
        <div className={styles['shadow']}>
          <div className={styles['couponContent']}>
            <div className={styles['textContent']}>
              <p>{name}</p>
              <p style={{ fontSize: 26 }}>NT${money}</p>
              <div>
                <div className={styles['date']}>
                  開始日期 :<p className="ms-1 my-0">{startDate}</p>
                </div>
                <div className={styles['date']}>
                  結束日期 :<p className="ms-1 my-0">{endDate}</p>
                </div>
              </div>
            </div>
            <div className={styles['dottedLine']} />
          </div>
        </div>
      </div>
    </>
  )
}
