import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Breadcrumb, BreadcrumbLink, ProductsLayout, ProductsList, ProductsSort } from "../../components"
import { useCardSize } from "../../hooks/useCardSize"
import { useProductsSort } from "../../hooks/useProductsSort"
import { searchProducts } from "../../services/firestore"

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
    <>
      <Breadcrumb>
        <BreadcrumbLink name={`Buscador: ${toSearch}`} />
      </Breadcrumb>
      <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
        <div className="w-full flex flex-col gap-4 grow">
          <div className="w-full px-2 py-2 flex items-center bg-white border border-gray-300 rounded-md">
            <h2 className="px-3 py-3 grow text-xl font-semibold">Resultados encontrados para "{toSearch}"</h2>
            <ProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
            <ProductsLayout size={cardSize}  onChange={({target:{id}}) => setCardSize(id)} />
          </div>
          <section className="w-full">
            <ProductsList products={productsFound} sort={productsSort} size={cardSize} maxCols={5} />
          </section>
        </div>
      </main>
    </>
  )
}
