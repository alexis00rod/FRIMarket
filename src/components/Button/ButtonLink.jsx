import { NavLink } from "react-router-dom"

export const ButtonLink = ({size, color, active, children, ...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `btn ${size} ${color} ${isActive && active}`}
      >
      <span className="font-medium">{children}</span>
    </NavLink>
  )
}
