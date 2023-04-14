import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { searchProducts } from "../../services/shop.js"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { Element, ProductsLayout, ProductsList, SelectProductsSort, Main } from "../../components"

export const Search = () => {
  const {toSearch} = useParams()
  const [productsFound, setProductsFound] = useState([])
  const {cardSize, setCardSize} = useCardSize()
  const {productsSort, setProductsSort} = useProductsSort()

  useEffect(() => {
    searchProducts(toSearch)
    .then(resp => setProductsFound(resp))
  },[toSearch])
  
  return (
    <Main>
      <Element flex='flex-col md:flex-row md:items-center'>
        <h3 className='box-header flex flex-col text-lg font-semibold'>"{toSearch}"
          <span className="w-max text-sm text-gray-500 font-normal">{productsFound.length} {productsFound.length > 1 ? 'resultados' : 'resultado'}</span>
        </h3>
        <SelectProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
        <div className="absolute top-2 right-2 md:static px-2 py-1">
          <ProductsLayout size={cardSize} handle={setCardSize} />
        </div>
      </Element>
      <ProductsList products={productsFound} sort={productsSort} size={cardSize} maxCols={5} />
    </Main>
  )
}
