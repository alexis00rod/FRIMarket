import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUser } from "../../../services/user"

export const DetailSeller = ({user}) => {
  const [seller, setSeller] = useState()

  useEffect(() => {
    getUser(user, setSeller)
  },[user])

  if (seller) {
    return (
      <div className="w-full mb-2 flex items-center p-2 border border-slate-300 rounded-md">
        <Link to={`/profile/${seller.idUser}`} className="w-10 h-10 overflow-hidden rounded-full">
          <img src={seller.photoURL} alt={seller.idUser} className="w-full h-full object-cover" />
        </Link>
        <Link to={`/profile/${seller.idUser}`} className="ml-2 w-max text-sm font-medium hover:underline">
          {`${seller.name} ${seller.lastName}`}
        </Link>
      </div>
    )
  }
}
