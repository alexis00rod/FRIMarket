import { useState } from 'react'
import { Link } from "react-router-dom"
import { ProductModal } from '../index.js'

export const ProductCard = ({content, style}) => {
  const [cardDetail, setCardDetail] = useState(false)
  const {id,name,thumb,price,description} = content

  return (
    <>
      <article className={`px-2 py-2 flex ${style === 'grid' ? 'flex-col items-center' : 'flex-row items-start'} bg-white border border-gray-300 rounded-md duration-150 hover:shadow-md hover:scale-102`}>
        <Link to={`/product/${id}`} className='px-1 py-1 w-56 h-56 flex items-center justify-center flex-none'>
          <img src={thumb} alt={name} />
        </Link>
        <div className="px-1 w-full flex flex-col">
          <h3 className={`w-full px-1 pt-1 pb-2 flex ${style === 'grid' && 'justify-center'} text-lg font-medium border-b border-gray-300`}>
            <Link to={`/product/${id}`} className='w-max'>{name}</Link>
          </h3>
          <div className={`px-1 py-2 ${style === 'grid' ? 'flex-row items-center' : 'flex-col'} border-b border-gray-300`}>
            <h4 className={`${style === 'list' && 'mb-3'} grow text-xl text-yellow-500 font-medium`}>${price}</h4>
            {style === 'list' && <p className='py-1 mb-2 text-sm text-gray-500 line-clamp-2'>{description}</p>}
            <div className="w-max py-1 flex text-sm text-yellow-500">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="py-2 flex gap-2">
            <button 
            className={`h-8 px-2 flex items-center ${style === 'grid' && 'grow'} gap-2 bg-blue-500 text-white rounded-md`}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className='text-sm'>Agregar al carrito</span>
            </button>
            <button className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-md'><i className="fa-solid fa-heart"></i></button>
            <button 
            className='w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-md'
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
