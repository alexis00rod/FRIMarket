import { Route, Routes } from "react-router-dom"
import { ShopContextProvider } from "../pages/ShopPage/context/ShopContext"
import { Shop } from "../pages"

export const ShopRoute = () => {
  return (
    <ShopContextProvider>
      <Routes>
        <Route path='/' element={<Shop />}/>
        <Route path='/:idCategory' element={<Shop />}/>
        <Route path='/:idCategory/:idType' element={<Shop />}/>
      </Routes>
    </ShopContextProvider>
  )
}
