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
    <div className="bg-gray-50 font-poppins">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop/:idCategory" element={<Shop />}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}
