import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext/CartContext'
import { useProfile } from '../../hooks/useProfile'
import { InputAddress, InputCP, InputDisplayName, InputEmail, InputPhone, Loader, SelectCity, SelectProvince } from '../../components'


export const Checkout = () => {
  const {profile} = useProfile()
  const {cartList, cartPriceTotal, cartQty, delivery} = useCartContext()
  const [order, setOrder] = useState({})

  const submitOrder = e => {
    e.preventDefault()
    console.log({
      user:{
        displayName: profile.displayName,
        email: profile.email,
        phone: profile.phone,
        province: profile.province,
        city: profile.city,
        address: profile.address,
        cp: profile.cp,
        // cardNumber: profile.cardNumber,
        // cardDate: profile.cardDate,
        // cardCVV: profile.cardCVV,
      },
      cart: {
        cartList,
        cartPriceTotal,
        cartQty
      }
    })
  }

  return (
    <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
      <form className="w-full flex gap-4" onSubmit={submitOrder}>
        {profile
        ? <>
            <section className='flex flex-col gap-4 grow'>
              <div className="w-full h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
                <h2 className="px-2 py-2 text-lg font-semibold capitalize">Datos personales</h2>
                <div className='w-full flex flex-col'>
                  <InputDisplayName defaultValue={profile.displayName} onChange={({target: {name,value}}) => setOrder({...order,[name]:value})} />
                  <InputEmail defaultValue={profile.email} onChange={({target: {name,value}}) => setOrder({...order,[name]:value})} />
                  <InputPhone defaultValue={profile.phone} onChange={({target: {name,value}}) => setOrder({...order,[name]:value})} />
                </div>
              </div>
              <div className="w-full h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
                <h2 className="px-2 py-2 text-lg font-semibold capitalize">Datos de envio</h2>
                <div>
                  <SelectProvince selected={profile.province} onChange={({target: {name,value}}) => setOrder({...order,[name]:value})} />
                  <SelectCity selected={profile.city} onChange={({target: {name,value}}) => setOrder({...order,[name]:value})} />
                  <InputAddress defaultValue={profile.address} onChange={({target: {name,value}}) => setOrder({...order,[name]:value})} />
                  <InputCP defaultValue={profile.cp} onChange={({target: {name,value}}) => setOrder({...order,[name]:value})} />
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
                    defaultValue={profile.cardNumber}
                    onChange={({target: {name,value}}) => setOrder({...order,[name]:value})}
                    />
                  </div>
                  <div className="px-2 py-2 flex flex-col">
                    <label htmlFor='cardDate' className="px-1 text-sm font-medium">Fecha de expiracion</label>
                    <input 
                    type="number" 
                    name="cardDate" 
                    id="cardDate" 
                    className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                    defaultValue={profile.cardDate}
                    onChange={({target: {name,value}}) => setOrder({...order,[name]:value})}
                    />
                  </div>
                  <div className="px-2 py-2 flex flex-col">
                    <label htmlFor='cardCVV' className="px-1 text-sm font-medium">Codigo de seguridad</label>
                    <input 
                    type="number" 
                    name="cardCVV" 
                    id="cardCVV" 
                    className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                    defaultValue={profile.cardCVV}
                    onChange={({target: {name,value}}) => setOrder({...order,[name]:value})}
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
            className="w-full max-w-btn h-8 px-2 flex items-center gap-2 bg-green-500 text-white rounded-md"
            // onClick={submitOrder}
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
