import { useEffect, useState } from "react"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { getWishlist } from "../../services/wishlist"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { ProductsLayout, ProductsList, ProductsSort, Loader } from "../../components"

export const Wishlist = () => {
  const {userLogged} = useAuthContext()
  const [wishlist, setWishlist] = useState()
  const {cardSize, setCardSize} = useCardSize()
  const {productsSort, setProductsSort} = useProductsSort()

  useEffect(() => {
    userLogged && getWishlist(userLogged,setWishlist)
  },[userLogged])

  if(!wishlist) return <Loader />

  return (
    <section className="section section-xl">
      <div className="products-controls wrapper">
        <h3 className="grow text-lg font-semibold">Lista de favoritos</h3>
        {/* Productos ordern */}
        <ProductsSort selected={productsSort} onChange={({target:{id}}) => setProductsSort(id)} />
        <div className="products-controls-layout">
          {/* Productos layout */}
          <ProductsLayout size={cardSize} handle={setCardSize} />
        </div>
      </div>
      {/* Lista de productos */}
      <ProductsList products={wishlist} sort={productsSort} size={cardSize} />
    </section>
  )
}
