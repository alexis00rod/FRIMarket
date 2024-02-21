import { useState } from "react"
import { ImageMagnifier } from "../../../components"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export const DetailImages = ({images}) => {
  const [imageSelected, setImageSelected] = useState(images[0])
  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <div className="w-full p-2 flex bg-white border border-slate-300 rounded-md">
      {/* Lista images mobile */}
      <div className="relative w-full h-[400px] lg:hidden">
        <span className="absolute top-2 left-2 z-20 w-max px-2 py-1 text-sm font-medium bg-slate-300 rounded-full">{currentSlide} / {images.length}</span>
        <Swiper
        slidesPerView={1}
        className="w-full h-full"
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
        >
          {images.map((img,i) => (
            <SwiperSlide
            key={i}
            className="flex items-center justify-center"
            >
              <img src={img.url} alt={img.name} className="w-full h-full object-contain" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Lista images desktop */}
      <div className="w-full hidden lg:flex h-[500px]">
        <div className="w-max p-2 flex flex-col flex-none gap-2">
          {images.slice(0,5).map((img, i) => (
            <figure
            key={i}
            className={`
            relative w-20 h-20 flex flex-none border-2 cursor-pointer rounded-md overflow-hidden
            ${imageSelected.url === img.url ? 'border-blue-500' : 'border-slate-300'}
            `}
            onMouseOver={() => setImageSelected(img)}
            onClick={() => setImageSelected(img)}
            >
              {i === 4
              ? <>
                  <img src={img.url} alt="" className="w-full h-full object-cover"/>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80">
                    <span className="font-medium text-3xl text-blue-500">+ {images.length - 4}</span>
                  </div>
                </>
              : <img src={img.url} alt="" className="w-full h-full object-cover"/>}
            </figure>
          ))}
        </div>
        <div className="p-2 grow flex items-center justify-center">
          <ImageMagnifier image={imageSelected} />
        </div>
      </div>
    </div>
  )
}
