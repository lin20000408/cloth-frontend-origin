// components/LottieAnimation.js

import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

function LottieAnimation({ animationData }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    })

    return () => anim.destroy() // 用于清理动画
  }, [])

  return <div ref={containerRef}></div>
}

export default LottieAnimation
