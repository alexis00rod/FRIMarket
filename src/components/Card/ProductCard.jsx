import { useState } from 'react'
import { Link } from "react-router-dom"
import { BtnAddCart, BtnAddWishlist, Button, Loader, ProductDetail } from '../index.js'
import { useGeo } from '../../hooks/useGeo.jsx'
import moment from 'moment'

export const ProductCard = ({content, size}) => {
  const [cardDetail, setCardDetail] = useState(false)
  const {id,title,images,brand,price,description,user,date,stock} = content
  // const {id,name,description,price,stock,thumb,brand,date,location:{province}} = content
  // const {provinces} = useGeo()

  // console.log(content)

  // if(!provinces) return <Loader />

  return (
    <article className={`productCard productCard-${size}`}>
      <Link to={`/product/${id}`} className='productCard-thumb'>
        <img src={images[0].url} alt={images[0].name}/>
      </Link>
      <div className='productCard-body'>
        <Link to={`/product/${id}`} className='productCard-title'><h3>{title}</h3></Link>
        {size === 'm' && <span className='productCard-brand'>{brand}</span>}
        <h4 className='productCard-price'>${price}</h4>
        {size !== 's' && <p className='productCard-description'>{description}</p>}
        <div className="w-full flex flex-col md:flex-row md:justify-between">
          <span className='productCard-location'>{user.province.name}</span>
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
          <span className='productCard-location'>{provinces && provinces.find(e => e.id === province)?.nombre}</span>
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