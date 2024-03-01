import { useEffect, useRef, useState } from "react"
import { getSimilarProducts } from "../../../services/shop.js"
import { ProductCard } from "../../../components/index.js"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export const DetailSimiliarProducts = ({product}) => {
  const [similarProducts, setSimilarProducts] = useState([])
  const swiperRef = useRef(null)

  useEffect(() => {
    getSimilarProducts(product)
    .then(resp => setSimilarProducts(resp))

  },[product])

  return (
    <div className="slider">
      <div className="slider-controls">
        <h3 className="slider-controls-title">Productos similares</h3>
        <div className="slider-controls-buttons">
          <button className="btn btn-s btn-blue" onClick={() => swiperRef.current.swiper.slidePrev()}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="btn btn-s btn-blue" onClick={() => swiperRef.current.swiper.slideNext()}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: {slidesPerView: 3},
          1024: {slidesPerView: 4}
        }}
        ref={swiperRef}
        className="w-full"
      >
        {similarProducts.map(e => <SwiperSlide key={e.id}><ProductCard content={e} size='s' /></SwiperSlide>)}
      </Swiper>
    </div>
  )
}
