import { Navigate, Route, Routes } from "react-router-dom"
import { CheckoutContextProvider } from "../pages/CheckoutPage/context/CheckoutContext"
import { Checkout, CheckoutConfirm, CheckoutOrder, CheckoutPayment, CheckoutShipping, CheckoutUser } from "../pages"

export const CheckoutRoute = () => {
  return (
    <CheckoutContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/checkout/user" replace />} />
        <Route path="/" element={<Checkout />}>
          <Route path="/user" element={<CheckoutUser />} />
          <Route path="/shipping" element={<CheckoutShipping />} />
          <Route path="/payment" element={<CheckoutPayment />} />
          <Route path="/confirm" element={<CheckoutConfirm />} />
        </Route>
        <Route path="/order/:idOrder" element={<CheckoutOrder />}/>
      </Routes>
    </CheckoutContextProvider>
  )
}
