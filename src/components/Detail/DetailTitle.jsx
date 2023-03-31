import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { Button, DetailDate, DetailLocation, EditProduct } from "../index.js"

export const DetailTitle = ({product}) => {
  const {name, idUser, price, province, timestamp} = product
  const {userLogged} = useAuthContext()
  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className="box flex flex-col">
      <div className="box-header flex items-center">
        <h2 className='flex grow text-xl font-medium line-clamp-1'>{name}</h2>
        {userLogged && userLogged.email === idUser &&
        <Button icon='pen' size='btn-s' color='btn-black' title='Editar producto' onClick={() => setEditProduct(true)}  />}
      </div>
      <div className="box-body flex flex-col ">
        <h3 className='pb-2 text-3xl text-yellow-500 font-medium'>${price}</h3>
        <div className="w-full flex flex-col">
          <DetailLocation location={province} />
          <DetailDate date={timestamp} />
        </div>
      </div>
      {editProduct && <EditProduct product={product} handle={setEditProduct} />}
    </div>
  )
}
