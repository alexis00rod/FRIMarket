export const Menu = ({position, expand,children}) => {

  return (
    <div className={`menu menu-${position} ${expand && 'menu-expand'}`}>
      {children}
    </div>
  )
}
