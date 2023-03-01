import { useCartContext } from "../../context/CartContext/CartContext"

export const BtnAddCart = ({product, qty}) => {
  const {id, stock} = product
  const {cartList,addToCartList} = useCartContext()

  return (
    <button 
    className="w-full max-w-btn h-8 px-2 flex justify-center items-center gap-2 bg-blue-500 text-white rounded-md disabled:bg-blue-400"
    onClick={() => addToCartList(product,qty)}
    disabled={stock < 1 || stock <= cartList.find(e => e.id === id)?.qty}
    >
      <i className="fa-solid fa-cart-shopping"></i>
      <span className='text-sm'>Agregar al carrito</span>
    </button>
  )
}
