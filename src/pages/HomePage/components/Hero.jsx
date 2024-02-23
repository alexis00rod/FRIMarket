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
    <div className="relative w-full h-[400px]">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500 }}
        modules={[Autoplay]}
        ref={swiperRef}
        className="h-full bg-black text-white rounded-md"
      >
        {banners.map((e, i) => (
          <SwiperSlide
            key={i}
            className="w-full h-full flex flex-col lg:flex-row items-center justify-center bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${e.img})` }}
          >
            <div className="grow flex flex-col items-center justify-center gap-4">
            <h3 className='text-4xl font-medium uppercase'>{e.body[0]}</h3>
            <h4 className='text-lg'>Equipa tu cocina</h4>
          </div>
          <div className="grow flex flex-col items-center justify-center gap-4">
            <p className='text-lg'>{e.body[1]}</p>
            <Link to={`${e.href}`} className="btn btn-m btn-blue">Ver productos</Link>
          </div>
          </SwiperSlide>))}
      </Swiper>
      <button 
      className="absolute top-1/2 -translate-y-1/2 left-2 lg:left-4 z-20 btn btn-blue btn-s"
      onClick={() => swiperRef.current.swiper.slidePrev()}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button 
      className="absolute top-1/2 -translate-y-1/2 right-2 lg:right-4 z-20 btn btn-blue btn-s"
      onClick={() => swiperRef.current.swiper.slideNext()}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  )
}
