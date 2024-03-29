import { Navigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { Loader } from "../index.js"

export const ProtectedRoutes = ({children}) => {
  const {userLogged} = useAuthContext()
  if(userLogged === null) return <Navigate to='/login' />
  if(userLogged === undefined) return <Loader />
  return children
}
