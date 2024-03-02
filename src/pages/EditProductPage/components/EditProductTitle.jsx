import { useState } from "react"
import { formatCapitalize } from "../../../services/format"
import { editProductDoc } from "../../../services/shop"
import { ButtonLoader, InputText, Notification } from "../../../components"

export const EditProductTitle = ({product}) => {
  const {title} = product
  const [editProduct, setEditProduct] = useState(false) 
  const [titleProduct, setTitleProduct] = useState(title)
  const [titleProductError, setTitleProductError] = useState(false)
  const [titleProductLoader, setTitleProductLoader] = useState(false)

  const handleSubmitTitleProduct = async e => {
    e.preventDefault()
    setTitleProductLoader(true)
    if (titleProduct.length === 0 || (titleProduct.length === 1 && titleProduct[0] === '')) {
      setTitleProductError(true)
      setTitleProductLoader(false)
    } else {
        try {
          await editProductDoc(product,{title: titleProduct})
          setTitleProductLoader(false)
          setTitleProductError(false)
          setEditProduct(false)
        } catch (err) {
          alert(err)
          setTitleProductError(false)
          setTitleProductLoader(false)
        }
    }
  }

  const handleCancelEdit = () => {
    setTitleProduct(title)
    setTitleProductError(false)
  }

  return (
    <div className="editProduct-accordion">
      <div className="editProduct-accordion-handle" onClick={() => setEditProduct(!editProduct)}>
        <div className="editProduct-accordion-title">
          <span className="editProduct-accordion-title-section">Título</span>
          <h4>
            {editProduct
            ? 'Incluí producto, marca, modelo y destacá sus características principales'
            : formatCapitalize(title.join(' '))}
          </h4>
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      {editProduct &&
        <div className="editProduct-accordion-expand">
          <div className="editProduct-item ">
            <InputText 
            name='title'
            value={titleProduct.join(' ') || ''}
            onChange={({target: {value}}) => setTitleProduct(value.split(' '))}
            />
            {titleProductError && <Notification message='Completa este campo.' />}
          </div>
          <div className="editProduct-buttons">
            <button 
            className="btn btn-m btn-text-blue btn-text" 
            onClick={handleCancelEdit} 
            disabled={title.join(' ') === titleProduct.join(' ')}
            >
              Cancelar
            </button>
            {titleProductLoader
            ? <ButtonLoader />
            : <button 
              className="btn btn-m btn-blue btn-text" 
              onClick={handleSubmitTitleProduct} 
              disabled={title.join(' ') === titleProduct.join(' ')}
              >
                Confirmar
              </button>}
          </div>
        </div>}
    </div>
  )
}
