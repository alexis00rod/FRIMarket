import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext/AuthContext'
import { addProductWishlist, getProductInWishlist, removeProductWishlist } from '../../services/firestore'
import { Button } from '../index.js'

export const BtnAddWishlist = ({product,size}) => {
  const {userLogged} = useAuthContext()
  const [productInWishlist, setProductInWishlist] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    userLogged &&
      getProductInWishlist(userLogged,product,setProductInWishlist)
  },[userLogged,product])

  if(!userLogged) {
    return (
      <Button icon='heart' color='btn-red' size={size} title='Agregar a favoritos' onClick={() => navigate('/login')}>
        {size !== 'btn-s' && <span className='hidden md:flex text-sm font-medium'>Agregar a favoritos</span>}
      </Button>
    )
  }
  if(productInWishlist) {
    return (
      <Button icon='trash' color='btn-red' size={size} title='Borrar de favoritos' onClick={() => removeProductWishlist(userLogged,product)}>
        {size !== 'btn-s' && <span className='hidden md:flex text-sm font-medium'>Borrar de favoritos</span>}
      </Button>
    )
  }
  if(!productInWishlist) {
    return (
      <Button icon='heart' color='btn-red' size={size} title='Agregar a favoritos' onClick={() => addProductWishlist(userLogged,product)}>
        {size !== 'btn-s' && <span className='hidden md:flex text-sm font-medium'>Agregar a favoritos</span>}
      </Button>
    )
  }
}
