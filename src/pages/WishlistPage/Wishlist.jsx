import { useEffect, useState } from "react"
import { Breadcrumb, Element, ProductsLayout, ProductsList, SelectProductsSort, Main, ProductsSort, Loader } from "../../components"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { getWishlist } from "../../services/wishlist"

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
   <main className="flex flex-col grow">
    <section className="w-full max-w-[1200px] mx-auto px-2 py-4 flex flex-col gap-4">
      <div className="relative w-full p-4 flex flex:col md:flex-row md:items-center bg-white border border-gray-300 rounded md">
        <h3 className="grow text-lg font-semibold">Lista de favoritos</h3>
        <ProductsSort selected={productsSort} onChange={({target:{id}}) => setProductsSort(id)} />
        <div className="absolute top-2 right-2 md:static px-2 py-1">
          <ProductsLayout size={cardSize} handle={setCardSize} />
        </div>
      </div>
      <ProductsList products={wishlist} sort={productsSort} size={cardSize} />
    </section>
   </main> 
  )
}
