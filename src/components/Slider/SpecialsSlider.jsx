import { useEffect, useState } from "react"
import { getSpecialProducts } from "../../services/firestore"
import { useSlider } from "../../hooks/useSlider"
import { Slider, Element, Button, ProductCard, Loader } from "../index.js"

export const SpecialsSlider = () => {
  const [specialsproducts, setSpecialsproducts] = useState()
  const {slider, handleNextSlide, handlePrevSlide} = useSlider()

  useEffect(() => {
    getSpecialProducts()
      .then(resp => setSpecialsproducts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[])

  if(!specialsproducts) return <Loader />

  return (
    <div className="w-full flex flex-col gap-4">
      <Element flex='items-center gap-4'>
        <h3 className="box-header grow text-lg font-medium">Productos especiales</h3>
        <div className="px-2 flex gap-4">
          <Button icon='chevron-left' color='btn-blue' size='btn-s' onClick={handlePrevSlide} />
          <Button icon='chevron-right' color='btn-blue' size='btn-s' onClick={handleNextSlide} />
        </div>
      </Element>
      <Slider slider={slider} row='gap-4'>
        {specialsproducts.map(e => <ProductCard key={e.id} content={e} size='m' />)}
      </Slider>
    </div>
  )
}
