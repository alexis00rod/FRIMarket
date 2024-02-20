import { useState } from "react"
import { useAuthContext } from "../../../context/AuthContext/AuthContext.jsx"
import { Button, EditProduct } from "../../../components/index.js"

export const DetailTitle = ({product}) => {
  const {title, user:{email}} = product
  const {userLogged} = useAuthContext()
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className="flex items-center px-2 pb-2">
      <h2 className="grow text-xl font-medium line-clamp-1 capitalize">{title}</h2>
      {userLogged && userLogged.email === email &&
      <button className="btn btn-s btn-black" title="Editar producto" onClick={() => setEditProduct(true)}>
        <i className="fa-solid fa-pen"></i>
      </button>}
      {editProduct && <EditProduct product={product} handle={setEditProduct} />}
    </div>
  )

  return (
    <div className="box-header flex items-center">
      <h2 className="grow text-xl font-medium line-clamp-1">{name}</h2>
      {userLogged && userLogged.email === email &&
      <Button icon='pen' size='btn-s' color='btn-black' title='Editar producto' onClick={() => setEditProduct(true)}  />}
      {editProduct && <EditProduct product={product} handle={setEditProduct} />}
    </div>
  )
}