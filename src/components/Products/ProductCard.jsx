import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { formatPrice } from '../../services/format.js'
import { BtnAddWishlist } from '../index.js'
import moment from 'moment'

export const ProductCard = ({content, size}) => {
  const {id,title,images,brand,price,description,user,date,stock} = content
  const [cardHover, setCardHover] = useState()
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    let interval
    if (cardHover) {
      interval = setInterval(() => {
        setImageIndex(index => (index + 1) % images.length)
      }, 1000)
    } else {
      clearInterval(interval)
      setImageIndex(0)
    }
    return () => clearInterval(interval)
  }, [cardHover, images.length])

  return (
    <article 
    className={`productCard productCard-${size}`}
    onMouseEnter={() => setCardHover(true)}
    onMouseLeave={() => setCardHover(false)}
    >
      {/* Imagen */}
      <Link to={`/product/${id}`} className='productCard-image'>
        <img src={images[imageIndex].url} alt={images[imageIndex].name} />
      </Link>
      <div className='productCard-body'>
        {/* Titulo */}
        <Link to={`/product/${id}`} className='productCard-title'>
          <h3 className='capitalize'>{title.join(' ')}</h3>
        </Link>
        {/* Marca */}
        {size === 'm' && <span className='productCard-brand'>{brand}</span>}
        {/* Precio */}
        <h4 className='productCard-price'>${formatPrice(price)}</h4>
        {/* Descripcion */}
        {size !== 's' && <p className='productCard-description'>{description}</p>}
        {/* Ubicacion y fecha de publicacion */}
        <div className="w-full flex flex-col md:flex-row md:justify-between">
          <span className='productCard-location'>{user.province.name}</span>
          <span className='productCard-date'>{date && moment(date.toDate()).fromNow()}</span>
        </div>
        {/* Stock */}
        {size === 'm' &&
        <p className='productCard-stock'>
          <span className='font-medium'>Disponibilidad:</span> 
          <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock}
            <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
          </span>
        </p>}
        {/* Agregar a favorito */}
        <BtnAddWishlist product={content} small />
      </div>
    </article>
  )
}