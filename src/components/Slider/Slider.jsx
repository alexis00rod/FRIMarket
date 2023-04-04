export const Slider = ({row, children,slider}) => {
  return (
    <div className={`slider ${row && row}`} ref={slider}>
      {children}
    </div>
  )
}
