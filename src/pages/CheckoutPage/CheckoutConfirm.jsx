import { useCartContext } from "../../context/CartContext/CartContext"
import { useCheckoutContext } from "./context/CheckoutContext"
import { formatHideCardNumber, formatPrice } from "../../services/format"

export const CheckoutConfirm = () => {
  const {cartList, cartPriceTotal, cartQty, delivery} = useCartContext()
  const {checkoutOrder} = useCheckoutContext()

  return (
    <>
      {/* Detalle del envio */}
      <div className="flex flex-col">
        <h3>Detalle del envío</h3>
        <div className="checkout-item">
          <i className='checkout-icon fa-solid fa-location-dot'></i>
          <div className="checkout-detail">
            <p>
              {`${checkoutOrder.shipping.address.street} 
                ${checkoutOrder.shipping.address.number}
                ${checkoutOrder.shipping.address.apartment ? checkoutOrder.shipping.address.apartment : ''}
              `}
            </p>
            <p>C.P. {`${checkoutOrder.shipping.address.postalCode} - ${checkoutOrder.shipping.city.name}, ${checkoutOrder.shipping.province.name}`}</p>
            <p>{`${checkoutOrder.user.displayName} - ${checkoutOrder.user.phone}`}</p>
          </div>
        </div>
        <div className="checkout-item">
          <i className='checkout-icon fa-solid fa-truck-fast'></i>
          <div className="checkout-detail">
            <p>
              {cartQty > 1
                ? `Recibís ${cartQty} productos en ${cartList.length} envíos`
                : `Recibís 1 producto en un envio`}
            </p>
            <ul className="checkout-products">
              {cartList.map(e => 
                <li key={e.id} className="checkout-product">
                  <img src={e.images[0].url} alt={e.images[0].name} />
                  <div className="ml-2">
                    <p>{e.title.join(' ')}</p>
                    <p>Cantidad: <span className="font-medium">{e.qty}</span></p>
                  </div>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
      {/* Detalle del pago */}
      <div className="mb-2 flex flex-col">
        <h3>Detalle del pago</h3>
        <div className="checkout-item">
          <i className='checkout-icon fa-solid fa-credit-card'></i>
          <div className="checkout-detail">
            <p className="">{formatHideCardNumber(checkoutOrder.payment.cardNumber)}</p>
            <p className="">Pagás 1x ${formatPrice(cartPriceTotal + delivery.price)}</p>
          </div>
        </div>
      </div>
    </>
  )
}
