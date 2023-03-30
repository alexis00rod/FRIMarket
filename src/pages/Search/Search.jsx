import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Breadcrumb, BreadcrumbLink, ProductsLayout, ProductsList, SelectProductsSort } from "../../components"
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
      <main>
        <section className="w-full flex flex-col gap-2 md:gap-4">
          <div className="box flex items-center flex-wrap">
            <h2 className="px-1 md:px-2 py-1 md:py-2 grow text-lg font-medium">Resultados encontrados para "{toSearch}"</h2>
            <div className="flex justify-end gap-2 md:gap-4 grow">
              <SelectProductsSort selected={productsSort} onChange={({target: {id}}) => setProductsSort(id)} />
              <ProductsLayout size={cardSize} handle={setCardSize} />
            </div>
          </div>
          <ProductsList products={productsFound} sort={productsSort} size={cardSize} maxCols={5} />
        </section>
      </main>
    </>
  )
}
