import { Link } from "react-router-dom"
import { Breadcrumb, CartProduct } from "../../components"
import { useCartContext } from "../../context/CartContext/CartContext"

export const Cart = () => {
  const {cartList, cartPriceTotal, cartQty, emptyCart} = useCartContext()

  return (
    <>
      <Breadcrumb />
      <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
        {cartQty === 0 
        ? <p className="px-2 py-2 flex justify-center">Tu carrito esta vacio</p>
        : <section className="w-full flex gap-4">
          <div className="h-max grow bg-white border border-gray-300 rounded-md overflow-hidden">
            <table className="w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-gray-100 divide-x divide-gray-300">
                  <th className="px-2 py-2">Producto</th>
                  <th className="px-2 py-2">Precio</th>
                  <th className="px-2 py-2">Cantidad</th>
                  <th className="px-2 py-2">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {cartList.map(e => <CartProduct key={e.id} product={e} />)}
              </tbody>
            </table>
          </div>
          <div className="w-1/4 h-max px-4 py-4 flex flex-col items-center flex-none gap-2 bg-white border border-gray-300 rounded-md">
            <span className="font-medium">Total del carrito</span>
            <h4 className="mb-2 text-2xl text-yellow-500 font-medium">${cartPriceTotal}</h4>
            <button
            className="h-8 px-2 flex items-center gap-2 bg-red-500 text-white rounded-md"
            onClick={() => emptyCart()}
            >
              <i className="fa-solid fa-trash"></i>
              <span className="text-sm">Vaciar carrito</span>
            </button>
            <Link to='/shop/all' className="h-8 px-2 flex items-center gap-2 bg-blue-500 text-white rounded-md" >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="text-sm">Continuar comprando</span>
            </Link>
            <button className="h-8 px-2 flex items-center gap-2 bg-green-500 text-white rounded-md">
              <i className="fa-solid fa-check"></i>
              <span className="text-sm">Ir a pagar</span>
            </button>
          </div>
        </section>}
      </main>
    </>
  )
}
