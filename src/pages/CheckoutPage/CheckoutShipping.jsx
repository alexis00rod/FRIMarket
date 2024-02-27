import { useNavigate } from "react-router-dom"
import { useProfile } from "../../hooks/useProfile"
import { CheckoutAddress, CheckoutLocation, Loader, Select } from "../../components"
import { useEffect } from "react"
import { useCheckoutContext } from "./context/CheckoutContext"
import { useLocations } from "../../hooks/useLocations"

export const CheckoutShipping = () => {
  const navigate = useNavigate()
  const {checkoutOrder, setCheckoutOrder, validateShipping} = useCheckoutContext()
  const {profile} = useProfile()
  const {locations} = useLocations()

  useEffect(() => {
    profile &&
      setCheckoutOrder({
        ...checkoutOrder,
        shipping: {
          address: {
            street: profile.address?.street,
            number: profile.address?.number,
            apartment: profile.address?.apartment,
            postalCode: profile.address?.postalCode
          },
          province: {
            id: profile.province?.id,
            name: profile.province?.name
          },
          city: {
            id: profile.city?.id,
            name: profile.city?.name
          },
        }
      })
  },[profile])

  const submitCheckoutShipping = async e => { 
    e.preventDefault()

    const validate = validateShipping()
    if(validate) {
      navigate('/checkout/payment')
    }
  }

  if(!profile && !locations) return <Loader />

  return (
    <>
      <h4 className="mb-2 text-lg font-medium">Datos de envío</h4>
      <div className="flex flex-col gap-4">
        <CheckoutLocation locations={locations} />
        <CheckoutAddress />
      </div>
      <div className="mt-6 flex">
        <button className="btn btn-m btn-blue" onClick={submitCheckoutShipping}>
          <span className="text-sm font-medium">Continuar</span>
        </button>
      </div>
    </>
  )
}
