import { useState } from "react"
import { formatHideCardNumber, formatPrice } from '../../../services/format'
import moment from "moment"

export const OrderItem = ({order}) => {
  const [orderProducts, setOrderProducts] = useState(false)

  const withStandardShipping = order && order.products.filter(e => e.shipping === 'standard')

  return (
    <li className="w-full p-4 flex flex-col gap-2 bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
      <div className="flex flex-col">
        <div className="w-full mb-2 flex">
          <div className="flex gap-4 grow font-medium">
            <h4 className="">{moment(order.date.toDate()).format('LL')}</h4>
            <span className="text-yellow-500">${formatPrice(order.total + (withStandardShipping.length*500))}</span>
          </div>
          <button onClick={() => setOrderProducts(!orderProducts)}>
            <i className={`fa-solid fa-chevron-down duration-200 ${orderProducts && 'rotate-180'}`}></i>
          </button>
        </div>
        <div className="w-full flex flex-wrap gap-x-4 text-sm">
          <p className="w-max">Productos: {order.qty}</p>
          <p className="w-max">Metodo de pago: {formatHideCardNumber(order.payment.cardNumber)}</p>
        </div>
      </div>
      {orderProducts &&
        <ul className="pt-4 w-full flex flex-col gap-4">
          {order.products.map(e => (
            <li key={e.id} className="w-full flex flex-col md:flex-row md:items-center gap-2">
              <div className="flex grow">
                <img src={e.images[0].url} alt={e.images[0].name} className="w-[50px] h-[50px] flex flex-none object-cover border border-gray-300 rounded-md" />
                <div className="ml-2 flex flex-col grow text-sm">
                  <h4 className="font-medium capitalize line-clamp-1">{e.title.join(' ')}</h4>
                  <p className="">Cantidad: {e.qty}</p>
                </div>
              </div>
              <button className="btn btn-m btn-blue" title="Opinar sobre el producto">
                <span>Opinar sobre el producto</span>
              </button>
            </li>
          ))}
        </ul>}
    </li>
  )
}
