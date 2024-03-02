import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProductDetail } from "../../services/shop"
import { useProfile } from "../../hooks/useProfile"
import { EditProductCondition, EditProductDescription, EditProductImages, EditProductPrice, EditProductShipping, EditProductTitle, Loader } from "../../components"

export const EditProduct = () => {
  const {idProduct} = useParams()
  const {profile} = useProfile()
  const [productToEdit, setProductToEdit] = useState()

  useEffect(() => {
    getProductDetail(idProduct, setProductToEdit)
  },[idProduct])

  if(!productToEdit || !profile) return <Loader />

  const {id,title,images} = productToEdit

  return (
    <section className="section section-xs px-2 py-4">
      <div className="editProduct-header">
        <div className="editProduct-header-product">
          <h4 className="editProduct-header-product-title">
            <Link to={`/product/${idProduct}`}>{title.join(' ')}</Link>
          </h4>
          <span className="editProduct-header-product-id">#{id}</span>
        </div>
        <img src={images[0].url} alt={images[0].name} className="editProduct-header-img" />
      </div>
      <EditProductTitle product={productToEdit} />
      <EditProductImages product={productToEdit} user={profile.email} />
      <EditProductPrice product={productToEdit} />
      <EditProductDescription product={productToEdit} />
      <EditProductCondition product={productToEdit} />
      <EditProductShipping product={productToEdit} />
    </section>
  )
}
