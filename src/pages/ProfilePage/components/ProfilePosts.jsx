import { useEffect, useState } from "react"
import { getUserProducts } from "../../../services/shop.js"
import { useCardSize } from "../../../hooks/useCardSize.jsx"
import { useProductsSort } from "../../../hooks/useProductsSort.jsx"
import { Loader, ProductsLayout, ProductsList, ProductsSort } from "../../../components/index.js"

export const ProfilePosts = ({user}) => {
  const [posts, setPosts] = useState()
  const {cardSize, setCardSize} = useCardSize()
  const {productsSort, setProductsSort} = useProductsSort()

  useEffect(() => {
    getUserProducts(user)
     .then(resp => setPosts(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
     }))))
  },[user])

  if(!posts) return <Loader />

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full p-4 flex flex-wrap justify-between gap-4 bg-white border border-gray-300 rounded-md">
        <ProductsSort selected={productsSort} onChange={({target:{id}}) => setProductsSort(id)} />
        <ProductsLayout size={cardSize} handle={setCardSize} />
      </div>
      <ProductsList products={posts} sort={productsSort} size={cardSize} />
    </div>
  )
}
