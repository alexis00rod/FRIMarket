import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import { useCartContext } from '../../context/CartContext/CartContext'
import { useCheckoutContext } from './context/CheckoutContext'
import { addOrder } from '../../services/order'
import { formatPrice } from '../../services/format'
import { updateProduct } from '../../services/shop'
import { useProfile } from '../../hooks/useProfile'
import { Loader } from '../../components'

export const Checkout = () => {
  const {pathname} = useLocation()
  const {cartList, cartPriceTotal, cartQty, emptyCart} = useCartContext()
  const {checkoutOrder} = useCheckoutContext()
  const {profile} = useProfile()
  const navigate = useNavigate()
  const [checkoutLoader, setCheckoutLoader] = useState(false)

  const withStandardShipping = cartList.filter(e => e.shipping === 'standard')

  const submitFinishBuy = async e => {
    e.preventDefault()
    setCheckoutLoader('loading')
    const order = {
      ...checkoutOrder,
      apartment: checkoutOrder.shipping.address.apartment || '',
      products: [
        ...cartList,
      ],
      total: cartPriceTotal,
      qty: cartQty
    }
    try {
      if(profile) {
        const user = profile.email
        const idOrder = await addOrder(user,order)
        await updateProduct(order.products)
        setCheckoutLoader('finish')
        setTimeout(() => {
          emptyCart()
          navigate(`/checkout/order/${idOrder}`)
        }, 1000)
      }
    } catch (err) {
      alert(err)
      setCheckoutLoader()
    }
  }

  if(!profile) return <Loader />

  return (
    <main className='flex flex-col grow'>
      {!checkoutLoader &&
      <section className='w-full max-w-[1200px] px-2 py-4 mx-auto flex flex-col lg:flex-row gap-4'>
        <div className="p-4 flex flex-col grow bg-white border border-gray-300 rounded-md">
          <Outlet />
        </div>
        <div className='w-full lg:w-[300px] h-max p-4 flex flex-col items-center flex-none gap-2 bg-white border border-gray-300 rounded-md'>
          <h3 className="text-lg font-medium">Resumen de compra</h3>
          <div className='w-full flex flex-col'>
            {/* Productos */}
            <p className='px-2 w-full flex items-center justify-between leading-6'>
              Productos ({cartQty})
              <span>${formatPrice(cartPriceTotal)}</span>
            </p>
            {/* Envio */}
            <p className='px-2 w-full flex items-center justify-between leading-6'>
              Envio ({withStandardShipping.length})
              <span>${formatPrice(withStandardShipping.length*500)}</span>
            </p>
            {/* Total */}
            <p className='mt-1 px-2 w-full flex items-center justify-between leading-6'>
              Total
              <span className='text-lg text-yellow-500 font-medium'>${formatPrice(cartPriceTotal + (withStandardShipping.length*500))}</span>
            </p>
          </div>
          {/* Volver a la tienda */}
          <Link to='/shop' className='btn btn-m btn-blue'>
            <i className="fa-solid fa-shop"></i>
            <span className='text-sm font-medium'>Volver a la tienda</span>
          </Link>
          {/* Finalizar compra */}
          {pathname === '/checkout/confirm' && profile &&
            <button className="btn btn-m btn-green" onClick={submitFinishBuy}>
              <i className="fa-solid fa-check"></i>
              <span className="text-sm font-medium">Finalizar compra</span>
            </button>}
        </div>
      </section>}
      {checkoutLoader === 'loading' &&
        <div className='w-full md:max-w-[26rem] md:h-[26rem] mx-auto md:mt-12 flex items-center justify-center flex-col grow md:grow-0 bg-white border border-gray-300 rounded-md'>
          <p className="text-center text-2xl font-medium">Procesando compra...</p>
        </div>}
        {checkoutLoader === 'finish' &&
          <div className='w-full md:max-w-[26rem] md:h-[26rem] mx-auto md:mt-12 flex items-center justify-center flex-col grow md:grow-0 bg-white border border-gray-300 rounded-md'>
            <i className="w-[50px] h-[50px] mb-2 flex items-center justify-center text-3xl bg-green-500 text-white rounded-full fa-solid fa-check"></i>
            <p className="text-xl font-medium">Tu orden fue recibida</p>
            <p className="text-gray-500">Gracias por tu compra</p>
          </div>}
    </main>
  )
}
