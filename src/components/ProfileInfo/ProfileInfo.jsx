import { useEffect, useState } from "react"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { getUser } from "../../services/firestore"
import { Loader } from "../Loader/Loader"

export const ProfileInfo = ({user}) => {
  const {userLogged} = useAuthContext()
  const [userProfile, setUserProfile] = useState({})
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    getUser(user)
      .then(resp => setUserProfile({
        id: resp.id,
        ...resp.data()
      }))
      .finally(() => setLoading(true))
  },[user])
  
  const {name,uid,posts,sales} = userProfile

  if(!loading) return <Loader />

  return (
    <ul className="w-full px-2 py-2 divide-y divide gray-300">
      <li className="px-2 py-2 flex items-center grow">
        <i className="w-12 h-12 flex items-center justify-center fa-solid fa-user"></i>
        <div className="px-2 flex flex-col grow">
          <h2 className="text-xl font-semibold leading-5">{name}</h2>
          <h3 className="text-sm leading-4">@{uid}</h3>
        </div>
        {user === userLogged.email &&
        <button className="w-8 h-8 flex items-center justify-center hover:text-yellow-500">
          <i className="fa-solid fa-pen"></i>
        </button>}
      </li>
      <li className="px-2 py-2 flex items-center grow">
        <span className="font-medium">Publicaciones:</span>
        <span className="text-xl px-2 py-1 font-semibold">{posts}</span>
      </li>
      <li className="px-2 py-2 flex items-center grow">
        <span className="font-medium">Ventas:</span>
        <span className="text-xl px-2 py-1 font-semibold">{sales}</span>
      </li>
    </ul>
  )
}
