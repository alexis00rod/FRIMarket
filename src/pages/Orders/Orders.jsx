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
    <main className="flex flex-col grow">
      <section className="w-full max-w-[1200px] mx-auto px-2 py-4 flex flex-col gap-4">
        <div className="w-full p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-white border border-gray-300 rounded md">
          <h3 className="grow text-lg font-semibold">Mis compras</h3>
          <OrdersSort selected={ordersSort} onChange={({target:{id}}) => setOrdersSort(id)} />
        </div>
        <ul className="w-full flex flex-col gap-4">
          {orders.map(e => <OrderItem key={e.id} order={e} />)}
        </ul>
      </section>
    </main>
  )
}
