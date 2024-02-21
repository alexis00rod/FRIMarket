import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '../../services/shop.js'
import { Breadcrumb, BreadcrumbLink, DetailCTA, DetailDescription, DetailImages, DetailTitle, Loader, DetailReviews, DetailSimiliarProducts, DetailAdditionalInfo, DetailPrice, DetailSeller, DetailCategory } from '../../components'
import moment from "moment"

export const Detail = () => {
  const {idDetail} = useParams()
  const [productDetail, setProductDetail] = useState()
  
  useEffect(() => {
    getProductDetail(idDetail,setProductDetail)
  },[idDetail])

  if(!productDetail) return <Loader />

  const {id, title, images, price, category, type, description, brand, date, stock, condition, user:{email, name, province, city}} = productDetail

  return (
    <main className="flex flex-col grow">
      <Breadcrumb>
        <BreadcrumbLink name={title} to={`/product/${id}`} />
      </Breadcrumb>
      <section className='w-full max-w-[1200px] px-2 py-4 mx-auto flex flex-col gap-4'>
        <div className='w-full flex flex-col lg:flex-row lg:items-start gap-4'>
          {/* Imagenes */}
          <DetailImages images={images} />
          <div className="w-full lg:w-[400px] p-4 flex flex-col flex-none gap-2 bg-white border border-slate-300 rounded-md">
            {/* Titulo */}
            <DetailTitle product={productDetail} />
            {/* Categoria */}
            <DetailCategory category={category} type={type}/>
            {/* Vendedor */}
            <DetailSeller user={email} />
            {/* Precio */}
            <DetailPrice price={price} />
            {/* <DetailCTA product={productDetail} /> */}
          </div>
        </div>
        <div className="w-full p-4 flex flex-col bg-white border border-slate-300 rounded-md">
          <h3 className='px-2 pb-2 grow text-lg font-medium'>Descripción</h3>
          <div className="px-2 flex flex-col">
            {/* Descripcion */}
            <DetailDescription description={description} />
            {/* Marca */}
            <DetailAdditionalInfo title='Marca' info={brand} />
            {/* Stock */}
            <DetailAdditionalInfo title='Stock' info={stock} />
            {/* Condicion */}
            <DetailAdditionalInfo title='Condición' info={condition} />
            {/* Ubicacion */}
            <DetailAdditionalInfo title='Ubicación' info={`${province.name}, ${city.name}`} />
            {/* Precio */}
            <DetailAdditionalInfo title='Precio' info={moment(date.toDate()).fromNow()} />
            {/* Usuario */}
            <DetailAdditionalInfo title='Publicado por' info={name} />
          </div>
        </div>
        {/* Reseñas */}
        <div className="w-full p-4 flex flex-col bg-white border border-slate-300 rounded-md">
          <h3 className='px-2 pb-2 grow text-lg font-medium'>Opiniones del producto</h3>
          <DetailReviews product={id} />
        </div>
        {/* Productos similares */}
        <DetailSimiliarProducts product={productDetail} />
      </section>
    </main>
  )
}
