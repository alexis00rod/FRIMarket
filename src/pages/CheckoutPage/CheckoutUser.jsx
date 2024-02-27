import { useNavigate } from "react-router-dom"
import { CheckoutEmail, CheckoutName, CheckoutPhone, InputText, Loader } from "../../components"
import { useCheckoutContext } from "./context/CheckoutContext"
import { useProfile } from "../../hooks/useProfile"
import { useEffect } from "react"

export const CheckoutUser = () => {
  const navigate = useNavigate()
  const {checkoutOrder, setCheckoutOrder, validateUser} = useCheckoutContext()
  const {profile} = useProfile()

  useEffect(() => {
    profile && 
      setCheckoutOrder({
        ...checkoutOrder,
        user: {
          email: profile.email,
          displayName: profile.displayName,
          phone: profile.phone
        }
      })
  },[profile])

  const submitCheckoutUser = e => {
    e.preventDefault()
    const validate = validateUser()
    if(validate) {
      navigate('/checkout/shipping')
    }
  }

  if(!profile) return <Loader />

  return (
    <>
      <h4 className="mb-2 text-lg font-medium">Datos personales</h4>
      <div className="flex flex-col gap-4">
        <CheckoutEmail />
        <CheckoutName />
        <CheckoutPhone />
      </div>
      <div className="mt-6 flex">
        <button className="btn btn-m btn-blue" onClick={submitCheckoutUser}>
          <span className="text-sm font-medium">Continuar</span>
        </button>
      </div>
    </>
  )
}
