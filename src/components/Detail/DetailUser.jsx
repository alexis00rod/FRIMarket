import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUser } from "../../services/firestore"

export const DetailUser = ({user}) => {
  const [profile, setProfile] = useState({})
  
  useEffect(() => {
    getUser(user,setProfile)
  },[user])

  return (
    <p className='flex items-center gap-2 capitalize'>
      <span className='font-medium'>Publicado por: </span>
      {profile && <Link to={`/profile/${profile.idUser}`} className="duration-200 hover:text-yellow-500">{profile.displayName}</Link>}
    </p>
  )
}
