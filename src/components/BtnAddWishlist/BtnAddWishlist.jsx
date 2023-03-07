import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext/AuthContext'
import { addProductWishlist, getProductInWishlist, removeProductWishlist } from '../../services/firestore'

export const BtnAddWishlist = ({product,toggle}) => {
  const {userLogged} = useAuthContext()
  const [productInWishlist, setProductInWishlist] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    userLogged &&
      getProductInWishlist(userLogged,product,setProductInWishlist)
  },[userLogged,product])

  const Button = ({icon,title,...props}) => {
    return (
      <button 
      className={`${toggle ? 'w-8' : 'w-full max-w-btn'} h-8 px-2 flex items-center justify-center gap-2 bg-red-500 text-white rounded-md `}
      title={title}
      {...props}
      >
        <i className={`fa-solid fa-${icon}`}></i>
        {!toggle && <span className='text-sm'>{title}</span>}
      </button>
    )
  }
  if(!userLogged) return <Button icon='heart' title='Agregar a favoritos' onClick={() => navigate('/login')} />
  if(productInWishlist) return <Button icon='trash' title='Borrar de favoritos' onClick={() => removeProductWishlist(userLogged,product)} />
  if(!productInWishlist) return <Button icon='heart' title='Agregar a favoritos' onClick={() => addProductWishlist(userLogged,product)} />
}
