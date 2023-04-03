export const Element = ({position, size, flex,children,...props}) => {
  return (
    <div className={`${position ? position : 'relative'} box ${size} h-max flex ${flex}`} {...props}>{children}</div>
  )
}
