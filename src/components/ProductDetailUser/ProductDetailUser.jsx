import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserById } from "../../services/firestore"
import { Loader } from "../index.js"

export const ProductDetailUser = ({user}) => {
  const [userProfile, setUserProfile] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUserById(user)
    .then(resp => setUserProfile({
      id: resp.docs[0].id,
      ...resp.docs[0].data()
    }))
    .finally(() => setLoading(true))
  },[user])

  const {idUser, email,displayName, photoURL} = userProfile

  return (
    <div className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 rounded-md">
      <h4 className='px-2 py-2 text-2xl font-medium'>Publicado por:</h4>
      {loading
      ? <Link to={`/profile/${idUser}`} 
        className='w-max px-2 py-2 flex items-center gap-2 hover:text-yellow-500'
        >
          <img src={photoURL} alt={displayName} className='w-14 h-14 object-cover rounded-md' />
          <div className="px-2 flex flex-col grow">
            <span className="text-lg font-medium">{displayName}</span>
            <span className="text-sm leading-3">{email}</span>
          </div>
        </Link>
      : <div className="w-max px-2 py-2">
          <Loader />
        </div>}
    </div>
  )
}
