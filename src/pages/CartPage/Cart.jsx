import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext"
import { formatPrice } from "../../services/format"
import { CartItem} from "../../components"

export const Cart = () => {
  const {cartList, cartPriceTotal, cartQty, delivery, emptyCart} = useCartContext()

  return (
    <section className="cart">
      {cartQty < 1
      ? <p className="cart-empty">Tu carrito esta vacío</p>
      : <>
          <div className="grow">
            <ul className="cart-list">
              {cartList.map(e => <CartItem key={e.id} product={e} />)}
            </ul>
          </div>
          <div className="cart-summary">
            <p>Productos ({cartQty})<span>${formatPrice(cartPriceTotal)}</span></p>
            <p>Envio ({delivery.qty})<span>${formatPrice(delivery.price)}</span></p>
            <p className="font-medium">Total<span>${formatPrice(cartPriceTotal + delivery.price)}</span></p>
            <div className="mt-2 w-full flex flex-wrap justify-end gap-y-2 gap-x-4">
              <button className="btn btn-m btn-text btn-red" onClick={() => emptyCart()}>
                <i className="fa-solid fa-trash"></i>
                Vaciar carrito
              </button>
              <Link to='/checkout' className="btn btn-m btn-text btn-green">
                <i className="fa-solid fa-check"></i>
                Ir a pagar
              </Link>
            </div>
          </div>
        </>}
    </section>
  )
}
