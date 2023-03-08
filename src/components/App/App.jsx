import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Cart, Home, Login, Post, ProductDetail, Profile, Search, Settings, Shop, Signup, Wishlist } from "../../pages/index.js"
import { Footer, Navbar, ProtectedRoutes } from "../index.js"

export const App = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="bg-gray-50 font-poppins">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop/:idCategory" element={<Shop />}></Route>
            <Route path="/post" element={<ProtectedRoutes><Post /></ProtectedRoutes>}></Route>
            <Route path="/product/:idProduct" element={<ProductDetail />}></Route>
            <Route path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/profile/:idUser" element={<Profile />}></Route>
            <Route path="/wishlist" element={<ProtectedRoutes><Wishlist /></ProtectedRoutes>}></Route>
            <Route path="/search/:toSearch" element={<Search />}></Route>
            <Route path="/settings" element={<ProtectedRoutes><Settings /></ProtectedRoutes>}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}
