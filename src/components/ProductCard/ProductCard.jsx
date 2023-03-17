import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { formatDate } from '../../services/formatDate.js'
import { getLocation } from '../../services/locations.js'
import { BtnAddCart, BtnAddWishlist, ProductModal } from '../index.js'

const Card = ({size,direction,children}) => {
  return (
    <article className={`${size} px-2 py-2 flex flex-${direction} flex-none bg-white border border-gray-300 rounded-md`}>
      {children}
    </article>
  )
}

const Thumb = ({id,size,thumb,name}) => {
  return (
    <Link to={`/product/${id}`} className={`${size} px-1 py-1 flex items-center justify-center flex-none overflow-hidden`}>
      <img src={thumb} alt={name} className='h-full object-contain' />
    </Link>
  )
}

const Title = ({id,title,pad}) => {
  return (
    <Link to={`/product/${id}`} className={`w-full ${pad} flex items-center`}>
      <h3 className='w-max font-medium line-clamp-1'>{title}</h3>
    </Link>
  )
}

const Price = ({price,pad}) => <h4 className={`${pad} text-xl text-yellow-500 font-semibold`}>${price}</h4>

const Description = ({description,pad}) => <p className={`${pad} text-sm text-gray-500 line-clamp-2`}>{description}</p>

const Brand = ({brand}) => <span className='px-1 py-1 text-sm text-gray-500 uppercase'>{brand}</span>

const Stock = ({stock}) => {
  return (
    <p className='px-1 py-1 flex items-center gap-2 capitalize'>
      <span className='font-medium'>Disponibilidad:</span> 
      <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {stock}
        <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
      </span>
    </p>
  )
}

const Location = ({location,pad}) => <p className={`max-w-btn ${pad && pad} text-sm text-gray-500 truncate`} >{location}, Argentina</p>

const Date = ({date,pad}) => <p className={`max-w-btn ${pad && pad} text-sm text-gray-500 truncate`} >{date}</p>

const CTA = ({product, qty, toggle, detail, pad}) => {
  return(
    <div className={`w-full ${pad} flex gap-2`}>
      <BtnAddCart product={product} qty={qty} />
      <BtnAddWishlist product={product} toggle={toggle !== 'l'}/>
      <button 
      className='w-8 h-8 flex items-center justify-center flex-none bg-yellow-500 text-white rounded-md'
      onClick={() => detail(true)}
             >
        <i className="fa-solid fa-eye"></i>
      </button>
    </div>
  )
}

export const ProductCard = ({content, size}) => {
  const [cardDetail, setCardDetail] = useState(false)
  const {id,name,thumb,price,description,province,timestamp,stock,brand} = content
  const [location, setLocation] = useState({})

  useEffect(() => {
    getLocation(province)
    .then(resp => setLocation(resp))
    
  },[province])

  return (
    <>
      <Card 
      size={size === 's' ? 'w-full max-w-xs' : size === 'm' ? 'w-1/2' : 'w-full'} 
      direction={size !== 's' ? 'row' : 'col'}
      >
        <Thumb 
        id={id} 
        size={`w-full max-w-xs ${size !== 'm' ? 'h-56' : 'h-full'}`} 
        thumb={thumb} 
        name={name} 
        />
        {size === 's' 
        ? <>
            <Title id={id} title={name} pad='px-1' />
            <Price price={price} pad='px-1 py-1' />
            <Location location={location.nombre} pad='px-1' />
            <Date date={formatDate(timestamp.toDate())} pad='px-1' />
            <CTA product={content} qty={1} toggle={size} detail={setCardDetail} pad='px-1 pt-2 pb-1' />
          </>
        : size === 'm'
          ? <div className="px-2 py-2 flex flex-col grow divide-y divide-gray-300">
              <Title id={id} title={name} pad='px-2 py-2' />
              <div className="px-1 pt-2 pb-1 flex flex-col">
                <Brand brand={brand} />
                <Description description={description} pad='px-1 py-1' />
                <div className="flex justify-between">
                  <Location location={location.nombre} pad='px-1 py-1' />
                  <Date date={formatDate(timestamp.toDate())} pad='px-1 py-1' />
                </div>
                <Price price={price} pad='px-1 py-1' />
                <Stock stock={stock} />
              </div>
              <CTA product={content} qty={1} toggle={size} detail={setCardDetail} pad='px-2 pt-2' />
            </div>
          : <div className="flex flex-col grow divide-y divide-gray-300">
              <Title id={id} title={name} pad='px-2 py-2' />
              <div className="flex flex-col gap-2">
                <Price price={price} pad='px-2 pt-2' />
                <Description description={description} pad='px-2' />
                <div className="w-full flex justify-between">
                  <Location location={location.nombre} pad='px-2' />
                  <Date date={formatDate(timestamp.toDate())} pad='px-2' />
                </div>
              </div>
              <CTA product={content} qty={1} toggle={size} detail={setCardDetail} pad='px-2 pt-2' />
            </div>
        }
      </Card>
      {cardDetail && <ProductModal content={content} handle={setCardDetail} />}
    </>
  )
}
