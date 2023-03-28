export const Button = ({icon,color,style,children,...props}) => {
  return (
    <button 
    className={`btn ${color} ${style}`}
    {...props}
    >
      {icon && <i className={`fa-solid fa-${icon}`}></i>}
      {children}
      {style === 'btn-menu' && <><span></span><span></span><span></span></>}
    </button>
  )
}
