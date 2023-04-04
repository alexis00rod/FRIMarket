import { useEffect, useState } from "react"
import { getFeaturedCategories } from "../../services/firestore"
import { Slider, CategoryCard, Loader } from "../index.js"
import { useSlider } from "../../hooks/useSlider"

export const CategorySlider = ({active, ...props}) => {
  const [featuredCategories, setFeaturedCategories] = useState([])
  const {slider, handleNextSlide, handlePrevSlide} = useSlider()
  
  useEffect(() => {
    getFeaturedCategories()
      .then(resp => setFeaturedCategories(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[])

  if(!featuredCategories) return <Loader />

  return (
    <div className="w-full my-2 border border-gray-300 rounded-md overflow-hidden">
      <Slider slider={slider} >
        {featuredCategories.map(e => <CategoryCard key={e.id} category={e} variant='slider' active={active}  {...props} />)}
      </Slider>
    </div>
  )
}
