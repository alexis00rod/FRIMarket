import { useEffect, useRef, useState } from "react"
import { useAuthContext } from "../../../context/AuthContext/AuthContext"
import { getWishlist } from "../../../services/wishlist"
import { ProductCard } from "../../../components"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'

export const HomeWishlist = () => {
  const [wishlist, setWishlist] = useState()
  const {userLogged} = useAuthContext()
  const swiperRef = useRef(null)

  useEffect(() => {
    userLogged &&
      getWishlist(userLogged, setWishlist)
  },[userLogged])

  if(userLogged && wishlist) {
    return (
      <div className="slider">
        <div className="slider-controls">
          <h3 className="slider-controls-title">Mis productos favoritos</h3>
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
          {wishlist.map(e => <SwiperSlide key={e.id}><ProductCard content={e} size='s' /></SwiperSlide>)}
        </Swiper>
      </div>
    )
  }
}
