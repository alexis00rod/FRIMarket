export const Button = ({icon,color,style,children,...props}) => {
  return (
    <button className={`btn ${color} ${style}`} {...props} >
      {icon && <i className={`fa-solid fa-${icon}`}></i>}
      {children}
    </button>
  )
}
