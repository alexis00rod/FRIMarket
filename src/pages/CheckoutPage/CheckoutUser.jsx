import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCheckoutContext } from "./context/CheckoutContext"
import { useProfile } from "../../hooks/useProfile"
import { InputEmail, InputText, Loader, Notification } from "../../components"
import { formatPhone } from "../../services/format"

export const CheckoutUser = () => {
  const navigate = useNavigate()
  const {checkoutOrder, setCheckoutOrder, checkoutOrderError, validateUser} = useCheckoutContext()
  const {profile} = useProfile()

  useEffect(() => {
    profile && 
      setCheckoutOrder({
        ...checkoutOrder,
        user: {
          email: profile.email,
          displayName: `${profile.name} ${profile.lastName}`,
          phone: profile.phone
        }
      })
  },[profile])

  const submitCheckoutUser = async e => {
    e.preventDefault()
    const validate = validateUser()
    if(validate) {
      navigate('/checkout/shipping')
    }
  }

  if(!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <h3>Datos personales</h3>
      <div className="checkout-inputs flex flex-col">
        {/* <CheckoutEmail /> */}
        <div className="checkout-input">
          <InputEmail
          label='Email'
          size='input-m'
          value={checkoutOrder.user?.email || ''} 
          onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder, user: {...checkoutOrder.user,email: value}})}
          required
          />
          {checkoutOrderError.includes('email') &&
            <Notification message='Usá el formato nombre@ejemplo.com.'/>}
        </div>
        {/* <CheckoutName /> */}
        <div className="checkout-input">
          <InputText 
          label='Nombre y apellido'
          size='input-m'
          value={checkoutOrder.user?.displayName || ''} 
          onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder, user: {...checkoutOrder.user,displayName: value}})}
          />
          {checkoutOrderError.includes('name') &&
            <Notification message='Ingresa tu nombre y apellido.'/>}
        </div>
        {/* <CheckoutPhone /> */}
        <div className="checkout-input">
          <InputText 
          label='Número de telefono'
          size='input-m'
          name='phone'
          id='phone'
          value={checkoutOrder.user?.phone || ''}
          onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder,user:{...checkoutOrder.user,phone:formatPhone(value)}})}
          />
          {checkoutOrderError.includes('phone') &&
            <Notification message='Ingresa tu número de contacto.'/>}
        </div>
      </div>
      <div className="checkout-buttons">
        <button 
        className="btn btn-m btn-blue btn-text" 
        disabled={!checkoutOrder.user?.email || !checkoutOrder.user?.displayName || !checkoutOrder.user?.phone} 
        onClick={submitCheckoutUser}
        >
          Continuar
        </button>
      </div>
    </>
  )
}
