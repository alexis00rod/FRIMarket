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

  if(!productsPerCategory && !featuredCategories) return<Loader />

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Slider categorias */}
      {featuredCategories &&
        <Swiper
        slidesPerView={2}
        spaceBetween={1}
        // loop={true}
        breakpoints={{
          600: {slidesPerView: 3},
          800: {slidesPerView: 4},
          1000:{slidesPerView: 5},
          1100:{slidesPerView: 6}
        }}
        className="w-full rounded-md bg-gray-300 border border-gray-300"
        >
          {featuredCategories.map((e,i) => (
            <SwiperSlide
            key={e.id}
            className="w-full h-36 flex"
            >
              <input type="radio" name="category" id={e.idCategory} className="hidden" onChange={({target:{id}}) => setTab(id)} />
              <label 
              htmlFor={e.idCategory}
              className={`
              w-full h-full flex flex-col duration-200 hover:bg-yellow-500 hover:text-white cursor-pointer
              ${tab === e.idCategory ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'}
              `} 
              >
                <i className={`w-full h-[90px] pb-2 flex justify-center items-end flex-none text-[50px] fa-solid fa-${e.icon}`}></i>
                <h4 className="w-full px-2 pt-2 flex justify-center  text-center grow font-medium leading-4">
                  {e.name}
                </h4>
              </label>
            </SwiperSlide>))}
        </Swiper>}
      {/* Slider productos de categoria */}
      {productsPerCategory &&
        <div className="w-full flex flex-col gap-4">
          <Swiper
          slidesPerView={2}
          spaceBetween={16}
          loop={true}
          breakpoints={{
            768: {slidesPerView: 3},
            1024: {slidesPerView: 4}
          }}
          ref={swiperRef}
          className="w-full"
          >
            {productsPerCategory.map(e => (
              <SwiperSlide
              key={e.id}
              className="w-max"
              >
                <ProductCard content={e} size='s' />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-full flex justify-center items-center gap-4">
            <button className="btn btn-s btn-blue" onClick={() => swiperRef.current.swiper.slidePrev()}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="btn btn-s btn-blue" onClick={() => swiperRef.current.swiper.slideNext()}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>}
    </div>
  )
}
