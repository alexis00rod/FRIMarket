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
      <main>
        <div className="w-full flex flex-col gap-4 grow">
          <div className="box flex items-center flex-wrap">
            <h2 className="px-1 md:px-2 py-1 md:py-2 grow text-lg font-medium">Lista de favoritos</h2>
            <div className="flex justify-end gap-2 md:gap-4 grow">
              <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
              <ProductsLayout size={cardSize} handle={setCardSize} />
            </div>
          </div>
          <section className="w-full">
            <ProductsList products={wishlist} sort={productsSort} size={cardSize} maxCols={5} />
          </section>
        </div>
      </main>
    </>
  )
}
