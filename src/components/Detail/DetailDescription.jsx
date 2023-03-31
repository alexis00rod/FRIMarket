export const DetailDescription = ({product}) => {
  const {description, brand, type, stock} = product
  return (
    <div className="box">
      <h4 className='box-header text-lg font-medium'>Descripcion</h4>
      <div className="box-body flex flex-col">
        <p className="w-full mb-2 text-sm line-clamp-4">{description}</p>
        <div className="flex flex-col">
          <p className='flex items-center gap-2 capitalize'>
            <span className='font-medium'>Marca: </span>{brand}
          </p>
          <p className='flex items-center gap-2 capitalize'>
            <span className='font-medium'>Tipo: </span>{type}
          </p>
          <p className='flex items-center gap-2 capitalize'>
            <span className='font-medium'>Disponibilidad:</span> 
            <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock}
              <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
