import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Footer, Navbar, ProtectedRoutes } from "../index.js"
import { Cart, Checkout, Detail, EditProfile, Home, Orders, Profile, Search, Wishlist } from "../../pages/index.js"
import { CheckoutRoute, LoginRoute, PostRoute, RegistrationRoute, ShopRoute } from "../../routes/routes.js"

export const App = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <div className="app-page">
          <Routes>
            <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>}></Route>
            <Route path="/search/:toSearch" element={<Search />}></Route>
            <Route path="/editProfile" element={<ProtectedRoutes><EditProfile /></ProtectedRoutes>}></Route>
            <Route path="/profile/:idUser" element={<Profile />}></Route>
            
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:idDetail" element={<Detail />} />
            <Route path="/shop/*" element={<ShopRoute />}  />
            <Route path="/checkout/*" element={<ProtectedRoutes><CheckoutRoute /></ProtectedRoutes>} />
            <Route path="/post/*" element={<ProtectedRoutes><PostRoute /></ProtectedRoutes>} />
            <Route path="/wishlist" element={<ProtectedRoutes><Wishlist /></ProtectedRoutes>}></Route>
            <Route path="/orders" element={<ProtectedRoutes><Orders /></ProtectedRoutes>} ></Route>
            <Route path="/login/*" element={<LoginRoute />} />
            <Route path="/registration/*" element={<RegistrationRoute />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  )
}
