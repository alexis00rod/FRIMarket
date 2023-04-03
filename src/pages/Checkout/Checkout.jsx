import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext/CartContext'
import { useProfile } from '../../hooks/useProfile'
import { Button, InputEmail, InputNumber, InputText, Loader, SelectProvince, SelectCity, Main, Element} from '../../components'
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

  if(!profile && !cartList) return <Loader />

  return (
    <Main flex='wrap'>
      <Element flex='flex-col grow'>
        <h2 className="box-header box-header-underline grow text-lg font-medium">Tu orden</h2>
        <form className="box-body flex flex-col gap-2 divide-y divide-gray-300">
          <div className="w-full px-2 pt-2 pb-4 flex flex-col gap-4">
            <h4 className='font-medium'>Datos personales</h4>
            <div className='w-full flex flex-wrap gap-4'>
              <InputEmail 
              label='Email'
              size='input-m'
              id='email'
              name='email'
              // defaultValue={order.user.email} 
              onChange={handleOrder} 
              />
              <InputText 
              label='Nombre y apellido' 
              size='input-m' 
              id='displayName' 
              name='displayName' 
              // defaultValue={order.user.displayName} 
              onChange={handleOrder} 
              />
              
              <InputNumber 
              label='Numero de telefono'
              size='input-m'
              id='phone'
              name='phone'
              // defaultValue={order.user.phone} 
              onChange={handleOrder}
              />
            </div>
          </div>
          <div className="w-full px-2 py-4 flex flex-col gap-4">
            <h4 className='font-medium'>Datos de envio</h4>
            <div className='w-full flex flex-wrap gap-4'>
              <SelectProvince 
              label='Provincia' 
              // selected={order.user.province} 
              onChange={handleOrder} 
              />
              <SelectCity 
              label='Ciudad' 
              // selected={order.user.city} 
              // province={order.user.province} 
              onChange={handleOrder} 
              />
              <InputText 
              label='Direccion'
              size='input-m'
              id='address'
              name='address'
              // defaultValue={order.user.address} 
              onChange={handleOrder}
              />
              <InputNumber 
              label='Codigo postal'
              size='input-m'
              id='cp'
              name='cp'
              // defaultValue={order.user.cp} 
              onChange={handleOrder}
              />
            </div>
          </div>
          <div className="w-full px-2 pt-4 pb-2 flex flex-col gap-4">
            <h4 className='font-medium'>Metodo de pago</h4>
            <div className='w-full flex flex-wrap gap-4'>
              <InputNumber 
              label='Numero de tarjeta'
              size='input-m'
              id="cardNumber" 
              name="cardNumber" 
              // defaultValue={order.user.cardNumber}
              onChange={handleOrder}
              />
              <InputNumber 
              label='Fecha de expiracion'
              size='input-m'
              name="cardDate" 
              id="cardDate" 
              className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
              // defaultValue={order.user.cardDate}
              onChange={handleOrder}
              />
              <InputNumber 
              label='Codigo de seguridad'
              size='input-m'
              name="cardCVV" 
              id="cardCVV" 
              className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
              // defaultValue={order.user.cardCVV}
              onChange={handleOrder}
              />
            </div>
          </div>
        </form>
      </Element>
      <Element position='fixed bottom-0 left-0 lg:static' size='lg:max-w-md' flex='lg:flex-col items-center'>
        <div className="box-header box-header-underline hidden lg:flex items-center gap-2">
          <h3 className="grow text-lg font-medium">Carrito</h3>
          <Link to='/cart' className='btn btn-m btn-text btn-text-yellow'>Editar</Link>
        </div>
        <div className="box-body flex flex-col items-center gap-4">
          <div className="w-full flex flex-col">
            <p className='w-full flex items-center justify-between gap-2 font-medium'>Subtotal: 
              <span className='flex items-center text-yellow-500'>
                <span className='pr-1 text-xs text-gray-500 font-normal'>x{cartQty}</span>
                ${cartPriceTotal}
              </span>
            </p>
            <p className='w-full flex items-center justify-between gap-2 font-medium'>Envio: <span className='text-yellow-500'>${delivery}</span></p>
            <p className='w-full flex items-center justify-between gap-2 font-medium'>Total: <span className='text-lg text-yellow-500'>${cartPriceTotal + delivery}</span></p>  
          </div>
          <Button type='submit' icon='check' color='btn-green' size='btn-l' disabled={cartList.length === 0}>
            <span className="text-sm">Finalizar compra</span>
          </Button>
        </div>
      </Element>
    </Main>
  )
}
