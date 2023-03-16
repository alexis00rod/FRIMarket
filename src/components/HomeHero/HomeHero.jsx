import {useState, useEffect} from 'react'
import { getAds } from '../../services/firestore'
import { Loader } from '../index.js'

export const HomeHero = () => {
  const [heroAds, setHeroAds] = useState()
  const [heroSliderPos, setHeroSliderPos] = useState(0)
  const [heroSliderShow, setHeroSliderShow] = useState({})

  useEffect(() => {
    getAds()
    .then(resp => setHeroAds(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[])

  useEffect(() => {
    heroAds &&
    setHeroSliderShow(heroAds[heroSliderPos])
  },[heroAds, heroSliderPos])

  const {id, title, subtitle, body, img, action} = heroSliderShow

  return (
    <div className='w-full'>
      {heroAds
        ? <div className="relative min-w-full h-96">
            <div key={id} className="w-full h-full flex items-center justify-center bg-black text-white rounded-md">
              <div className="h-full flex flex-col items-center justify-center grow">
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
              </div>
              <div className="h-full flex flex-col items-center justify-center grow">
                <p>{body}</p>
                <button>{action}</button>
              </div>
            </div>
            <button 
            className='absolute top-1/2 -translate-y-1/2 left-0 w-14 px-2 h-8 bg-blue-500 text-white rounded-r-md'
            onClick={() => setHeroSliderPos(heroSliderPos - 1)}
            disabled={heroSliderPos <= 0}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
            className='absolute top-1/2 -translate-y-1/2 right-0 w-14 px-2 h-8 bg-blue-500 text-white rounded-l-md'
            onClick={() => setHeroSliderPos(heroSliderPos + 1)}
            disabled={heroSliderPos >= 2}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        : <div className="min-w-full h-96 flex items-center justify-center">
            <Loader />
          </div>}
    </div>
  )
}
