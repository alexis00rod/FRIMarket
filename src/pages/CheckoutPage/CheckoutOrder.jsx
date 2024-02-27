import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOrder } from "../../services/order"
import { formatHideCardNumber, formatPrice } from "../../services/format"
import { useProfile } from '../../hooks/useProfile'
import { Loader } from '../../components'
import moment from "moment"

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

  const withStandardShipping = order && order.products.filter(e => e.shipping === 'standard')

  if(!order) return <Loader />

  return (
    <main className="flex flex-col grow">
      <section className="w-full md:max-w-[33rem] md:mt-12 mx-auto px-2 py-4 flex flex-col items-center grow md:grow-0 bg-white md:border md:border-gray-300 md:rounded-md divide-y divide-gray-300">
        <h3 className="px-2 pt-2 pb-4 text-lg font-medium">Detalles de la orden</h3>
        <div className="w-full px-2 py-1 flex flex-col">
          <p className="flex items-center justify-between">Id: <span>{order.id}</span></p>
          <p className="flex items-center justify-between">Fecha: <span>{moment(order.date.toDate()).format()}</span></p>
          <p className="flex items-center justify-between">Metodo de pago: <span>{formatHideCardNumber(order.payment.cardNumber)}</span></p>
        </div>
        <div className="w-full px-2 py-1 flex flex-col">
          <p className="mb-1">Productos:</p>
          <ul className="w-full flex flex-col gap-1 divide-y divide-gray-300">
            {order.products.map(e => (
              <li key={e.id} className='w-full px-2 flex items-center'>
                <div className="flex flex-col grow">
                  <p className="w-full max-w-[200px] text-sm capitalize line-clamp-1">{e.title.join(' ')}</p>
                  <p className="text-sm">{e.qty}x ${formatPrice(e.price * e.qty)}</p>
                </div>
                <button className="text-sm text-yellow-500 text-center hover:underline">
                  <i className="fa-solid fa-pen"></i>
                  <span className="ml-1 font-medium">Escribir reseña</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="w-full px-2 py-1 flex flex-col">
          <p className="flex items-center justify-between">Sub total: <span>${formatPrice(order.total)}</span></p>
          <p className="flex items-center justify-between">Envío: <span>${formatPrice(withStandardShipping.length*500)}</span></p>
          <p className="flex items-center justify-between">Total: <span className="font-medium">${formatPrice((withStandardShipping.length*500) + order.total)}</span></p>
        </ul>
      </section>
    </main>
  )
}
