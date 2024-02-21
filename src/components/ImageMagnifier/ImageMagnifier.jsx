import { useState } from "react"

export const ImageMagnifier = ({image}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const {url, name} = image

  const handleMouseMove = ({currentTarget,pageX, pageY }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const x = ((pageX - left) / width) * 100
    const y = ((pageY - top) / height) * 100
    setPosition({ x, y })
    setCursorPosition({ x: pageX - left, y: pageY - top })
  }

  return (
    <div
    className="relative w-full h-full"
    >
      <img className="w-max h-full mx-auto object-contain" src={url} alt={name} 
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseMove}
        />
      {showMagnifier && (
        <div
        className='absolute pointer-events-none'
        style={{
          top: `${cursorPosition.y - 100}px`,
          left: `${cursorPosition.x - 100}px`
        }}
        >
          <div
          className="w-52 h-52 border-2 border-white"
          style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: `${position.x}% ${position.y}%`
          }}
          />
        </div>)}
    </div>
  )
}
