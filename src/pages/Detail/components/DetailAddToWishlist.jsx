import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../../context/AuthContext/AuthContext"
import {addProductWishlist, getProductInWishlist, removeProductWishlist} from '../../../services/wishlist'

export const DetailAddToWishlist = ({product}) => {
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

  if(productInWishlist) {
    return (
      <button className="btn btn-m btn-red" onClick={submitAddToWishlist}>
        <i className="fa-solid fa-heart-crack"></i>
        <span className="text-sm font-medium">Eliminar de favoritos</span>
      </button>
    )
  } else {
      return (
        <button className="btn btn-m btn-red" onClick={submitAddToWishlist}>
          <i className="fa-solid fa-heart"></i>
          <span className="text-sm font-medium">Agregar a favoritos</span>
        </button>
      )
  }
}
