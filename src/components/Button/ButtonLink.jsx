import { NavLink } from "react-router-dom"

export const ButtonLink = ({size, color, active,style, children, ...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `btn ${size} ${color} ${style} ${isActive && active}`}
      >
      <span className="font-medium">{children}</span>
    </NavLink>
  )
}
