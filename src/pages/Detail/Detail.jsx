import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '../../services/shop.js'
import { Breadcrumb, BreadcrumbLink, DetailCTA, DetailDescription, DetailImage, DetailTitle, Loader, Reviews, Main, SimilarSlider, Element } from '../../components'

export const Detail = () => {
  const {idDetail} = useParams()
  const [productDetail, setProductDetail] = useState()
  
  useEffect(() => {
    getProductDetail(idDetail,setProductDetail)
  },[idDetail])

  if(!productDetail) return <Loader />
  
  const {id,name,thumb} = productDetail

  return (
    <>
    <Breadcrumb>
      <BreadcrumbLink name={name} to={`/product/${id}`} />
    </Breadcrumb>
    <Main>
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-4">
        <DetailImage thumb={thumb} name={name} />
        <Element flex='flex-col divide-y divide-gray-300'>
          <DetailTitle product={productDetail} />
          <DetailDescription product={productDetail} />
          <DetailCTA product={productDetail} />
        </Element>
      </div>
      <Reviews product={id} />
      <SimilarSlider product={productDetail} />
    </Main>
    </>
  )
}
