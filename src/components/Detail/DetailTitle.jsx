import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { Button, EditProduct } from "../index.js"

export const DetailTitle = ({product}) => {
  const {name, idUser} = product
  const {userLogged} = useAuthContext()
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className="box-header flex items-center">
      <h2 className="grow text-xl font-medium line-clamp-1">{name}</h2>
      {userLogged && userLogged.email === idUser &&
      <Button icon='pen' size='btn-s' color='btn-black' title='Editar producto' onClick={() => setEditProduct(true)}  />}
      {editProduct && <EditProduct product={product} handle={setEditProduct} />}
    </div>
  )
}
