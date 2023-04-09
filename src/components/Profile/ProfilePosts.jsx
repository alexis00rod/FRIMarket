import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { Element, Loader, ProductsLayout, ProductsList, SelectProductsSort } from "../index.js"

export const ProfilePosts = ({posts}) => {
  const {cardSize, setCardSize} = useCardSize()
  const {productsSort, setProductsSort} = useProductsSort()

  if(!posts) return <Loader />

  return (
    <div className="w-full flex flex-col gap-4">
      <Element flex='flex-col md:flex-row md:items-center'>
        <h3 className='box-header flex flex-col  text-lg font-semibold'>
          Publicaciones
          <span className="w-max text-sm text-gray-500 font-normal">{posts.length} {posts.length > 1 ? 'resultados' : 'resultado'}</span>
        </h3>
        <SelectProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
        <div className="absolute top-2 right-2 md:static px-2 py-1">
          <ProductsLayout size={cardSize} handle={setCardSize} />
        </div>
      </Element>
      <ProductsList products={posts} sort={productsSort} size={cardSize} maxCols={4} />
    </div>
  )
}
