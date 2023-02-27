import { useCartContext } from "../../context/CartContext/CartContext"

export const CartMenu = ({handle}) => {
  const {cartList,cartPriceTotal, removeProductToCartList} = useCartContext()

  return (
    <div className="fixed top-16 left-0 bottom-0 z-10 w-full flex justify-end bg-gray-900/25" onClick={() => handle(false)}>
      <div className="w-full max-w-md h-full flex flex-col bg-white border-l border-gray-500 overflow-y-scroll" onClick={e => e.stopPropagation()}>
        {cartList.length === 0
        ? <p className="px-3 py-3 flex justify-center">Tu carrito esta vacio</p>
        : <>
            <ul className="flex flex-col divide-y divide-gray-300">
              {cartList.map(e => (
                <li key={e.id} className='px-3 py-3 w-full flex gap-2'>
                  <figure className="w-24 h-24 px-1 py-1 flex items-center justify-center border border-gray-300 rounded-md">
                    <img src={e.thumb} alt={e.name} />
                  </figure>
                  <div className="px-2 py-1 grow">
                    <h4 className="mb-1 text-lg font-medium">{e.name}</h4>
                    <div className="flex items-center gap-2"><span className="text-lg text-yellow-500">${e.price}</span> <span className="text-sm">x {e.qty}</span></div>
                  </div>
                  <button className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-md"
                  title="Eliminar producto"
                  onClick={() => removeProductToCartList(e.id)}
                  >
                    <i className="fa solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-300 px-3 py-3 flex flex-col items-center gap-2">
              <p className="font-medium">Precio total: <span className="text-yellow-500 font-normal">${cartPriceTotal}</span></p>
              <div className="w-max flex gap-2">
                <button className="h-8 px-2 flex items-center gap-2 bg-blue-500 text-white rounded-md" title="Ver carrito">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="text-sm">Ver carrito</span>
                </button>
                <button className="h-8 px-2 flex items-center gap-2 bg-green-500 text-white rounded-md" title="Ir a pagar">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="text-sm">Ir a pagar</span>
                </button>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}
