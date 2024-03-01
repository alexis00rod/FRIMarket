import { useEffect, useRef, useState } from 'react'
import { getFeaturedProducts } from '../../../services/shop'
import { Loader, ProductCard } from '../../../components'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'

export const HomeFeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState()
  const swiperRef = useRef(null)

  useEffect(() => {
    getFeaturedProducts(4)
      .then(resp => setFeaturedProducts(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[])

  if(!featuredProducts) return <Loader />

  return (
    <div className="slider">
      <div className="slider-controls">
        <h3 className="slider-controls-title">Productos destacados</h3>
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
        slidesPerView={1}
        breakpoints={{
          1024:{slidesPerView:2}
        }}
        loop={true}
        ref={swiperRef}
        className="w-full"
      >
        {featuredProducts.map(e => <SwiperSlide key={e.id}><ProductCard content={e} size='m' /></SwiperSlide>)}
      </Swiper>
    </div>
  )
}
