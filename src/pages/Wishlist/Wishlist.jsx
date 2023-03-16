import { useEffect, useState } from "react"
import { ProductsLayout } from "../../components"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { getWishlist } from "../../services/firestore"

export const Wishlist = () => {
  const {userLogged} = useAuthContext()
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    getWishlist(userLogged)
    .then(resp => setWishlist(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[userLogged])

  return (
    <div className="w-full flex flex-col gap-4 grow">
      <div className="w-full px-2 py-2 bg-white border border-gray-300 rounded-md">
        <h2 className="px-3 py-3 text-xl font-semibold">Lista de favoritos</h2>
      </div>
      <section className="w-full">
        <ProductsLayout products={wishlist} layout='grid' sort='postDate' />
      </section>
    </div>
  )
}
