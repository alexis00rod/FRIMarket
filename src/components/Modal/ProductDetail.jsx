import { BtnAddCart, BtnAddWishlist, Modal } from "../index.js"

export const ProductDetail = ({product, handle}) => {
  const {name,description,price,stock,thumb} = product

  return (
    <Modal  direction='modal-center' title={name} size='modal-l' handle={handle} >
      <div className="w-full flex flex-wrap justify-center gap-4">
        <figure className='w-full max-w-btn-l h-full px-1 py-1 flex justify-center items-center flex-none border-2 border-gray-300 rounded-md'>
          <img src={thumb} alt={name} />
        </figure>
        <div className="w-full flex flex-col grow">
          <h3 className='w-full px-2 py-2 text-lg font-medium border-b border-gray-300'>{name}</h3>
          <div className="w-full px-2 pt-2 flex flex-col items-center gap-2">
            <p className='w-full text-sm text-gray-400 line-clamp-6'>{description}</p>
            <h4 className='w-full text-xl font-medium text-yellow-500'>${price}</h4>
            <p className='w-full flex items-center gap-2'>Disponibilidad: 
              <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock}
                <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
              </span>
            </p>
            <div className="w-full flex justify-center flex-wrap gap-4">
              <BtnAddCart product={product} qty={1} size='btn-l' />
              <BtnAddWishlist product={product} size='btn-l' />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
