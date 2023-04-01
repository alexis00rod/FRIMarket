import { Link } from "react-router-dom"
import { useSlider } from "../../hooks/useSlider.jsx"
import { Button, Slider } from "../index.js"

export const Hero = () => {
  const {slider,handleNextSlide,handlePrevSlide} = useSlider()

  return (
    <div className="relative w-full">
      <Slider slider={slider} banner>
        <div className="min-w-full h-96 flex flex-col lg:flex-row bg-black text-white bg-no-repeat bg-center bg-contain" 
        style={{ backgroundImage: 'url(https://i.ibb.co/dLzgVJD/image-a4628cf12e2f47eb8e340017bfe4cb4b.png)' }} 
        >
          <div className="grow flex flex-col items-center justify-center gap-4">
            <h3 className='text-4xl font-medium uppercase'>Hasta 20%</h3>
            <h4 className='text-lg'>Equipa tu cocina</h4>
          </div>
          <div className="grow flex flex-col items-center justify-center gap-4">
            <p className='text-lg'>Productos desde $1000</p>
            <Link to='/shop/house' className="btn btn-m btn-blue">Ver productos</Link>
          </div>
        </div>
        <div className="min-w-full h-96 flex flex-col lg:flex-row bg-black text-white bg-no-repeat bg-center bg-contain" 
        style={{ backgroundImage:'url(https://i.ibb.co/nQPD9vR/E-Sensium-2-2-MY21-Web-View-PNG-800x800.png)' }} 
        >
          <div className="grow flex flex-col items-center justify-center gap-4">
            <h3 className='text-4xl font-medium uppercase'>Hasta 20%</h3>
            <h4 className='text-lg'>Deportes</h4>
          </div>
          <div className="grow flex flex-col items-center justify-center gap-4">
            <p className='text-lg'>Productos desde $1000</p>
            <Link to='/shop/sports' className="btn btn-m btn-blue">Ver productos</Link>
          </div>
        </div>
        <div className="min-w-full h-96 flex flex-col lg:flex-row bg-black text-white bg-no-repeat bg-center bg-contain" 
        style={{ backgroundImage:'url(https://i.ibb.co/0fXzTNc/xl2411k.png)' }} 
        >
          <div className="grow flex flex-col items-center justify-center gap-4">
            <h3 className='text-4xl font-medium uppercase'>Hasta 20%</h3>
            <h4 className='text-lg'>Gaming</h4>
          </div>
          <div className="grow flex flex-col items-center justify-center gap-4">
            <p className='text-lg'>Productos desde $1000</p>
            <Link to='/shop/electronic' className="btn btn-m btn-blue">Ver productos</Link>
          </div>
        </div>
      </Slider>
      <Button 
      icon='chevron-left' 
      size='btn-s' color='btn-blue' 
      style='btn-hero btn-hero-left' 
      onClick={handlePrevSlide}
      />
      <Button 
      icon='chevron-right' 
      size='btn-s' color='btn-blue' 
      style='btn-hero btn-hero-right' 
      onClick={handleNextSlide}
      />
    </div>
  )
}
