export const Slider = ({children,slider}) => {
  return (
    <div className="w-full flex gap-4 overflow-x-auto scroll-smooth scrollbar-none" ref={slider}>
      {children}
    </div>
  )
}
