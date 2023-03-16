import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { formatDate } from '../../services/formatDate.js'
import { getLocation } from '../../services/locations.js'
import { BtnAddCart, BtnAddWishlist, ProductModal } from '../index.js'

const Card = ({size,direction,children}) => {
  return (
    <article className={`${size} px-2 py-2 flex flex-${direction} flex-none gap-2 bg-white border border-gray-300 rounded-md`}>
      {children}
    </article>
  )
}

const Thumb = ({id,size,thumb,name}) => {
  return (
    <Link to={`/product/${id}`} className={`${size} px-1 py-1 flex items-center justify-center`}>
      <img src={thumb} alt={name} className='w-full h-full object-contain' />
    </Link>
  )
}

const Title = ({id,title}) => {
  return (
    <Link to={`/product/${id}`} className='w-full px-2 py-2 flex items-center'>
      <h3 className='w-max font-medium line-clamp-1'>{title}</h3>
    </Link>
  )
}

const Price = ({price}) => <h4 className='px-1 text-xl text-yellow-500 font-semibold'>${price}</h4>

const Description = ({description}) => <p className='px-1 text-sm text-gray-500 line-clamp-2'>{description}</p>

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

const Location = ({location}) => <p className='max-w-btn px-1 py-1 text-sm text-gray-500 truncate' >{location}, Argentina</p>

const Date = ({date}) => <p className='px-1 py-1 text-sm text-gray-500 truncate' >{date}</p>

export const ProductCard = ({content, style, size}) => {
  const [cardDetail, setCardDetail] = useState(false)
  const {id,name,thumb,price,description,province,timestamp,stock,brand} = content
  const [location, setLocation] = useState({})

  useEffect(() => {
    getLocation(province)
    .then(resp => setLocation(resp))
    
  },[province])



  if(size === 'm') return (
    <>
      <Card size='w-1/2' direction='row'>
        <Thumb id={id} size='w-full max-w-xs h-40 h-full flex-none' thumb={thumb} name={name} />
        <div className="px-2 py-2 flex flex-col grow divide-y divide-gray-300">
          <Title id={id} title={name} />
          <div className="px-1 pt-2 pb-1 flex flex-col">
            <Brand brand={brand} />
            <Description description={description} />
            <div className="flex justify-between">
              <Location location={location.nombre} />
              <Date date={formatDate(timestamp.toDate())} />
            </div>
            <Price price={price} />
            <Stock stock={stock} />
          </div>
        </div>
      </Card>
    </>
  )


  return (
    <>
      <article className={`w-full max-w-xs px-1 py-1 flex ${style === 'grid' ? 'flex-col items-center' : 'flex-row items-start'} flex-none bg-white border border-gray-300 rounded-md duration-150 hover:shadow-xl`}>
        <Link to={`/product/${id}`} className='w-full max-w-xs h-56 px-1 py-1 flex items-center justify-center flex-none overflow-hidden'>
          <img src={thumb} alt={name} className='h-full object-contain' />
        </Link>
        <div className="px-2 py-1 w-full h-full flex flex-col justify-between grow">
          <div className={`flex flex-col ${style === 'list' && ''}`}>
            <h4 className={`px-1 py-1 text-lg text-yellow-500 font-medium`}>${price}</h4>
            <h3 className={`w-full px-1 py-1 flex font-medium`}>
              <Link to={`/product/${id}`} className='w-max line-clamp-1'>{name}</Link>
            </h3>
            {style === 'list' && <p className='py-1 mb-2 text-sm text-gray-500 line-clamp-2'>{description}</p>}
          </div>
          <div className={`flex flex-col`}>
            <p className='px-1 text-sm text-gray-500 truncate'>{location.nombre}, Argentina</p>
            <p className='px-1 text-sm text-gray-500 truncate' >{formatDate(timestamp.toDate())}</p>
          </div>
          <div 
          className={`w-full px-1 pt-2 flex gap-2 `}
          >
            <BtnAddCart product={content} qty={1} />
            <BtnAddWishlist product={content} toggle={style === 'grid'}/>
            <button 
            className='w-8 h-8 flex items-center justify-center flex-none bg-yellow-500 text-white rounded-md'
            onClick={() => setCardDetail(true)}
            >
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
      </article>
      {cardDetail && <ProductModal content={content} handle={setCardDetail} />}
    </>
  )
}
