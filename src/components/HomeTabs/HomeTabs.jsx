import { useEffect, useRef, useState } from "react"
import { useSlider } from "../../hooks/useSlider"
import { getFeaturedCategories, getFeaturedProducts } from "../../services/firestore"
import { CategoryCard, Loader, ProductCard, Slider } from "../index.js"

export const HomeTabs = () => {
  const [tabs, setTabs] = useState('')
  const {slider,handleNextSlide,handlePrevSlide} = useSlider()
  const [featuredCategories, setFeaturedCategories] = useState()
  const [featuredProducts, setFeaturedProducts] = useState()

  useEffect(() => {
    getFeaturedCategories()
    .then(resp => setFeaturedCategories(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))

  },[])

  useEffect(() => {
    featuredCategories && 
    setTabs(featuredCategories[0].idCategory)

  },[featuredCategories])

  useEffect(() => {
    tabs &&
    getFeaturedProducts(tabs)
    .then(resp => setFeaturedProducts(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))

  },[tabs])

  return (
    <div className="px-2 py-2 flex flex-col gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {featuredCategories
        ? <div className="w-full grid grid-cols-6 border border-gray-300 divide-x divide-gray-300 rounded-md overflow-hidden">
            {featuredCategories.map(e => (
              <CategoryCard key={e.id} category={e} />
            ))}
          </div>
        : <Loader />}
      </div>
      <div className="w-full flex flex-col gap-2">
        {featuredProducts
        ? <Slider slider={slider}>
            {featuredProducts.map(e => <ProductCard key={e.id} content={e} size='s' />)}
          </Slider>
        : <div className="w-full h-40 flex items-center justify-center">
            <Loader />
          </div>}
        <div className="px-2 py-2 flex justify-center items-center gap-4">
          <button 
          className="w-8 h-8 flex items-center justify-center flex-none bg-blue-500 text-white rounded-md"
          onClick={handlePrevSlide}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
          className="w-8 h-8 flex items-center justify-center flex-none bg-blue-500 text-white rounded-md"
          onClick={handleNextSlide}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
