import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext/CartContext"
import { useCheckoutContext } from "./context/CheckoutContext"
import { formatHideCardNumber, formatPrice } from "../../services/format"

export const CheckoutConfirm = () => {
  const {cartList, cartPriceTotal, cartQty} = useCartContext()
  const {checkoutOrder} = useCheckoutContext()

  const withStandardShipping = cartList.filter(e => e.shipping === 'standard')

  return (
    <div>
      <div className="flex flex-col gap-4">
        {/* Detalles del envio */}
        <div className="w-full flex flex-col gap-4">
          <h4 className="px-2 text-lg font-medium">Detalle del envío</h4>
          {/* Usuario y localizacion */}
          <div className="w-full flex">
            <div className="w-[50px] h-[50px] flex items-center justify-center flex-none text-blue-500 rounded-full border border-gray-300">
              <i className='text-xl fa-solid fa-location-dot'></i>
            </div>
            <div className="ml-4 flex flex-col">
              <p className="mb-1 text-lg capitalize line-clamp-1">{`${checkoutOrder.shipping.address.street} ${checkoutOrder.shipping.address.number}`}</p>
              <p className="text-sm line-clamp-1">C.P. {`${checkoutOrder.shipping.address.postalCode} - ${checkoutOrder.shipping.city.name}, ${checkoutOrder.shipping.province.name}`}</p>
              <p className="text-sm line-clamp-1">{`${checkoutOrder.user.displayName} - ${checkoutOrder.user.phone}`}</p>
            </div>
          </div>
          {/* Envio y productos */}
          <div className="w-full flex">
            <div className="w-[50px] h-[50px] flex items-center justify-center flex-none text-blue-500 rounded-full border border-gray-300">
              <i className='text-xl fa-solid fa-truck-fast'></i>
            </div>
            <div className="ml-4 flex flex-col grow">
              <p className="mb-1 text-lg">
                {cartQty > 1
                  ? `Recibís ${cartQty} productos en ${cartList.length} envíos`
                  : `Recibís 1 producto en un envio`}
              </p>
              <ul className="flex flex-col grow gap-4">
                {cartList.map(e => 
                  <li key={e.id} className="flex items-center">
                    <img src={e.images[0].url} alt={e.images[0].name} className="w-[50px] h-[50px] flex flex-none object-cover border border-gray-300 rounded-md" />
                    <div className="ml-2 flex flex-col grow">
                      <p className="mb-1 text-sm line-clamp-1 leading-4">{e.title.join(' ')}</p>
                      <p className="text-sm line-clamp-1 leading-4">Cantidad: <span className="font-medium">{e.qty}</span></p>
                    </div>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
        {/* Detalle del pago */}
        <div className="w-full flex flex-col gap-4">
          <h4 className="px-2 text-lg font-medium">Detalle del pago</h4>
          <div className="w-full flex">
            {/* Metodo de pago y precio total */}
            <div className="w-[50px] h-[50px] flex items-center justify-center flex-none text-blue-500 rounded-full border border-gray-300">
              <i className='text-xl fa-solid fa-credit-card'></i>
            </div>
            <div className="ml-4 flex flex-col">
              <p className="mb-1 text-lg capitalize line-clamp-1">{formatHideCardNumber(checkoutOrder.payment.cardNumber)}</p>
              <p className="text-sm">Pagás 1x ${formatPrice(cartPriceTotal + (withStandardShipping.length*500))}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
