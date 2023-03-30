import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, BreadcrumbLink, DetailCTA, DetailDescription, DetailImage, DetailTitle, DetailUser, Loader, ProductsDetailSimilar, Reviews } from '../../components'
import { getProductDetail } from '../../services/firestore'

export const ProductDetail = () => {
  const {idDetail} = useParams()
  const [productDetail, setProductDetail] = useState()
  
  useEffect(() => {
    getProductDetail(idDetail,setProductDetail)
  },[idDetail])

  if(!productDetail) return <Loader />
  
  const {id, name, thumb, type, idUser, idProduct} = productDetail

  return (
    <>
      <Breadcrumb>
        {productDetail && <BreadcrumbLink name={name} to={`/product/${id}`} />}
      </Breadcrumb>
      <main className="main">
        <section className='px-2 flex flex-col gap-4'>
          <div className="flex flex-col items-center lg:flex-row lg:items-start gap-4">
            {/* Detail image */}
            <DetailImage thumb={thumb} name={name} />
            <div className='w-full flex flex-col gap-4 grow'>
              {/* Detail title */}
              <DetailTitle product={productDetail} />
              {/* Detail CTA */}
              <DetailCTA product={productDetail} />
              {/* Detail description */}
              <DetailDescription product={productDetail} />
              {/* Detail user */}
              <DetailUser user={idUser} />
            </div>
          </div>
          <Reviews product={id} />
          <ProductsDetailSimilar product={idProduct} type={type} />
        </section>
      </main>
    </>
  )
}
