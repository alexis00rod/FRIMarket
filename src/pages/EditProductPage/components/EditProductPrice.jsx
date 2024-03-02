import { useState } from "react"
import { formatNumber, formatPrice } from "../../../services/format"
import { editProductDoc } from "../../../services/shop"
import { ButtonLoader, Notification } from "../../../components"
import { InputPrice } from "../../../components/Form/InputPrice"

export const EditProductPrice = ({product}) => {
  const [editProduct, setEditProduct] = useState(false)
  const [priceProduct, setPriceProduct] = useState(formatPrice(product.price))
  const [priceProductError,setPriceProductError] = useState(false)
  const [priceProductLoader, setPriceProductLoader] = useState(false)

  const submitPriceProduct = async e => {
    e.preventDefault()
    setPriceProductLoader(true)
    if(!priceProduct) {
      setPriceProductError(true)
      setPriceProductLoader(false)
    } else {
        try {
          await editProductDoc(product,{price: formatNumber(priceProduct)})
          setPriceProductError(false)
          setPriceProductLoader(false)
          setEditProduct(false)
        } catch (err) {
          alert(err)
          setPriceProductError(false)
          setPriceProductLoader(false)
        }
    }
  }

  const handleCancelEdit = () => {
    setPriceProduct(formatPrice(product.price))
    setPriceProductError(false)
  }

  return (
    <div className="editProduct-accordion">
      <div
        className="editProduct-accordion-handle"
        onClick={() => setEditProduct(!editProduct)}
      >
        <div className="editProduct-accordion-title">
          <span className="editProduct-accordion-title-section">Precio</span>
          <h4>
            {editProduct
              ? "Indicá a cuánto querés vender el producto"
              : `$${formatPrice(product.price)}`}
          </h4>
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      {editProduct && (
        <div className="editProduct-accordion-expand">
          <div className="editProduct-item">
            <InputPrice 
            name=''
            id=''
            value={priceProduct || ''}
            onChange={({target:{value}}) => setPriceProduct(formatPrice(value))}
            />
            {priceProductError && <Notification message='Completa este campo.' />}
          </div>
          <div className="editProduct-buttons">
            <button 
            className="btn btn-text-blue btn-text btn-m"
            disabled={formatPrice(product.price) === priceProduct}
            onClick={handleCancelEdit}
            >
              Cancelar
            </button>
            {priceProductLoader
            ? <ButtonLoader />
            : <button 
              className="btn btn-blue btn-text btn-m"
              disabled={formatPrice(product.price) === priceProduct}
              onClick={submitPriceProduct}
              >
                Continuar
              </button>}
          </div>
        </div>
      )}
    </div>
  );
}
