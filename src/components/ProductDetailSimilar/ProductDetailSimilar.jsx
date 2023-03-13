import { useEffect, useState } from "react"
import { getSimilarProducts } from "../../services/firestore"
import { ProductCard } from "../ProductCard/ProductCard"

export const ProductsDetailSimilar = ({type}) => {
  const [similarProducts, setSimilarProducts] = useState([])

  useEffect(() => {
    getSimilarProducts(type)
    .then(resp => setSimilarProducts(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[type])

  return (
    <div className="w-full px-2 py-2 bg-white border border-gray-300 rounded-md divide-y divide-gray-300">
      <h3 className='w-full px-2 py-2 text-xl font-medium'>Productos similares</h3>
      <ul className="w-full px-2 py-4 grid grid-cols-5 gap-4">
        {similarProducts.map(e => <ProductCard key={e.id} content={e} style='grid' />)}
      </ul>
    </div>
  )
}
