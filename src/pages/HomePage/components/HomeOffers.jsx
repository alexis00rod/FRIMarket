import { useEffect, useRef, useState } from "react"
import { getProductsOffer } from "../../../services/shop"
import { Loader, ProductCard } from "../../../components"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'

export const HomeOffers = () => {
  const swiperRef = useRef(null)
  const [productsOffer, setProductsOffer] = useState()

  useEffect(() => {
    getProductsOffer(8)
      .then(resp => setProductsOffer(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[])

  if(!productsOffer) return <Loader />

  return (
    <div className="slider">
      <div className="slider-controls">
        <h3 className="slider-controls-title">Productos en oferta</h3>
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
        loop={true}
        breakpoints={{
          640: {slidesPerView: 3},
          1024: {slidesPerView: 4}
        }}
        ref={swiperRef}
        className="w-full"
      >
        {productsOffer.map(e => <SwiperSlide key={e.id}><ProductCard content={e} size='s' /></SwiperSlide>)}
      </Swiper>
    </div>
  )
}
