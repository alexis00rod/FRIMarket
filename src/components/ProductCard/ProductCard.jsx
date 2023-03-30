import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { formatDate } from '../../services/formatDate.js'
import { getLocation } from '../../services/locations.js'
import { BtnAddCart, BtnAddWishlist, Button, ProductModal } from '../index.js'

export const ProductCard = ({content, size}) => {
  const [cardDetail, setCardDetail] = useState(false)
  const {id,name,thumb,price,description,province,timestamp,stock,brand} = content
  const [location, setLocation] = useState({})

  useEffect(() => {
    getLocation(province)
    .then(resp => setLocation(resp))
    
  },[province])

  return (
    <article className={`productCard productCard-${size}`}>
      {/* Thumb */}
      <Link to={`/product/${id}`} className='productCard-thumb'>
        <img src={thumb} alt={name} />
      </Link>
      <div className='pb-1 md:pb-2 grow flex flex-col gap-1 md:gap-2'>
        {/* Name */}
        <Link to={`/product/${id}`} className='productCard-title'><h3>{name}</h3></Link>
        {/* Brand */}
        {size === 'm' && <span className='productCard-brand'>{brand}</span>}
        {/* Price */}
        <h4 className='productCard-price'>${price}</h4>
        {/* Description */}
        {size !== 's' && <p className='productCard-description'>{description}</p>}
        <div className={`flex ${size !== 's' ? 'flex-row' : 'flex-col'} justify-between`}>
          <p className='productCard-location'>{location.nombre}, Argentina</p>
          <p className='productCard-date'>{formatDate(timestamp.toDate())}</p>
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
        {/* CTA */}
        <div className='productCard-CTA'>
          {/* Add  to cart button */}
          <BtnAddCart product={content} qty={1} size='btn-l' />
          {/* Add to wishlist button */}
          <BtnAddWishlist product={content} size={size !== 'l' ? 'btn-s' : 'btn-l'}/>
          {/* Show product modal button */}
          <Button icon='eye' color='btn-yellow' size='btn-s' title='Ver producto' onClick={() => setCardDetail(true)} />
        </div>
      </div>
      {/* Product modal */}
      {cardDetail && <ProductModal content={content} handle={setCardDetail} />}
    </article>
  )
}