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

  return (
    <CheckoutContext.Provider value={{checkoutOrder, setCheckoutOrder, checkoutOrderError, setCheckoutOrderError,validateUser}}>
      {children}
    </CheckoutContext.Provider>
  )
}
