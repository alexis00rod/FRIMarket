import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext"
import { formatPrice } from "../../services/format"
import { BtnCart } from "../Button/BtnCart"

export const NavbarCart = () => {
  const {cartList,cartPriceTotal,cartQty, removeProductToCartList} = useCartContext()

  return (
    <div className="navbar-expand">
      <BtnCart qty={cartQty}/>
      <div className="navbar-expand-open open-right">
      {cartList.length === 0
        ? <p className="p-2 text-center">Tu carrito esta vacio</p>
        : <div className="p-2 flex flex-col">
            {cartList.map(e => (
              <div key={e.id} className="w-full pb-4 flex">
                <img src={e.images[0].url} alt={e.images[0].name} className="w-[50px] h-[50px] flex flex-none object-cover border border-gray-300 rounded-md" />
                <div className="ml-2 flex flex-col grow">
                  <h4 className="w-full text-sm font-medium line-clamp-1">{e.title.join(' ')}</h4>
                  <p className="text-sm text-gray-700"><span className="text-yellow-500">${formatPrice(e.price)}</span> x <span>{e.qty}</span></p>
                </div>
                <button 
                className="ml-2 w-[20px] h-[20px] flex items-center justify-center flex-none text-red-500 duration-200 hover:text-red-600" 
                onClick={() => removeProductToCartList(e)}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
            ))}
            <div className="w-full p-2 flex flex-col items-center gap-2 border-t border-gray-300">
              <p className="flex items-center gap-2 font-medium">
                Subtotal: <span className="text-yellow-500">${formatPrice(cartPriceTotal)}</span>
              </p>
              <Link 
              to='/cart' 
              className="btn btn-blue btn-l" 
              title="Ver carrito"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="text-sm font-medium">Ver carrito</span>
              </Link>
              <Link 
              to='/checkout' 
              className="btn btn-green btn-l" 
              title="Ir a pagar"
              >
                <i className="fa-solid fa-check"></i>
                <span className="text-sm font-medium">Ir a pagar</span>
              </Link>
            </div>
          </div>}
      </div>
    </div>
  )
}
