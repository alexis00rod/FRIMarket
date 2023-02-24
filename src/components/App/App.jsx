import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home, Shop } from "../../pages/index.js"
import { Footer, Navbar } from "../index.js"

export const App = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="bg-gray-200 font-poppins">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="w-full max-w-screen-2xl mx-auto grow">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}
