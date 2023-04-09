import { Link } from "react-router-dom"
import { DetailCategory, DetailLocation } from "../index.js"
import moment from "moment"

export const DetailDescription = ({product}) => {
  const {description,price,stock,type,brand,category,date,user:{idUser,displayName},location:{province,city}} = product

  const DetailType = () => <p className='flex items-center gap-2 capitalize'><span className='font-medium'>Tipo: </span>{type}</p>

  const DetailBrand = () => <p className='flex items-center gap-2 capitalize'><span className='font-medium'>Marca: </span>{brand}</p>

  const DetailDate = () => <p className='flex items-center gap-2 capitalize'><span className='font-medium'>Fecha de publicacion: </span>{moment(date.toDate()).fromNow()}</p>

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

  const DetailUser = () => {
    return (
      <p className='flex items-center gap-2 capitalize'>
        <span className='font-medium'>Publicado por: </span>
        <Link to={`/profile/${idUser}`} className="duration-200 hover:text-yellow-500">{displayName}</Link>
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
          <DetailLocation province={province} city={city} />
          <DetailDate />
          <DetailUser id={idUser} name={displayName} />
        </div>
      </div>
    </>
  )
}
