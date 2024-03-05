import { Link } from "react-router-dom"
import { useAuthContext } from "../../../context/AuthContext/AuthContext.jsx"

export const DetailTitle = ({product}) => {
  const {id,title, user:{email}} = product
  const {userLogged} = useAuthContext()

  return (
    <div className="detail-title">
      <h2>{title.join(' ')}</h2>
      {userLogged && userLogged.email === email &&
        <Link to={`/editProduct/${id}`} className="ml-2 btn btn-s btn-blue" title="Editar producto" >
          <i className="fa-solid fa-pen"></i>
        </Link>}
    </div>
  )
}
