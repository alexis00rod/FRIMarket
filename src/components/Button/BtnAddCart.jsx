import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useCartContext } from "../../context/CartContext/CartContext"
import { Button } from "../index.js"

export const BtnAddCart = ({product, qty, size}) => {
  const {userLogged} = useAuthContext()
  const {cartList,addToCartList, removeProductToCartList} = useCartContext()
  const {id, stock} = product
  const navigate = useNavigate()

  const addProduct = () => {
    userLogged
    ? addToCartList(product,qty)
    : navigate('/login')
  }

  const productInCart = cartList.find(e => e.id === id)

  if(productInCart) {
    return (
      <Button 
      icon='trash' 
      color='btn-red' 
      size={size} 
      onClick={() => removeProductToCartList(id)} 
      title='Borrar del carrito'
      >
        {size !== 'btn-s' && <span className="text-sm font-medium">Borrar del carrito</span>}
      </Button>
    ) 
  } else {
    return (
      <Button 
      icon='cart-shopping' 
      color='btn-blue'
      size={size} 
      onClick={addProduct} 
      disabled={stock < 1 || stock <= cartList.find(e => e.id === id)?.qty}
      title='Añadir al carrito'
      >
        {size !== 'btn-s' && <span className="text-sm font-medium">Agregar al carrito</span>}
      </Button>
    )
  }
}
