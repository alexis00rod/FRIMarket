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
    <section className="wishlist">
      <div className="wishlist-controls">
        <h2>Lista de favoritos</h2>
        {/* Productos ordern */}
        <ProductsSort selected={productsSort} onChange={({target:{id}}) => setProductsSort(id)} />
        <div className="wishlist-controls-layout">
          {/* Productos layout */}
          <ProductsLayout size={cardSize} handle={setCardSize} />
        </div>
      </div>
      {/* Lista de productos */}
      <ProductsList products={wishlist} sort={productsSort} size={cardSize} />
    </section>
  )
}
