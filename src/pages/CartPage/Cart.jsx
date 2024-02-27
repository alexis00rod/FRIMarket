import { Link } from "react-router-dom"
import { CartItem, Loader} from "../../components"
import { useCartContext } from "../../context/CartContext/CartContext"
import { formatPrice } from "../../services/format"

export const Cart = () => {
  const {cartList, cartPriceTotal, cartQty, emptyCart} = useCartContext()

  if(!cartList && !cartPriceTotal && !cartQty) return <Loader />

  return (
    <main className="flex flex-col grow">
      <section className="w-full max-w-[1200px] px-2 py-4 mx-auto flex flex-col gap-4">
        {cartQty < 1
        ? <p className="w-full p-4 flex justify-center text-center">Tu carrito esta vacio</p>
        : <div className="flex flex-col lg:flex-row gap-4">
            {/* Lista de productos */}
            <div className="p-4 flex flex-col grow border bg-white border-gray-300 divide-y divide-gray-300 rounded-md">
              {cartList.map(e => <CartItem key={e.id} product={e} />)}
            </div>
            {/* Carrito orden */}
            <div className="w-full lg:w-[300px] h-max p-4 flex flex-col items-center flex-none gap-2 bg-white border border-gray-300 rounded-md">
              <h3 className="text-lg font-medium">Tu carrito</h3>
              <span className="mb-2 text-2xl text-yellow-500 font-medium">${formatPrice(cartPriceTotal)}</span>
              <Link to='/shop' className="btn btn-l btn-blue">
                <i className="fa-solid fa-shop"></i>
                <span className="text-sm font-medium">Seguir comprando</span>
              </Link>
              <Link to='/checkout' className="btn btn-l btn-green">
                <i className="fa-solid fa-check"></i>
                <span className="text-sm font-medium">Ir a pagar</span>
              </Link>
              <button className="btn btn-l btn-red" onClick={() => emptyCart()}>
                <i className="fa-solid fa-trash"></i>
                <span className="text-sm font-medium">Vaciar carrito</span>
              </button>
            </div>
          </div>}
      </section>
    </main>
  )
}
