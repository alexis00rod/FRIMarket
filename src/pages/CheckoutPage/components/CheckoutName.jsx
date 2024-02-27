import { useCheckoutContext } from "../context/CheckoutContext"
import { InputText } from "../../../components"

export const CheckoutName = () => {
  const {checkoutOrder, setCheckoutOrder, checkoutOrderError} = useCheckoutContext()

  return (
    <div className="relative mt-6">
      <InputText 
      label='Nombre y apellido'
      size='input-m'
      value={checkoutOrder.user?.displayName || ''} 
      onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder, user: {...checkoutOrder.user,displayName: value}})}
      />
      {checkoutOrderError.includes('name') &&
        <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="pl-2 font-medium">Ingresa tu nombre y apellido.</span>
        </p>}
    </div>
  )
}
