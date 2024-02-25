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
    <main className="flex flex-col grow">
      <section className="w-full max-w-[1200px] px-2 py-4 mx-auto flex flex-col gap-4">
        <div className="relative w-full p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-white border border-gray-300 rounded-md">
          {/* Terminos de busqueda */}
          <div className="flex flex-col grow">
            <h3 className="text-lg font-semibold">"{toSearch}"</h3>
            <span className="w-max px-1 text-sm text-gray-500 font-normal">{productsFound.length} {productsFound.length > 1 ? 'resultados' : 'resultado'}</span>
          </div>
          {/* Productos orden */}
          <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
          {/* Productos layout */}
          <div className="absolute top-4 right-4 md:static">
            <ProductsLayout size={cardSize} handle={setCardSize} />
          </div>
        </div>
        {/* Lista de productos */}
        <ProductsList products={productsFound} sort={productsSort} size={cardSize} maxCols={5} />
      </section>
    </main>
  )
}
