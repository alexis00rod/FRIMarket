export const ProductModal = ({content, handle}) => {
  const {name,thumb,stock,description,price} = content

  return (
    <div className='fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center bg-gray-900/25' onClick={() => handle(false)}>
      <div className="w-full max-w-screen-lg h-max px-2 pt-2 pb-4 bg-white rounded-md" onClick={e => e.stopPropagation()}>
        <div className="w-full flex justify-end">
          <button className='w-8 h-8 flex items-center justify-center hover:text-blue-500' onClick={() => handle(false)}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <div className="px-2 flex gap-2">
          <div className="px-2">
            <figure className='w-80 h-full px-1 py-1 flex justify-center items-center border-2 border-gray-300 rounded-md'>
              <img src={thumb} alt={name} />
            </figure>
          </div>
          <div className="px-2 flex flex-col grow divide-y divide-gray-300">
            <div className="pb-2">
              <h3 className='text-lg font-medium'>{name}</h3>
            </div>
            <div className="py-2 flex flex-col gap-2">
              <p className='text-sm text-gray-400'>{description}</p>
              <h4 className='text-xl font-medium text-yellow-500'>${price}</h4>
              <p className='flex items-center gap-2'>Disponibilidad: 
                <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock}
                  <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
                </span>
                </p>
              <div className="flex items-center gap-4">
                <div className="w-max flex rounded-md overflow-hidden border border-gray-300">
                  <button className='w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600'><i className="fa-solid fa-minus"></i></button>
                  <span className='w-8 h-8 flex items-center justify-center'>0</span>
                  <button className='w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600'><i className="fa-solid fa-plus"></i></button>
                </div>
                <button className="px-2 h-8 flex justify-center items-center gap-2 bg-blue-500 text-white rounded-md">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="text-sm">Agregar al carrito</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
