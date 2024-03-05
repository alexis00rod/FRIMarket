import { useState } from "react"
import { formartDateLocalized, formatHideCardNumber, formatPrice } from '../../../services/format'

export const OrderItem = ({order}) => {
  const [orderProducts, setOrderProducts] = useState(false)

  const withStandardShipping = order && order.products.filter(e => e.shipping === 'Envío standard')

  return (
    <li className="orderItem">
      <div className="orderItem-handle" onClick={() => setOrderProducts(!orderProducts)}>
        <div className="flex items-start">
          <div className="orderItem-summary">
            <h4>{formartDateLocalized(order.date)}</h4>
            <span className="text-yellow-500">${formatPrice(order.total + (withStandardShipping.length*500))}</span>
          </div>
          <i className={`fa-solid fa-chevron-down duration-200 ${orderProducts && 'rotate-180'}`}></i>
        </div>
        <div className="orderItem-info">
          <p>Productos: {order.qty}</p>
          <p>Metodo de pago: {formatHideCardNumber(order.payment.cardNumber)}</p>
        </div>
      </div>
      {orderProducts &&
        <ul className="orderItem-expand">
          {order.products.map(e => (
            <li key={e.id} className="orderItem-product">
              <div className="orderItem-product-detail">
                <img src={e.images[0].url} alt={e.images[0].name} />
                <div className="flex flex-col">
                  <h4 className="line-clamp-1">{e.title.join(' ')}</h4>
                  <p>Cantidad: {e.qty}</p>
                </div>
              </div>
              <button className="btn btn-m btn-blue btn-text" title="Opinar sobre el producto">
                Opinar sobre el producto
              </button>
            </li>
          ))}
        </ul>
      }
    </li>
  )
}
