export const Slider = ({children,slider,banner=false}) => {
  return (
    <div className={`w-full flex ${!banner && 'gap-4'} overflow-x-auto scroll-smooth scrollbar-none`} ref={slider}>
      {children}
    </div>
  )
}
