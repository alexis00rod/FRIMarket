import { Navigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"

export const ProtectedRoutes = ({children}) => {
  const {userLogged} = useAuthContext()
  if(!userLogged) return <Navigate to='/login' />
  return children
}
