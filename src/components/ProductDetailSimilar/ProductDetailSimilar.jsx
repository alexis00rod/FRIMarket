import { useEffect, useState } from "react"
import { useSlider } from "../../hooks/useSlider"
import { getSimilarProducts } from "../../services/firestore"
import { Button, Loader, ProductCard, Slider } from "../index.js"

export const ProductsDetailSimilar = ({product,type}) => {
  const [similarProducts, setSimilarProducts] = useState()
  const {slider,handleNextSlide,handlePrevSlide} = useSlider()

  useEffect(() => {
    getSimilarProducts(product,type)
      .then(resp => setSimilarProducts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[product,type])

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className="w-full px-2 py-2 flex items-center gap-4 bg-white border border-gray-300 rounded-md">
        <h4 className="px-2 text-lg font-semibold grow">Productos similares</h4>
        <Button icon='chevron-left' color='btn-blue' size='btn-s' onClick={handlePrevSlide} />
        <Button icon='chevron-right' color='btn-blue' size='btn-s' onClick={handleNextSlide} />
      </div>
      {similarProducts
      ? <Slider slider={slider}>
          {similarProducts.map(e => <ProductCard key={e.id} content={e} size='s' />)}
        </Slider>
      : <div className="w-full h-40 flex items-center justify-center">
          <Loader />
        </div>}
    </div>
  )
}
