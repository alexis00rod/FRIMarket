import { useEffect, useState } from "react"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { getOrders } from "../../services/order"
import { Breadcrumb, Element, Loader, Main, SelectOrderSort } from "../../components"
import moment from "moment"

export const Orders = () => {
  const {userLogged} = useAuthContext()
  const [orders, setOrders] = useState([])
  const [ordersSort, setOrdersSort] = useState('new')
  
  useEffect(() => {
    getOrders(userLogged,ordersSort)
      .then(resp => setOrders(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[userLogged,ordersSort])

  if(!orders) return <Loader />

  return (
    <>
    <Breadcrumb />
    <Main>
      <Element flex='flex-col'>
        <div className="box-header box-header-underline flex flex-col gap-2">
          <div className="w-full flex items-center flex-wrap gap-4">
            <h3 className="grow text-lg font-semibold">Mis compras</h3>
            <SelectOrderSort selected={ordersSort} onChange={({target:{id}}) => setOrdersSort(id)} />
          </div>
          <div className="w-full grid grid-cols-4 gap-4">
            <span className="px-2 py-2 font-medium">ID</span>            
            <span className="px-2 py-2 font-medium">Fecha</span>            
            <span className="px-2 py-2 font-medium">Metodo de pago</span>            
            <span className="px-2 py-2 font-medium">Precio</span>            
          </div>
        </div>
        <div className="box-body flex flex-col divide-y divide gray-300">
          {orders.map(e => (
            <div className="w-full grid grid-cols-4 gap-4">
              <span className="px-2 py-2">{e.id}</span>
              <span className="px-2 py-2">{moment(e.date.toDate()).fromNow()}</span>
              <span className="px-2 py-2">Tarjeta de credito</span>
              <span className="px-2 py-2">${e.cart.total}</span>
            </div>
          ))}
        </div>
      </Element>
    </Main>
    </>
  )
}
