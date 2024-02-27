import { useNavigate } from "react-router-dom"
import { CheckoutCard } from "../../components/"
import { useCheckoutContext } from "./context/CheckoutContext"
import { useProfile } from "../../hooks/useProfile"
import { useEffect } from "react"

export const CheckoutPayment = () => {
  const {checkoutOrder, setCheckoutOrder, validatePayment} = useCheckoutContext()
  const navigate = useNavigate()
  const {profile} = useProfile()

  useEffect(() => {
    profile &&
      setCheckoutOrder({
        ...checkoutOrder,
        payment: {
          cardName: profile.cardName,
          cardNumber: profile.carNumber,
          cardCvv: profile.cardCvv,
          cardExpirationDate: profile.cardExpirationDate
        }
      })
  },[profile])

  const submitCheckoutPayment = e => {
    e.preventDefault()
    const validate = validatePayment()
    if(validate) {
      navigate('/checkout/confirm')
    }
  }

  return (
    <div className="flex flex-col">
      <h4 className="mb-2 text-lg font-medium">Método de pago</h4>
      <div className="flex flex-col gap-4">
        <CheckoutCard />
      </div>
      <div className="mt-6 flex">
        <button className="btn btn-m btn-blue" onClick={submitCheckoutPayment}>
          <span className="text-sm font-medium">Continuar</span>
        </button>
      </div>
    </div>
  )
}
