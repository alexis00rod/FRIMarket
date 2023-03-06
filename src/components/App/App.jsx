import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Cart, Home, Login, Post, ProductDetail, Profile, Shop, Signup } from "../../pages/index.js"
import { Footer, Navbar } from "../index.js"

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
            <Route path="/post" element={<Post />}></Route>
            <Route path="/product/:idProduct" element={<ProductDetail />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/profile/:idUser" element={<Profile />}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}
