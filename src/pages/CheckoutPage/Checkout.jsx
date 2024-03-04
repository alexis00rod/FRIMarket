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
  const {cartList, cartPriceTotal, cartQty, delivery, emptyCart} = useCartContext()
  const {checkoutOrder} = useCheckoutContext()
  const {profile} = useProfile()
  const navigate = useNavigate()
  const [checkoutLoader, setCheckoutLoader] = useState(false)

  const submitFinishBuy = async e => {
    e.preventDefault()
    setCheckoutLoader('loading')
    try {
      if(profile) {
        const user = profile.email
        const idOrder = await addOrder(user,{
          ...checkoutOrder,
          products: [...cartList],
          delivery: {...delivery},
          total: cartPriceTotal,
          qty: cartQty
        })
        await updateProduct([...cartList])
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
    <section className='checkout'>
      {!checkoutLoader && 
        <>
          <div className="checkout-form">
            <Outlet />
          </div>
          <div className='checkout-summary'>
            <h4>Resumen de compra</h4>
            <div className='checkout-summary-detail'>
              {/* Productos */}
              <p>Productos ({cartQty})<span>${formatPrice(cartPriceTotal)}</span></p>
              {/* Envio */}
              <p>Envio ({delivery.qty})<span>${formatPrice(delivery.price)}</span>
              </p>
              {/* Total */}
              <p>Total<span>${formatPrice(cartPriceTotal + delivery.price)}</span>
              </p>
            </div>
            {/* Finalizar compra */}
            {pathname === '/checkout/confirm' && profile &&
              <button className="mt-2 btn btn-m btn-green btn-text" onClick={submitFinishBuy}>
                <i className="fa-solid fa-check"></i>
                Finalizar compra
              </button>}
          </div>
        </>}
        {checkoutLoader === 'loading' &&
          <div className='checkout-loading'>
            <p className="text-center text-2xl font-medium">Procesando compra...</p>
          </div>}
        {checkoutLoader === 'finish' &&
          <div className='checkout-loading'>
            <i className="w-[50px] h-[50px] mb-2 flex items-center justify-center text-3xl bg-green-500 text-white rounded-full fa-solid fa-check"></i>
            <p className="text-xl font-medium">Tu orden fue recibida</p>
            <p className="text-gray-500">Gracias por tu compra</p>
          </div>}
    </section>
  )
}
