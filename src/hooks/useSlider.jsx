import { useRef } from "react"

export const useSlider = () => {
  const slider = useRef(null)

  const handlePrevSlide = e => {
    e.preventDefault()
    slider.current.scrollLeft -= slider.current.offsetWidth;
  }

  const handleNextSlide = e => {
    e.preventDefault()
    slider.current.scrollLeft += slider.current.offsetWidth;
  }

  return {slider, handleNextSlide, handlePrevSlide}
}
