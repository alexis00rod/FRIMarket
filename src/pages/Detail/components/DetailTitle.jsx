import { useState } from "react"
import { useAuthContext } from "../../../context/AuthContext/AuthContext.jsx"
import { Link } from "react-router-dom"

export const DetailTitle = ({product}) => {
  const {id,title, user:{email}} = product
  const {userLogged} = useAuthContext()

  return (
    <div className="detail-title">
      <h2>{title.join(' ')}</h2>
      {userLogged && userLogged.email === email &&
        <Link to={`/editProduct/${id}`} className="btn btn-s btn-black" title="Editar producto" >
          <i className="fa-solid fa-pen"></i>
        </Link>}
    </div>
  )
}
