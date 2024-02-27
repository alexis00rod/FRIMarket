import { useState, createContext, useContext, useEffect } from 'react'

const CheckoutContext = createContext()
export const useCheckoutContext = () => useContext(CheckoutContext)

export const CheckoutContextProvider = ({children}) => {
  const [checkoutOrder, setCheckoutOrder] = useState(() => {
    const storedCheckoutOrder = localStorage.getItem('checkoutOrder')
    return storedCheckoutOrder ? JSON.parse(storedCheckoutOrder) : {}
  })

  useEffect(() => {
    localStorage.setItem('checkoutOrder', JSON.stringify(checkoutOrder))
  }, [checkoutOrder]);

  const [checkoutOrderError, setCheckoutOrderError] = useState([])

  const validateUser = () => {
    const err = []

    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (!emailFormat.test(checkoutOrder.user.email)) {
      err.push('email')
    }

    if(!checkoutOrder.user.displayName) {
      err.push('name')
    }

    if(!checkoutOrder.user.phone) {
      err.push('phone')
    }

    setCheckoutOrderError(err)
    return !err.length
  }

  const validateShipping = () => {
    const err = []

    if(!checkoutOrder.shipping.city.id) {
      err.push('city')
    }

    if(!checkoutOrder.shipping.address.street) {
      err.push('street')
    }

    if(!checkoutOrder.shipping.address.number) {
      err.push('number')
    }

    if(!checkoutOrder.shipping.address.postalCode) {
      err.push('pc')
    }

    setCheckoutOrderError(err)
    return !err.length
  }

  const validatePayment = () => {
    const err = []

    if(!checkoutOrder.payment.cardName) {
      err.push('cardName')
    }
    if(!checkoutOrder.payment.cardNumber) {
      err.push('cardNumber')
    }

    if(!checkoutOrder.payment.cardCvv) {
      err.push('cardCvv')
    }

    if(!checkoutOrder.payment.cardExpirationDate) {
      err.push('cardExpirationDate')
    }
    

    setCheckoutOrderError(err)
    return !err.length
  }

  return (
    <CheckoutContext.Provider value={{checkoutOrder, setCheckoutOrder, checkoutOrderError, setCheckoutOrderError,validateUser, validateShipping, validatePayment}}>
      {children}
    </CheckoutContext.Provider>
  )
}
