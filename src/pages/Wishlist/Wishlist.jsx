import { useEffect, useState } from "react"
import { Breadcrumb, Element, ProductsLayout, ProductsList, SelectProductsSort, Main } from "../../components"
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
      <Main>
        <Element flex='flex-col md:flex-row md:items-center'>
          <h3 className="box-header text-lg font-semibold">Lista de favoritos</h3>
          <SelectProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
          <div className="absolute top-2 right-2 md:static px-2 py-1">
            <ProductsLayout size={cardSize} handle={setCardSize} />
          </div>
        </Element>
        <ProductsList products={wishlist} sort={productsSort} size={cardSize} maxCols={5} />
      </Main>
    </>  
  )
}
