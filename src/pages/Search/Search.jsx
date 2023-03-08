import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductsLayout } from "../../components"
import { searchProducts } from "../../services/firestore"

export const Search = () => {
  const {toSearch} = useParams()
  const [productsFound, setProductsFound] = useState([])

  useEffect(() => {
    searchProducts(toSearch)
    .then(resp => setProductsFound(resp))
  },[toSearch])

  return (
    <div className="w-full flex flex-col gap-4 grow">
      <div className="w-full px-2 py-2 bg-white border border-gray-300 rounded-md">
        <h2 className="px-3 py-3 text-xl font-semibold">Resultados encontrados para "{toSearch}"</h2>
      </div>
      <section className="w-full">
        <ProductsLayout products={productsFound} layout='grid' />
      </section>
    </div>
  )
}
