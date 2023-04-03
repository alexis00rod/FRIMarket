import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUser } from "../../services/firestore"
import { Loader } from "../index.js"

export const DetailUser = ({user}) => {
  const [profile, setProfile] = useState({})
  useEffect(() => {
    getUser(user,setProfile)
  },[user])

  const {idUser,photoURL, displayName} = profile

  return (
    <div className="box flex flex-col">
      <h4 className='box-header text-lg font-medium'>Publicado por</h4>
      <div className="box-body">
        {profile
        ? <Link to={`/profile/${idUser}`} 
          className='w-max flex items-center gap-2 hover:text-yellow-500'
          >
            <img src={photoURL} alt={displayName} className='w-14 h-14 object-cover rounded-md' />
            <div className="px-2 flex flex-col grow">
              <span className="text-lg font-medium">{displayName}</span>
              <span className="text-sm leading-3">@{idUser}</span>
            </div>
          </Link>
        : <div className="w-max">
            <Loader />
          </div>}
      </div>
    </div>
  )
}
