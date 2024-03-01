import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext/AuthContext'
import { addProductWishlist, getProductInWishlist, removeProductWishlist } from '../../services/wishlist'

export const BtnAddWishlist = ({product,small}) => {
  const {userLogged} = useAuthContext()
  const [productInWishlist, setProductInWishlist] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    userLogged && getProductInWishlist(userLogged,product,setProductInWishlist)
  },[userLogged, product])

  const submitAddToWishlist = () => {
    if(!userLogged) {
      navigate('/login')
    } else {
      productInWishlist
      ? removeProductWishlist(userLogged, product)
      : addProductWishlist(userLogged, product)
    }
  }

  const buttonText = productInWishlist ? 'Eliminar de favoritos' : 'Agregar a favoritos'
  const buttonIcon = productInWishlist ? 'heart-crack' : 'heart'
  
  return (
    <button className={small ? 'btn-wishlist-small' : 'btn-wishlist'} title={buttonText} onClick={submitAddToWishlist}>
      <i className={`fa-solid fa-${buttonIcon}`}></i>
      {!small && buttonText}
    </button>
  )
}
