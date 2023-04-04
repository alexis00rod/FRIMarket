import { useEffect, useState } from "react"
import { getFeaturedProducts } from "../../services/firestore"
import { Slider, ProductCard, Button, Loader } from "../index.js"
import { useSlider } from "../../hooks/useSlider"

export const ProductsSlider = ({category}) => {
  const [featuredProducts, setFeaturedProducts] = useState()
  const {slider, handleNextSlide, handlePrevSlide} = useSlider()
  
  useEffect(() => {
    getFeaturedProducts(category)
      .then(resp => setFeaturedProducts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[category])

  if(!featuredProducts) return <Loader />

  return (
    <div className="w-full flex flex-col gap-2">
      <Slider slider={slider} row='gap-4 '>
        {featuredProducts.map(e => <ProductCard key={e.id} content={e} size='s' />)}
      </Slider>
      <div className="w-full px-2 py-2 flex items-center justify-center gap-4">
        <Button icon='chevron-left' color='btn-blue' size='btn-s' onClick={handlePrevSlide} />
        <Button icon='chevron-right' color='btn-blue' size='btn-s' onClick={handleNextSlide} />
      </div>
    </div>
  )
}
