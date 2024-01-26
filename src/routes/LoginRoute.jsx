import { Route, Routes } from "react-router-dom"
import { LoginContextProvider } from "../context/LoginContext/LoginContext"
import { EnterPass, Login } from "../pages"

export const LoginRoute = () => {
  return (
    <LoginContextProvider>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/enter-pass" element={<EnterPass />}/>
      </Routes>
    </LoginContextProvider>
  )
}
