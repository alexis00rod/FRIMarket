import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useCartContext } from "../../context/CartContext/CartContext"

export const BtnAddCart = ({product, qty,toggle}) => {
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
    <button 
    className={`${toggle ? 'w-8' : 'w-full max-w-btn'} h-8 px-2 flex justify-center items-center gap-2 bg-blue-500 text-white rounded-md disabled:bg-blue-400`}
    onClick={addProduct}
    disabled={stock < 1 || stock <= cartList.find(e => e.id === id)?.qty}
    >
      <i className="fa-solid fa-cart-shopping"></i>
      {!toggle && <span className='text-sm'>Agregar al carrito</span>}
    </button>
  )
}
