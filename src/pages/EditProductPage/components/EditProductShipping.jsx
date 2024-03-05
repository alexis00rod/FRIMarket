import { useState } from "react"
import { editProductDoc } from "../../../services/shop"
import { ButtonLoader, InputRadio } from "../../../components"

export const EditProductShipping = ({product}) => {
  const {shipping} = product
  const [editProduct, setEditProduct] = useState(false)
  const [shippingProduct,setShippingProduct] = useState(shipping)
  const [shippingProductLoader,setShippingProductLoader] = useState(false)

  const submitShippingProduct = async e => { 
    e.preventDefault()
    setShippingProductLoader(true)
    try {
      await editProductDoc(product,{shipping: shippingProduct})
      setShippingProductLoader(false)
      setEditProduct(false)
    } catch (err) {
      alert(err)
      setShippingProductLoader(false)
    }
  }

  return (
    <div className="editProduct-accordion">
      <div
        className="editProduct-accordion-handle"
        onClick={() => setEditProduct(!editProduct)}
      >
        <div className="editProduct-accordion-title">
          <span>Envío</span>
          <h4>
            {editProduct
            ? 'Cómo entregás el producto'
            : `${shipping}.`}
          </h4>
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      {editProduct && (
        <div className="editProduct-accordion-expand">
          <div className="editProduct-item">
          {['Envío gratis','Envío standard'].map((option,i) => 
            <InputRadio
            key={i}
            name='shipping'
            id={option}
            checked={shippingProduct === option}
            onChange={({target:{id}}) => setShippingProduct(id)}
            >
              {option}
            </InputRadio>)}
          </div>
          <div className="editProduct-buttons">
            <button 
            className="btn btn-text-blue btn-text btn-m"
            disabled={shipping === shippingProduct}
            >
              Cancelar
            </button>
            {shippingProductLoader
            ? <ButtonLoader />
            : <button 
              className="btn btn-blue btn-text btn-m"
              disabled={shipping === shippingProduct}
              onClick={submitShippingProduct}
              >
                Continuar
              </button>}
          </div>
        </div>
      )}
    </div>
  );
}
