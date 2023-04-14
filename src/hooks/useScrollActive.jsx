import { useState } from 'react'

export const useScrollActive = () => {
  const [scrollActive, setScrollActive] = useState(false)

  let curScroll;
  let prevScroll = window.scrollY || document.documentElement.scrollTop;

  const checkScroll = () => {
      curScroll = window.scrollY || document.documentElement.scrollTop
      setScrollActive(curScroll > prevScroll ? true : false)
  } 
  
  window.addEventListener('scroll', checkScroll)

  return {scrollActive}
}
