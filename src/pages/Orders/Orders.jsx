import { useEffect, useState } from "react"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { getOrders } from "../../services/order"
import { Loader, OrdersSort, OrderItem } from "../../components"

export const Orders = () => {
  const {userLogged} = useAuthContext()
  const [orders, setOrders] = useState()
  const [ordersSort, setOrdersSort] = useState('new')
  
  useEffect(() => {
    userLogged &&
      getOrders(userLogged,ordersSort)
        .then(resp => setOrders(resp.docs.map(e => ({
          id: e.id,
          ...e.data()
        }))))
  },[userLogged,ordersSort])

  if(!orders) return <Loader />

  return (
    <section className="orders">
      <div className="orders-controls">
        <h2>Mis compras</h2>
        <OrdersSort selected={ordersSort} onChange={({target:{id}}) => setOrdersSort(id)} />
      </div>
      <ul className="orders-list">
        {orders.map(e => <OrderItem key={e.id} order={e} />)}
      </ul>
    </section>
  )
}
