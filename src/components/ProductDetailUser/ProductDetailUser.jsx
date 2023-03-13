import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUser } from "../../services/firestore"
import { Loader } from "../index.js"

export const ProductDetailUser = ({user}) => {
  const [userProfile, setUserProfile] = useState({})

  useEffect(() => {
    getUser(user,setUserProfile)
  },[user])

  const {idUser,displayName, photoURL} = userProfile

  return (
    <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 rounded-md divide-y divide-gray-300">
      <h4 className='w-full px-2 py-2 text-xl font-medium'>Publicado por:</h4>
      <div className="w-full px-x pt-2">
        {userProfile
        ? <Link to={`/profile/${idUser}`} 
          className='w-max px-2 py-2 flex items-center gap-2 hover:text-yellow-500'
          >
            <img src={photoURL} alt={displayName} className='w-14 h-14 object-cover rounded-md' />
            <div className="px-2 flex flex-col grow">
              <span className="text-lg font-medium">{displayName}</span>
              <span className="text-sm leading-3">@{idUser}</span>
            </div>
          </Link>
        : <div className="w-max px-2 py-2">
            <Loader />
          </div>}
      </div>
    </div>
  )
}
