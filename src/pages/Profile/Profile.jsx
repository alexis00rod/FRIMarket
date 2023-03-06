import { useParams } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"

export const Profile = () => {
  const {idUser} = useParams()
  const {userLogged} = useAuthContext()

  return (
    <div>
      {idUser}      
    </div>
  )
}
