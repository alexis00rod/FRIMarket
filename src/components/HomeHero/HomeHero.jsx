import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSlider } from '../../hooks/useSlider'
import { getAds } from '../../services/firestore'
import { Loader, Slider } from '../index.js'

export const HomeHero = () => {
  const [heroAds, setHeroAds] = useState()
  const {slider,handleNextSlide,handlePrevSlide} = useSlider()

  useEffect(() => {
    getAds()
    .then(resp => setHeroAds(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[])

  return (
    <div className='relative w-full h-max'>
      {heroAds
      ? <>
          <Slider slider={slider} banner>
            {heroAds.map(e => (
              <div 
              key={e.id} 
              style={{ backgroundImage:`url(${e.img})` }} 
              className="min-w-full h-96 flex bg-black text-white bg-no-repeat bg-center bg-contain"
              >
                <div className="grow flex flex-col items-center justify-center gap-4">
                  <h3 className='text-4xl font-medium uppercase'>{e.title}</h3>
                  <h4 className='text-lg'>{e.subtitle}</h4>
                </div>
                <div className="grow flex flex-col items-center justify-center gap-4">
                  <p className='text-lg'>{e.body}</p>
                  <Link
                  to={`/shop/${e.action}`}
                  className='w-full max-w-btn h-8 px-2 flex items-center justify-center bg-blue-500 text-sm text-white rounded-md'
                  >
                    Ver productos
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
          <button 
          className='absolute top-1/2 -translate-y-1/2 left-0 w-14 px-2 h-8 bg-blue-500 text-white rounded-r-md'
          onClick={handlePrevSlide}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
          className='absolute top-1/2 -translate-y-1/2 right-0 w-14 px-2 h-8 bg-blue-500 text-white rounded-l-md'
          onClick={handleNextSlide}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </>
      : <div className='min-w-full h-96 flex items-center justify-center'>
          <Loader />
        </div>}
    </div>
  )
}
