export const Element = ({size, flex,children,...props}) => {
  return (
    <div className={`relative box ${size} flex ${flex}`} {...props}>{children}</div>
  )
}
