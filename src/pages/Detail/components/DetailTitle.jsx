import { useState } from "react"
import { useAuthContext } from "../../../context/AuthContext/AuthContext.jsx"
import { EditProduct } from "../../../components/"

export const DetailTitle = ({product}) => {
  const {title, user:{email}} = product
  const {userLogged} = useAuthContext()
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className="detail-title">
      <h2>{title.join(' ')}</h2>
      {userLogged && userLogged.email === email &&
      <button className="btn btn-s btn-black" title="Editar producto" onClick={() => setEditProduct(true)}>
        <i className="fa-solid fa-pen"></i>
      </button>}
      {editProduct && <EditProduct product={product} handle={setEditProduct} />}
    </div>
  )
}
