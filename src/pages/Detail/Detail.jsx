import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '../../services/shop.js'
import { formatDateFromNow, formatPrice } from '../../services/format.js'
import { DetailImages, DetailTitle, Loader, DetailReviews, DetailSimiliarProducts, DetailAdditionalInfo, DetailSeller, DetailCategory, BtnAddWishlist, BtnShare, BtnAddCart } from '../../components'

export const Detail = () => {
  const {idDetail} = useParams()
  const [productDetail, setProductDetail] = useState()
  
  useEffect(() => {
    getProductDetail(idDetail,setProductDetail)
  },[idDetail])

  if(!productDetail) return <Loader />

  const {id, images, price, category, type, description, brand, date, stock, condition, user:{email, name, province, city}} = productDetail

  return (
    <section className='detail'>
      <div className='detail-main'>
        <div className='detail-title-mobile'>
          {/* Titulo */}
          <DetailTitle product={productDetail} />
          {/* Categorias */}
          <DetailCategory category={category} type={type}/>
        </div>
        {/* Imagenes */}
        <DetailImages images={images} />
        <div className="detail-main-controls">
          <div className='detail-title-desktop'>
          {/* Titulo */}
            <DetailTitle product={productDetail} />
            {/* Categoria */}
            <DetailCategory category={category} type={type}/>
          </div>
          {/* Vendedor */}
          <DetailSeller user={email} />
          {/* Precio */}
          <h3 className='detail-price'>${formatPrice(price)}</h3>
          {/* Agregar al carrito */}
          <BtnAddCart product={productDetail} />
          {/* Agregar a favorito */}
          <BtnAddWishlist product={productDetail} />
          {/* Compartir */}
          <BtnShare />
        </div>
      </div>
      <div className="detail-info">
        <h3>Descripción</h3>
        <div className="flex flex-col">
          {/* Descripcion */}
          <p className="detail-info-description">{description}</p>
          {/* Stock */}
          <DetailAdditionalInfo title='Disponibilidad' info={stock} />
          {/* Marca */}
          <DetailAdditionalInfo title='Marca' info={brand} />
          {/* Condicion */}
          <DetailAdditionalInfo title='Condición' info={condition} />
          {/* Ubicacion */}
          <DetailAdditionalInfo title='Ubicación' info={`${province.name}, ${city.name}`} />
          {/* Fecha de publicacion */}
          <DetailAdditionalInfo title='Fecha de publicacíon' info={date && formatDateFromNow(date)} />
          {/* Usuario */}
          <DetailAdditionalInfo title='Publicado por' info={name} />
        </div>
      </div>
      {/* Reseñas */}
      <div className="detail-reviews">
        <h3>Opiniones del producto</h3>
        <DetailReviews product={id} />
      </div>
      {/* Productos similares */}
      <DetailSimiliarProducts product={productDetail} />
    </section>
  )
}