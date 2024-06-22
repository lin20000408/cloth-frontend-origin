// https://github.com/Gamote/lottie-react
import Lottie from 'lottie-react'
import gameAnimation from '@/assets/loader-game.json'

// 展示用載入元件
export function DefaultLoader({ show = false }) {
  return (
    <div className={`semi-loader ${show ? '' : 'semi-loader--hide'}`}></div>
  )
}

// 展示用載入文字元件
export function LoaderText({ text = 'loading', show = false }) {
  return (
    <div className={`loading-text-bg ${show ? '' : 'loading-text--hide'}`}>
      <div className={`loading-text ${show ? '' : 'loading-text--hide'}`}>
        {text}...
      </div>
    </div>
  )
}

// lottie-react
export function GameLoader({ show = false }) {
  return (
    <div className={`game-loader-bg ${show ? '' : 'game-loader--hide'}`}>
      <Lottie
        className={`game-loader ${show ? '' : 'game-loader--hide'}`}
        animationData={gameAnimation}
      />
    </div>
  )
}

export function NoLoader({ show = false }) {
  return <></>
}
