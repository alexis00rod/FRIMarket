import { useCheckoutContext } from "../context/CheckoutContext"
import { InputEmail } from "../../../components"

export const CheckoutEmail = () => {
  const {checkoutOrder, setCheckoutOrder, checkoutOrderError} = useCheckoutContext()

  return (
    <div className="relative mt-6">
      <InputEmail
      label='Email'
      size='input-m'
      value={checkoutOrder.user?.email || ''} 
      onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder, user: {...checkoutOrder.user,email: value}})}
      required
      />
      {checkoutOrderError.includes('email') &&
        <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span className="pl-2 font-medium">Usá el formato nombre@ejemplo.com.</span>
        </p>}
    </div>
  )
}
