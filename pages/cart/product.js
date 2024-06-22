import ProductList from '@/components/checkout/product-list'
import styles from '@/components/checkout/cart.module.css'
import Link from 'next/link'

export default function Product() {
  return (
    <>
      <div className={styles['container']}>
        <h3>商品列表</h3>
        <hr />
        <Link href="/cart/cart">連至 購物車</Link>
        <div className={styles['product']}>
          <ProductList />
        </div>
      </div>
    </>
  )
}
