import { useEffect, useState } from "react"
import { getSimilarProducts } from "../../services/firestore"
import { useSlider } from "../../hooks/useSlider"
import { Element, Slider, ProductCard, Button } from "../index.js"

export const SimilarSlider = ({product}) => {
  const [similarProducts, setSimilarProducts] = useState([])
  const {slider, handleNextSlide, handlePrevSlide} = useSlider()
  const {type} = product

  useEffect(() => {
    getSimilarProducts(product)
    .then(resp => setSimilarProducts(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))

  },[])

  return (
    <div className="w-full flex flex-col gap-4">
      <Element flex='items-center gap-4'>
        <h3 className="box-header grow text-lg font-medium">Productos similares</h3>
        <div className="px-2 flex gap-4">
          <Button icon='chevron-left' color='btn-blue' size='btn-s' onClick={handlePrevSlide} />
          <Button icon='chevron-right' color='btn-blue' size='btn-s' onClick={handleNextSlide} />
        </div>
      </Element>
      <Slider slider={slider} row='gap-4'>
        {similarProducts.map(e => <ProductCard key={e.id} content={e} size='s' />)}
      </Slider>
    </div>
  )
}
