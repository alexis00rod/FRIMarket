import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext/CartContext'
import { useProfile } from '../../hooks/useProfile'
import { InputAddress, InputCP, InputDisplayName, InputEmail, InputPhone, Loader, SelectCity, SelectProvince } from '../../components'
import { addOrder, updateProduct } from '../../services/firestore'

export const Checkout = () => {
  const {profile} = useProfile()
  const {cartList, cartPriceTotal, cartQty, delivery, emptyCart} = useCartContext()
  const [order, setOrder] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    profile && setOrder({...order,
      user:{
        idUser: profile.idUser,
        displayName: profile.displayName,
        email: profile.email,
        phone: profile.phone,
        province: profile.province,
        city: profile.city,
        address: profile.address,
        cp: profile.cp,
      },
      cart:{
        cartList,
        cartPriceTotal,
        cartQty,
        delivery
      }
    })
  },[profile])

  const handleOrder = ({target:{name,value,id}}) => {
    setOrder({
      ...order,
      user: {
        ...order.user,
        [name]: 
          name === 'phone' || name === 'cp' 
          ? parseInt(value) 
          : name === 'province' || name === 'city'
            ? id
            : value
      }
    })
  }
  
  const submitOrder = e => {
    e.preventDefault()
    addOrder(order)
    .then(resp => navigate(`/checkout/${resp}`))
    updateProduct(cartList)
    emptyCart()
  }

  return (
    <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
      <form className="w-full flex gap-4" onSubmit={submitOrder}>
        {order
        ? <>
            <section className='flex flex-col gap-4 grow'>
              <div className="w-full h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
                <h2 className="px-2 py-2 text-lg font-semibold capitalize">Datos personales</h2>
                <div className='w-full flex flex-col'>
                  <InputDisplayName defaultValue={order.user.displayName} onChange={handleOrder} />
                  <InputEmail defaultValue={order.user.email} onChange={handleOrder} />
                  <InputPhone defaultValue={order.user.phone} onChange={handleOrder} />
                </div>
              </div>
              <div className="w-full h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
                <h2 className="px-2 py-2 text-lg font-semibold capitalize">Datos de envio</h2>
                <div>
                  <SelectProvince selected={order.user.province} onChange={handleOrder} />
                  <SelectCity selected={order.user.city} province={order.user.province} onChange={handleOrder} />
                  <InputAddress defaultValue={order.user.address} onChange={handleOrder} />
                  <InputCP defaultValue={order.user.cp} onChange={handleOrder} />
                </div>
              </div>
              <div className="w-full h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
                <h2 className="px-2 py-2 text-lg font-semibold capitalize">Metodo de pago</h2>
                {/* <div>
                  <div className="px-2 py-2 flex flex-col">
                    <label htmlFor='cardNumber' className="px-1 text-sm font-medium">Numero de tarjeta</label>
                    <input 
                    type="number" 
                    name="cardNumber" 
                    id="cardNumber" 
                    className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                    defaultValue={order.user.cardNumber}
                    onChange={handleOrder}
                    />
                  </div>
                  <div className="px-2 py-2 flex flex-col">
                    <label htmlFor='cardDate' className="px-1 text-sm font-medium">Fecha de expiracion</label>
                    <input 
                    type="number" 
                    name="cardDate" 
                    id="cardDate" 
                    className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                    defaultValue={order.user.cardDate}
                    onChange={handleOrder}
                    />
                  </div>
                  <div className="px-2 py-2 flex flex-col">
                    <label htmlFor='cardCVV' className="px-1 text-sm font-medium">Codigo de seguridad</label>
                    <input 
                    type="number" 
                    name="cardCVV" 
                    id="cardCVV" 
                    className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                    defaultValue={order.user.cardCVV}
                    onChange={handleOrder}
                    />
                  </div>
                </div> */}
              </div>
            </section>
          </>
        : <div className="w-full px-2 py-2">
            <Loader />
          </div>
        }
        <aside className="w-full max-w-lg h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
          <div className="px-2 py-2 flex items-center gap-2">
            <h2 className="text-xl font-semibold capitalize">Carrito</h2>
            <Link to='/cart' className='px-2 text-sm text-yellow-500 font-medium hover:underline'>Editar</Link>
          </div>
          <div className="w-full flex flex-col">
            {cartList.map(e => (
              <div key={e.id} className="px-2 py-2 flex items-center gap-2">
                <img src={e.thumb} alt={e.idProduct} className='w-16 h-16 flex flex-none object-cover rounded-md' />
                <div className="flex flex-col grow">
                  <h4 className='px-1 py-1 font-medium'>{e.name}</h4>
                  <p className='px-1 py-1 flex items-center gap-2'>
                    <span>x{e.qty}</span>
                    <span className='text-yellow-500 font-medium'>${e.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='px-2 py-2 flex flex-col gap-2'>
            <div className='px-1 py-1'>
              <h3 className='flex items-center gap-2 font-medium'>Subtotal: 
                <span className='flex items-center gap-2 text-yellow-500'>${cartPriceTotal} 
                  <span className='text-xs text-gray-500 font-normal'>({cartQty} Productos)</span>
                </span>
              </h3>
              <h3 className='flex items-center gap-2 font-medium'>Envio: <span className='text-yellow-500'>${delivery}</span></h3>
              <h3 className='flex items-center gap-2 font-medium'>Total: <span className='text-lg text-yellow-500'>${cartPriceTotal + delivery}</span></h3>
            </div>
            <button 
            className="w-full max-w-btn h-8 px-2 flex items-center gap-2 bg-green-500 text-white rounded-md disabled:bg-green-400"
            disabled={cartList.length === 0}
            >
              <i className="fa-solid fa-check"></i>
              <span className="text-sm">Finalizar compra</span>
            </button>
          </div>
        </aside>
      </form>
    </main>
  )
}
