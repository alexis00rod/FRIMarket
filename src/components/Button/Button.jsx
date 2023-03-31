export const Button = ({icon,color,size,style,children,...props}) => {
  return (
    <button className={`btn ${color} ${size} ${style}`} {...props} >
      {icon && <i className={`fa-solid fa-${icon}`}></i>}
      {children}
    </button>
  )
}
