import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOrder } from "../../services/order"
import { formartDateLocalized, formatHideCardNumber, formatPrice } from "../../services/format"
import { useProfile } from '../../hooks/useProfile'
import { Loader } from '../../components'

export const CheckoutOrder = () => {
  const {idOrder} = useParams()
  const [order, setOrder] = useState()
  const {profile} = useProfile()

  useEffect(() => {
    profile && 
      getOrder(profile.email,idOrder)
      .then(resp => setOrder({
        id: resp.id,
        ...resp.data()
      }))
  },[profile,idOrder])

  if(!order) return <Loader />

  return (
    <div className="checkoutOrder">
      <h2>Detalles de la orden</h2>
      <div className="checkoutOrder-summary">
        <p>Id: <span>{order.id}</span></p>
        <p>Fecha: <span>{formartDateLocalized(order.date)}</span></p>
        <p>Metodo de pago: <span>{formatHideCardNumber(order.payment.cardNumber)}</span></p>
      </div>
      <div className="checkoutOrder-summary">
        <p className="mb-1">Productos:</p>
        <ul className="flex flex-col">
          {order.products.map(e => (
            <li key={e.id} className='checkoutOrder-product'>
              <div className="flex flex-col">
                <p>{e.title.join(' ')}</p>
                <p>{e.qty}x ${formatPrice(e.price * e.qty)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className="checkoutOrder-summary">
        <p>Sub total: <span>${formatPrice(order.total)}</span></p>
        <p>Envío: <span>${formatPrice(order.delivery.price)}</span></p>
        <p>Total: <span className="font-medium">${formatPrice(order.delivery.price + order.total)}</span></p>
      </ul>
    </div>
  )
}
