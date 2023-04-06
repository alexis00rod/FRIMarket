import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useProfile } from "../../hooks/useProfile"
import { getOrder } from "../../services/firestore"
import { formatDate } from "../../services/formatDate"
import { Element, Loader, Main } from "../../components"
import moment from "moment"

export const Order = () => {
  const {idOrder} = useParams()
  const {profile} = useProfile()
  const [order, setOrder] = useState()

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
    <Main size='main-size-medium'>
      <Element flex='flex-col gap-4'>
        <div className="box-header flex flex-col items-center">
          <i className="w-12 h-12 mb-2 flex items-center justify-center text-3xl bg-green-500 text-white rounded-md fa-solid fa-check"></i>
          <h3 className="text-xl font-medium">Tu orden fue recibida</h3>
          <h4 className="text-gray-500">Gracias por tu compra</h4>
        </div>
        <div className="box-body flex flex-col divide-y divide-gray-300">
          <h3 className="px-2 py-2 text-lg font-medium">Detalles de la orden</h3>
          <ul className="w-full px-2 py-2 flex flex-col">
            <li className="flex items-center justify-between">Id: <span>{order.id}</span></li>
            <li className="flex items-center justify-between">Fecha: <span>{moment(order.date.toDate()).fromNow()}</span></li>
            <li className="flex items-center justify-between">Metodo de pago: <span>Tarjeta de credito</span></li>
          </ul>
          <ul className="w-full px-2 py-2 flex flex-col">
            {order.cart.products.map(e => (
              <li key={e.id} className='w-full flex items-center justify-between gap-2'>
                <h4>{e.qty}x {e.name}</h4>
                <h5>${e.price * e.qty}</h5>
              </li>
            ))}
          </ul>
          <ul className="w-full px-2 pt-2 flex flex-col items-end">
            <span>Sub total: ${order.cart.priceTotal}</span>
            <span>Envio: ${order.cart.delivery}</span>
            <span>Total: ${order.cart.priceTotal + order.cart.delivery}</span>
          </ul>
        </div>
        <Link to='/shop/all' className="w-max h-8 px-2 mx-auto flex items-center text-yellow-500 hover:underline">Volver a la tienda</Link>
      </Element>
    </Main>
  )
}
