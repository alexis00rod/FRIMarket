import { useEffect, useState } from "react"
import { Breadcrumb, ProductsLayout, ProductsList, ProductsSort } from "../../components"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { getWishlist } from "../../services/firestore"

export const Wishlist = () => {
  const {userLogged} = useAuthContext()
  const [wishlist, setWishlist] = useState([])
  const {cardSize, setCardSize} = useCardSize()
  const {productsSort, setProductsSort} = useProductsSort()

  useEffect(() => {
    getWishlist(userLogged)
    .then(resp => setWishlist(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[userLogged])

  return (
    <>
      <Breadcrumb />
      <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
        <div className="w-full flex flex-col gap-4 grow">
          <div className="w-full px-2 py-2 flex items-center bg-white border border-gray-300 rounded-md">
            <h2 className="px-3 py-3 grow text-xl font-semibold">Lista de favoritos</h2>
            <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
            <ProductsLayout size={cardSize}  onChange={({target:{id}}) => setCardSize(id)} />
          </div>
          <section className="w-full">
            <ProductsList products={wishlist} sort={productsSort} size={cardSize} maxCols={5} />
          </section>
        </div>
      </main>
    </>
  )
}
