export const Menu = ({position, expand, children, ...props}) => {

  return (
    <div className={`menu menu-${position} ${expand && 'menu-expand'}`} {...props} >
      {children}
    </div>
  )
}
