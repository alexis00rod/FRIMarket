import { useEffect, useState } from "react"
import { getFeaturedCategories } from "../../services/firestore"
import { CategoryCard, Loader } from "../index.js"

export const ProductsCategory = () => {
  const [featuredCategories, setFeaturedCategories] = useState([])

  useEffect(() => {
    getFeaturedCategories()
    .then(resp => setFeaturedCategories(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[])

  console.log(featuredCategories)

  return (
    <div className="debug w-full flex flex-col">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {featuredCategories
        ? <div className="w-full grid grid-cols-6 border border-gray-300 divide-x divide-gray-300 rounded-md overflow-hidden">
            {featuredCategories.map(e => (
              <CategoryCard key={e.id} category={e} />
            ))}
          </div>
        : <Loader />}
      </div>
      <h2>Slider product category</h2>
    </div>
  )
}
