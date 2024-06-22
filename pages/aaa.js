import React from 'react'
import { Button } from 'antd'
import IndexHot from '@/components/indexComponents/hotCard/indexHot'
import styles from '@/styles/test.module.css'
const Home = () => (
  <div className="App">
    <Button type="primary">Button</Button>
    <div className={`bg-primary ${styles[('my-css', 'my-bg')]} `}></div>
    <IndexHot className={`${styles['my-css']} ${styles['my-bg']}`}></IndexHot>
  </div>
)

export default Home
