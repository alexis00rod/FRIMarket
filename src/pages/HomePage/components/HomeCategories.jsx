import { useEffect, useRef, useState } from "react"
import { getProductsPerCategory } from "../../../services/shop"
import { getFeaturedCategories } from "../../../services/categories"
import { Loader, ProductCard } from "../../../components"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'

export const HomeCategories = () => {
  const [tab, setTab] = useState('phones')
  const [featuredCategories, setFeaturedCategories] = useState()
  const [productsPerCategory, setProductsPerCategory] = useState()
  const swiperRef = useRef(null)

  useEffect(() => {
    getProductsPerCategory(tab,8)
      .then(resp => setProductsPerCategory(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[tab])

  useEffect(() => {
    getFeaturedCategories(6)
      .then(resp => setFeaturedCategories(resp.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))))
  },[])

  if(!productsPerCategory || !featuredCategories) return <Loader />

  return (
    <>
      {featuredCategories &&
        <Swiper
        slidesPerView={2}
        spaceBetween={1}
        breakpoints={{
          600: {slidesPerView: 3},
          800: {slidesPerView: 4},
          1000:{slidesPerView: 5},
          1100:{slidesPerView: 6}
        }}
        className="featuredCategories-slider"
        >
          {featuredCategories.map((e,i) => (
            <SwiperSlide
            key={e.id}
            className='featuredCategories-slide'
            >
              <input type="radio" name="category" id={e.idCategory} className="hidden" onChange={({target:{id}}) => setTab(id)} />
              <label 
              htmlFor={e.idCategory}
              className={`${tab === e.idCategory ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'}`} 
              >
                <i className={`fa-solid fa-${e.icon}`}></i>
                <h4>{e.name}</h4>
              </label>
            </SwiperSlide>))}
        </Swiper>}
      {productsPerCategory &&
        <>
          <Swiper
          slidesPerView={2}
          spaceBetween={16}
          loop={true}
          breakpoints={{
            768: {slidesPerView: 3},
            1024: {slidesPerView: 4}
          }}
          ref={swiperRef}
          className="productsPerCategory-slider"
          >
            {productsPerCategory.map(e => (
              <SwiperSlide
              key={e.id}
              className="productsPerCategory-slider"
              >
                <ProductCard content={e} size='s' />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="productsPerCategory-slider-buttons">
            <button className="btn btn-s btn-blue" onClick={() => swiperRef.current.swiper.slidePrev()}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="btn btn-s btn-blue" onClick={() => swiperRef.current.swiper.slideNext()}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </>}
    </>
  )
}
