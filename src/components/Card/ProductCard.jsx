import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { getLocation } from '../../services/locations.js'
import { BtnAddCart, BtnAddWishlist, Button, ProductDetail } from '../index.js'
import moment from 'moment'

export const ProductCard = ({content, size}) => {
  const [cardDetail, setCardDetail] = useState(false)
  const {id,name,description,price,stock,thumb,brand,date,location:{province}} = content
  const [location, setLocation] = useState({})

  useEffect(() => {
    getLocation(province)
    .then(resp => setLocation(resp))
    
  },[province])

  return (
    <article className={`productCard productCard-${size}`}>
      <Link to={`/product/${id}`} className='productCard-thumb'>
        <img src={thumb} alt={name}/>
      </Link>
      <div className='productCard-body'>
        <Link to={`/product/${id}`} className='productCard-title'><h3>{name}</h3></Link>
        {size === 'm' && <span className='productCard-brand'>{brand}</span>}
        <h4 className='productCard-price'>${price}</h4>
        {size !== 's' && <p className='productCard-description'>{description}</p>}
        <div className="w-full flex flex-col md:flex-row md:justify-between">
          <span className='productCard-location'>{location.nombre}</span>
          <span className='productCard-date'>{date && moment(date.toDate()).fromNow()}</span>
        </div>
        {size === 'm' &&
        <p className='productCard-stock'>
          <span className='font-medium'>Disponibilidad:</span> 
          <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock}
            <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
          </span>
        </p>}
        {size !== 's' && 
        <div className='productCard-CTA-row'>
          <BtnAddCart product={content} qty={1} size='btn-m' />
          <BtnAddWishlist product={content} size='btn-s'/>
          <Button icon='eye' color='btn-yellow' size='btn-s' title='Ver producto' onClick={() => setCardDetail(true)} />
        </div>}
      </div>
      {size === 's' && 
      <div className='productCard-CTA-col'>
        <BtnAddCart product={content} qty={1} size='btn-s' />
        <BtnAddWishlist product={content} size='btn-s'/>
        <Button icon='eye' color='btn-yellow' size='btn-s' title='Ver producto' onClick={() => setCardDetail(true)} />
      </div>}
      {cardDetail && <ProductDetail product={content} handle={setCardDetail} />}
    </article>
  )
}