import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, BreadcrumbLink, DetailCTA, DetailDescription, DetailImage, DetailTitle, DetailUser, Loader, Reviews, Main, SimilarSlider } from '../../components'
import { getProductDetail } from '../../services/firestore'

export const Detail = () => {
  const {idDetail} = useParams()
  const [productDetail, setProductDetail] = useState()
  
  useEffect(() => {
    getProductDetail(idDetail,setProductDetail)
  },[idDetail])

  if(!productDetail) return <Loader />
  
  const {id, name, thumb, type, idUser, idProduct} = productDetail

  if(!productDetail) return <Loader />

  return (
    <Main>
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-2">
        {/* Detail image */}
        <DetailImage thumb={thumb} name={name} />
        <div className='w-full flex flex-col gap-2 grow'>
          {/* Detail title */}
          <DetailTitle product={productDetail} />
          {/* Detail CTA */}
          {/* <DetailCTA product={productDetail} /> */}
          {/* Detail description */}
          <DetailDescription product={productDetail} />
          {/* Detail user */}
          <DetailUser user={idUser} />
        </div>
      </div>
      {/* <Reviews product={id} /> */}
      <SimilarSlider product={productDetail} />
      {/* <ProductsDetailSimilar product={idProduct} type={type} /> */}
    </Main>
  )
}
