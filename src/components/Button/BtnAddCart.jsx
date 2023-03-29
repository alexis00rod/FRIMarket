import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useCartContext } from "../../context/CartContext/CartContext"
import { Button } from "./Button"

export const BtnAddCart = ({product, qty}) => {
  const {userLogged} = useAuthContext()
  const {cartList,addToCartList} = useCartContext()
  const {id, stock} = product
  const navigate = useNavigate()

  const addProduct = () => {
    userLogged
    ? addToCartList(product,qty)
    : navigate('/login')
  }

  return (
    <Button icon='cart-shopping' color='btn-blue' onClick={addProduct} disabled={stock < 1 || stock <= cartList.find(e => e.id === id)?.qty} >
      <span className="hidden sm:flex text-sm font-medium">Agregar al carrito</span>
    </Button>
  )
}
