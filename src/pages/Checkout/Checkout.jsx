import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext/CartContext'
import { useProfile } from '../../hooks/useProfile'
import { Button, Loader, Main, Element, CheckoutInformation, CheckoutShipping, CheckoutPayment} from '../../components'
import { addOrder, updateProduct, updateUserSales } from '../../services/firestore'

export const Checkout = () => {
  const {profile} = useProfile()
  const {cartList, cartPriceTotal, cartQty, delivery, emptyCart} = useCartContext()
  const [order, setOrder] = useState()
  const navigate = useNavigate()
  
  useEffect(() => {
    profile && setOrder({...order,
      user: {
        displayName: profile.displayName,
        email: profile.email,
        phone: profile.phone,
      },
      shipping: {
        province: profile.province,
        city: profile.city,
        address: profile.address,
        cp: profile.cp,
      },
      cart:{
        products: cartList,
        delivery: delivery,
        priceTotal: cartPriceTotal + delivery
      },
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

    updateUserSales(order.cart.products)
    updateProduct(order.cart.products)
    addOrder(order)
      .then(resp => navigate(`/checkout/${resp}`))
    emptyCart()

  }

  if(!order) return <Loader />

  return (
    <Main flex='wrap'>
      <Element flex='flex-col grow'>
        <h2 className="box-header box-header-underline grow text-lg font-medium">Tu orden</h2>
        <form className="w-full flex flex-col divide-y divide-gray-300 gap-2">
          <CheckoutInformation initial={order.user} onChange={handleOrder} />
          <CheckoutShipping initial={order.shipping} onChange={handleOrder} />
          <CheckoutPayment onChange={({target:{name,value}}) => setOrder({...order,payment:{[name]:value}})} />
        </form>
      </Element>
      <Element position='fixed bottom-0 left-0 lg:static z-10' size='lg:max-w-md' flex='lg:flex-col items-center'>
        <div className="box-body flex flex-col">
          <p className='w-full flex items-center lg:justify-between gap-2 font-medium'>Subtotal: 
            <span className='flex items-center text-yellow-500'>
              <span className='pr-1 text-xs text-gray-500 font-normal'>x{cartQty}</span>
              ${cartPriceTotal}
            </span>
          </p>
          <p className='w-full flex items-center lg:justify-between gap-2 font-medium'>Envio: <span className='text-yellow-500'>${delivery}</span></p>
          <p className='w-full flex items-center lg:justify-between gap-2 font-medium'>Total: <span className='text-lg text-yellow-500'>${cartPriceTotal + delivery}</span></p>  
        </div>
        <div className='w-max lg:w-full px-2 py-2 flex flex-col lg:flex-row justify-between flex-none items-center gap-2 '>
          <Link to='/shop/all' className='btn btn-text-yellow btn-text btn-m text-sm font-medium'>Volver a la tienda</Link>
          <Button icon='check' color='btn-green' size='btn-m' disabled={cartList.length < 1} onClick={submitOrder}>
            <span className="text-sm font-medium">Finalizar compra</span>
          </Button>
        </div>
      </Element>
    </Main>
  )
}
