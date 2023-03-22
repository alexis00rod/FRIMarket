import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext/AuthContext'
import { useCartContext } from '../../context/CartContext/CartContext'


export const Checkout = () => {
  const {userLoggedProfile} = useAuthContext()
  const {cartList, cartPriceTotal, cartQty} = useCartContext()


  // console.log(userLoggedProfile)
  // console.log(cartList)
  // console.log(cartPriceTotal)
  // console.log(cartQty)

  const delivery = 500

  return (
    <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
      <section className="w-full flex gap-4">
        <div className="flex flex-col grow gap-4">
          <div className="w-full h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
            <h2 className="px-2 py-2 text-lg font-semibold capitalize">Datos personales</h2>
            <form className='w-full flex flex-col'>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='name' className="px-1 text-sm font-medium">Nombre y apellido</label>
                <input 
                type="text" 
                name="name" 
                id="name" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='email' className="px-1 text-sm font-medium">Email</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='phone' className="px-1 text-sm font-medium">Telefono</label>
                <input 
                type="number" 
                name="phone" 
                id="phone" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
            </form>
          </div>
          <div className="w-full h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
            <h2 className="px-2 py-2 text-lg font-semibold capitalize">Direccion</h2>
            <form>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='location' className="px-1 text-sm font-medium">Ubicacion</label>
                <input 
                type="text" 
                name="location" 
                id="location" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='city' className="px-1 text-sm font-medium">Ciudad</label>
                <input 
                type="text" 
                name="city" 
                id="city" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='street' className="px-1 text-sm font-medium">Direccion</label>
                <input 
                type="text" 
                name="street" 
                id="street" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='cp' className="px-1 text-sm font-medium">Codigo postal</label>
                <input 
                type="number" 
                name="cp" 
                id="cp" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
            </form>
          </div>
          <div className="w-full h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
            <h2 className="px-2 py-2 text-lg font-semibold capitalize">Metodo de pago</h2>
            <form>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='cardNumber' className="px-1 text-sm font-medium">Numero de tarjeta</label>
                <input 
                type="number" 
                name="cardNumber" 
                id="cardNumber" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='cardExpiration' className="px-1 text-sm font-medium">Fecha de expiracion</label>
                <input 
                type="number" 
                name="cardExpiration" 
                id="cardExpiration" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="px-2 py-2 flex flex-col">
                <label htmlFor='cardCVV' className="px-1 text-sm font-medium">Codigo de seguridad</label>
                <input 
                type="number" 
                name="cardCVV" 
                id="cardCVV" 
                className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="w-full max-w-lg h-max px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
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
            <button className="w-full max-w-btn h-8 px-2 flex items-center gap-2 bg-green-500 text-white rounded-md">
              <i className="fa-solid fa-check"></i>
              <span className="text-sm">Finalizar compra</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
