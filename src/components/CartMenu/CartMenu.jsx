import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext"

export const CartMenu = ({handle}) => {
  const {cartList,cartPriceTotal,cartQty, removeProductToCartList, emptyCart} = useCartContext()

  return (
    <div className="fixed top-24 left-0 bottom-0 z-10 w-full flex justify-end bg-gray-900/25" onClick={() => handle(false)}>
      <div className="w-full max-w-md h-full flex flex-col bg-white border-l border-gray-500" onClick={e => e.stopPropagation()}>
        {cartList.length === 0
        ? <p className="px-3 py-3 flex justify-center">Tu carrito esta vacio</p>
        : <div className="h-full flex flex-col">
            <ul className="flex flex-col grow divide-y divide-gray-300 overflow-y-scroll">
              {cartList.map(e => (
                <li key={e.id} className='px-3 py-3 w-full flex gap-2'>
                  <figure className="w-20 h-20 px-1 py-1 flex items-center justify-center border border-gray-300 rounded-md">
                    <img src={e.thumb} alt={e.name} />
                  </figure>
                  <div className="px-1 flex flex-col grow">
                    <h4 className="px-1 text-lg font-medium line-clamp-2">{e.name}</h4>
                    <div className="px-1 mb-1 flex items-center gap-2 text-lg">
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
            <div className="border-t border-gray-300 px-3 py-3 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-lg">
                <span className="font-medium">Precio total:</span>
                <span className="text-yellow-500">${cartPriceTotal}</span>
                <span className="text-sm">x {cartQty} productos</span>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <button
                className="w-full max-w-btn h-8 px-2 flex items-center gap-2 bg-red-500 text-white rounded-md"
                onClick={() => emptyCart()}
                >
                  <i className="fa-solid fa-trash"></i>
                  <span className="text-sm">Vaciar carrito</span>
                </button>
                <Link 
                to='/cart' 
                className="w-full max-w-btn h-8 px-2 flex items-center gap-2 bg-blue-500 text-white rounded-md" 
                title="Ver carrito"
                onClick={() => handle(false)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="text-sm">Ver carrito</span>
                </Link>
                <Link to='/checkout' className="w-full max-w-btn h-8 px-2 flex items-center gap-2 bg-green-500 text-white rounded-md" title="Ir a pagar">
                  <i className="fa-solid fa-check"></i>
                  <span className="text-sm">Ir a pagar</span>
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
