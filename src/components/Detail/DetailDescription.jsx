import moment from "moment"
import { DetailCategory, DetailLocation, DetailUser } from "../index.js"

export const DetailDescription = ({product}) => {
  const {description, category, brand, type, stock, price, province, timestamp, idUser} = product

  const DetailType = () => <p className='flex items-center gap-2 capitalize'><span className='font-medium'>Tipo: </span>{type}</p>

  const DetailBrand = () => <p className='flex items-center gap-2 capitalize'><span className='font-medium'>Marca: </span>{brand}</p>

  const DetailDate = () => <p className='flex items-center gap-2 capitalize'><span className='font-medium'>Fecha de publicacion: </span>{moment(timestamp.toDate()).fromNow()}</p>

  const DetailStock = () => {
    return (
      <p className='flex items-center gap-2 capitalize'>
        <span className='font-medium'>Disponibilidad:</span> 
        <span className={`flex items-center gap-2 ${stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {stock}
          <i className={`fa-solid fa-${stock > 0 ? 'check' : 'circle-xmark'}`}></i>
        </span>
      </p>
    )
  }

  return (
    <>
      <h3 className='box-body text-3xl text-yellow-500 font-medium'>${price}</h3>
      <div className="box-body flex flex-col gap-2">
        <p className="w-full text-sm line-clamp-4">{description}</p>
        <div className="flex flex-col">
          <DetailCategory category={category} />
          <DetailType />
          <DetailBrand />
          <DetailStock />
          <DetailLocation location={province} />
          <DetailDate />
          <DetailUser user={idUser} />
        </div>
      </div>
    </>
  )
}
