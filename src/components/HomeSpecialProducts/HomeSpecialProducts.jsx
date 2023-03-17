import { useState, useEffect } from 'react'
import { getSpecialProducts } from '../../services/firestore'
import { ProductCard, Slider } from '../index.js'
import { useSlider } from '../../hooks/useSlider'

export const HomeSpecialProducts = () => {
  const [specialProducts, setSpecialProducts] = useState([])
  const {slider,handlePrevSlide, handleNextSlide} = useSlider()

  useEffect(() => {
    getSpecialProducts()
      .then(resp => setSpecialProducts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[])

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className="w-full px-2 py-2 flex items-center gap-4 bg-white border border-gray-300 rounded-md">
        <h4 className="px-2 text-lg font-semibold grow">Productos especiales</h4>
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
      <Slider slider={slider}>
      {specialProducts.map(e => (
          <ProductCard key={e.id} content={e} style='grid' size='m' />
        ))}
      </Slider>
    </div>
  )
}
