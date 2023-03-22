import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Breadcrumb, Footer, Navbar, ProtectedRoutes } from "../index.js"
import { Cart, Checkout, Home, Login, Post, ProductDetail, Profile, Search, Sellers, Settings, SettingsPrivacity, SettingsProfile, Shop, Signup, Wishlist } from "../../pages/index.js"

export const App = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="bg-gray-50 font-poppins">
      <div className="min-h-screen flex flex-col">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop/:idCategory" element={<Shop />}></Route>
            <Route path="/post" element={<ProtectedRoutes><Post /></ProtectedRoutes>}></Route>
            <Route path="/product/:idDetail" element={<ProductDetail />}></Route>
            <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/profile/:idUser" element={<Profile />}></Route>
            <Route path="/wishlist" element={<ProtectedRoutes><Wishlist /></ProtectedRoutes>}></Route>
            <Route path="/search/:toSearch" element={<Search />}></Route>
            <Route path="/settings" element={<ProtectedRoutes><Settings /></ProtectedRoutes>}>
              <Route path="profile" element={<SettingsProfile />}></Route>
              <Route path="privacity" element={<SettingsPrivacity />}></Route>
            </Route>
            <Route path="/sellers" element={<Sellers />}></Route>
            <Route path="checkout" element={<ProtectedRoutes><Checkout /></ProtectedRoutes>}></Route>
          </Routes>
      </div>
      <Footer />
    </div>
  )
}
