import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { searchProducts } from "../../services/shop.js"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { ProductsLayout, ProductsList, ProductsSort } from "../../components"

export const Search = () => {
  const {toSearch} = useParams()
  const [productsFound, setProductsFound] = useState([])
  const {cardSize, setCardSize} = useCardSize()
  const {productsSort, setProductsSort} = useProductsSort()

  useEffect(() => {
    searchProducts(toSearch)
    .then(resp => setProductsFound(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[toSearch])

  return (
    <section className="search">
      <div className="search-controls">
        {/* Terminos de busqueda */}
        <div className="flex flex-col grow">
          <h2>"{toSearch}"</h2>
          <span className="text-sm">{productsFound.length} {productsFound.length > 1 ? 'resultados' : 'resultado'}</span>
        </div>
        {/* Productos orden */}
        <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
        {/* Productos layout */}
        <div className="search-controls-layout">
          <ProductsLayout size={cardSize} handle={setCardSize} />
        </div>
      </div>
      {/* Lista de productos */}
      <ProductsList products={productsFound} sort={productsSort} size={cardSize} maxCols={5} />
    </section>
  )
}
