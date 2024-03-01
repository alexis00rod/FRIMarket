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
      <div className="detail-seller">
        <Link to={`/profile/${seller.idUser}`} className="detail-seller-photo">
          <img src={seller.photoURL} alt={seller.idUser} />
        </Link>
        <Link to={`/profile/${seller.idUser}`} className="detail-seller-name">
          {`${seller.name} ${seller.lastName}`}
        </Link>
      </div>
    )
  }
}
