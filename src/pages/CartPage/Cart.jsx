import { Link } from "react-router-dom"
import { CartItem, Loader} from "../../components"
import { useCartContext } from "../../context/CartContext/CartContext"
import { formatPrice } from "../../services/format"

export const Cart = () => {
  const {cartList, cartPriceTotal, cartQty, emptyCart} = useCartContext()

  if(!cartList && !cartPriceTotal && !cartQty) return <Loader />

  return (
    <section className="section section-xl">
      {cartQty < 1
      ? <p className="cart-empty">Tu carrito esta vacio</p>
      : <div className="cart">
          {/* Lista de productos */}
          <div className="cart-list">
            {cartList.map(e => <CartItem key={e.id} product={e} />)}
          </div>
          {/* Carrito orden */}
          <div className="cart-order">
            <h3 className="cart-order-title">Tu carrito</h3>
            {/* Precio */}
            <span className="cart-price">${formatPrice(cartPriceTotal)}</span>
            {/* Volver a la tienda */}
            <Link to='/shop' className="btn btn-l btn-text btn-blue">
              <i className="fa-solid fa-shop"></i>
              Seguir comprando
            </Link>
            {/* Ir a checkout */}
            <Link to='/checkout' className="btn btn-l btn-text btn-green">
              <i className="fa-solid fa-check"></i>
              Ir a pagar
            </Link>
            {/* Vaciar carrito */}
            <button className="btn btn-l btn-text btn-red" onClick={() => emptyCart()}>
              <i className="fa-solid fa-trash"></i>
              Vaciar carrito
            </button>
          </div>
        </div>}
    </section>
  )
}
