import { useRef} from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export const Hero = () => {
  const swiperRef = useRef(null)

  const banners = [
    {
      title: 'Equipa tu cocina',
      body:['Hasta 20%','Productos desde $1000'],
      img: 'https://i.ibb.co/dLzgVJD/image-a4628cf12e2f47eb8e340017bfe4cb4b.png',
      href: '/shop/house'
    },
    {
      title: 'Deportes',
      body:['Hasta 20%','Productos desde $1000'],
      img: 'https://i.ibb.co/nQPD9vR/E-Sensium-2-2-MY21-Web-View-PNG-800x800.png',
      href: '/shop/sports'
    },
    {
      title: 'Gaming',
      body:['Hasta 20%','Productos desde $1000'],
      img: 'https://i.ibb.co/0fXzTNc/xl2411k.png',
      href: '/shop/electronic'
    }
  ]

  return (
    <div className="hero">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500 }}
        modules={[Autoplay]}
        ref={swiperRef}
        className="hero-slider"
      >
        {banners.map((e, i) => (
          <SwiperSlide
            key={i}
            className="hero-slide"
            style={{ backgroundImage: `url(${e.img})` }}
          >
            <div className="hero-slide-section">
              <h3>{e.body[0]}</h3>
              <h4>Equipa tu cocina</h4>
            </div>
            <div className="hero-slide-section">
              <p>{e.body[1]}</p>
              <Link to={`${e.href}`} className="btn btn-m btn-blue btn-text">Ver productos</Link>
            </div>
          </SwiperSlide>))}
      </Swiper>
      <button 
      className="hero-slider-prev"
      onClick={() => swiperRef.current.swiper.slidePrev()}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button 
      className="hero-slider-next"
      onClick={() => swiperRef.current.swiper.slideNext()}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  )
}
