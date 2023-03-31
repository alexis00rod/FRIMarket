import { useState } from "react"
import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext"
import { Button } from "../index.js"

export const CartMenu = ({handle}) => {
  const {cartList,cartPriceTotal,cartQty, removeProductToCartList} = useCartContext()
  const [menu, setMenu] = useState(false)

  return (
    <div className="relative">
      <Button icon='cart-shopping' color='btn-blue' size='btn-s' style='btn-cart' onClick={() => setMenu(!menu)}>
        {cartQty !== 0 && <span>{cartQty}</span>}
      </Button>
      {menu &&
      <div className="menu menu-right">
        {cartList.length === 0
        ? <p className="">Tu carrito esta vacio</p>
        : <div className="divide-y divide-gray-300">
            <ul className="px-2 pb-2 flex flex-col">
              {cartList.map(e => (
                <li key={e.id} className='py-2 w-full flex gap-2'>
                  <figure className="w-16 h-16 px-1 py-1 flex items-center justify-center flex-none border border-gray-300 rounded-md">
                    <img src={e.thumb} alt={e.name} />
                  </figure>
                  <div className="flex flex-col grow">
                    <h4 className="text-sm font-medium line-clamp-1">{e.name}</h4>
                    <div className="flex gap-2">
                      <span className="text-yellow-500">${e.price}</span>
                      <span className="text-sm">x {e.qty}</span>
                    </div>
                  </div>
                  <button
                  className="w-8 h-8 px-2 flex items-center justify-center text-sm text-red-500"
                  onClick={() => removeProductToCartList(e.id)}
                  title='Eliminar producto'
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                </li>
              ))}
            </ul>
            <div className="px-2 py-2 flex flex-col items-center">
              <p className="pb-2 flex items-center gap-2 font-medium">
                Subtotal: <span className="text-yellow-500">${cartPriceTotal}</span>
              </p>
              <div className="w-full flex items-center justify-center gap-2">
                <Link 
                to='/cart' 
                className="btn btn-blue btn-m" 
                title="Ver carrito"
                onClick={() => handle(false)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="text-sm font-medium">Ver carrito</span>
                </Link>
                <Link 
                to='/checkout' 
                className="btn btn-green btn-m" 
                title="Ir a pagar"
                >
                  <i className="fa-solid fa-check"></i>
                  <span className="text-sm font-medium">Ir a pagar</span>
                </Link>
              </div>
            </div>
          </div>}
      </div>}
    </div>
  )
}
