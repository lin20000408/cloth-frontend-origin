import { useState } from 'react'

const ImageEffect = ({
  src,
  className,
  width,
  height,
  alt,
  magnifierHeight = 300,
  magnifierWidth = 300,
  zoomLevel = 3,
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [[x, y], setXY] = useState([0, 0])

  const mouseEnter = (e) => {
    const el = e.currentTarget
    const { width, height } = el.getBoundingClientRect()
    setSize([width, height])
    setShowMagnifier(true)
  }

  const mouseLeave = () => {
    setShowMagnifier(false)
  }

  const mouseMove = (e) => {
    const el = e.currentTarget
    const { top, left } = el.getBoundingClientRect()

    const x = e.pageX - left - window.scrollX
    const y = e.pageY - top - window.scrollY

    setXY([x, y])
  }

  return (
    <div className="relative inline-block">
      <img
        src={src}
        className={className}
        width={width}
        height={height}
        alt={alt}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
        style={{ display: 'block' }} // Ensure the image is displayed as a block element
      />
      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            border: '1px solid lightgrey',
            backgroundColor: 'white',
            borderRadius: '5px',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        />
      )}
    </div>
  )
}

export default ImageEffect
