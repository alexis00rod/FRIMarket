import { useCheckoutContext } from "../context/CheckoutContext"
import { formatPhone } from "../../../services/format"
import { InputText } from "../../../components"

export const CheckoutPhone = () => {
  const {checkoutOrder, setCheckoutOrder, checkoutOrderError} = useCheckoutContext()

  return (
    <div className="relative mt-6">
      <InputText 
      label='Número de telefono'
      size='input-m'
      name='phone'
      id='phone'
      value={checkoutOrder.user?.phone || ''}
      onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder,user:{...checkoutOrder.user,phone:formatPhone(value)}})}
      />
      {checkoutOrderError.includes('phone') &&
        <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="pl-2 font-medium">Ingresa tu número de contacto.</span>
        </p>}
    </div>
  )
}
