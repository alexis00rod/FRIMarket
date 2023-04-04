import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext/AuthContext'
import { addProductWishlist, getProductInWishlist, removeProductWishlist } from '../../services/firestore'
import { Button } from '../index.js'

export const BtnAddWishlist = ({product,size}) => {
  const {userLogged} = useAuthContext()
  const [productInWishlist, setProductInWishlist] = useState(false)

  useEffect(() => {
    userLogged &&
      getProductInWishlist(userLogged,product,setProductInWishlist)
  },[userLogged,product])

  const handleAddWishlist = e => {
    e.preventDefault()
    productInWishlist
    ? removeProductWishlist(userLogged, product)
    : addProductWishlist(userLogged, product)
  }

  if(!userLogged) return

  return (
    <Button
    icon={productInWishlist ? 'heart-crack' : 'heart'}
    color={size !== 'btn-s' ? 'btn-text-red' : 'btn-red'}
    size={size}
    title={productInWishlist ? 'Borrar de favoritos' : 'Agregar a favoritos'}
    onClick={handleAddWishlist}
    >
      {size !== 'btn-s' && <span className='text-sm font-medium'>{productInWishlist ? 'Borrar de favoritos' : 'Agregar a favoritos'}</span>}
    </Button>
  )
}
