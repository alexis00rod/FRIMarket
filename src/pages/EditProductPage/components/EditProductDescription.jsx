import { useState } from "react"
import { ButtonLoader, Textarea } from "../../../components"
import { editProductDoc } from "../../../services/shop"

export const EditProductDescription = ({product}) => {
  const {description} = product
  const [editProduct, setEditProduct] = useState(false) 
  const [descriptionProduct,setDescriptionProduct] = useState(description)
  const [descriptionProductLoader,setDescriptionProductLoader] = useState(false)

  const submitDescriptionProduct = async e => {
    e.preventDefault()
    setDescriptionProductLoader(true)
    try {
      await editProductDoc(product,{description: descriptionProduct})
      setDescriptionProductLoader(false)
      setEditProduct(false)
    } catch (err) {
      alert(err)
      setDescriptionProductLoader(false)
    }
  }

  return (
    <div className="editProduct-accordion">
      <div
        className="editProduct-accordion-handle"
        onClick={() => setEditProduct(!editProduct)}
      >
        <div className="editProduct-accordion-title">
          <span className="editProduct-accordion-title-section">
            Descripción <span className="font-light">| Opcional</span>
          </span>
          <h4>
            {editProduct
              ? "Detallá las principales características de tu producto."
              : description
              ? "Ya tenés una descripción cargada"
              : "Aún no cargaste la descripción"}
          </h4>
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      {editProduct && (
        <div className="editProduct-accordion-expand">
          <div className="editProduct-item">
            <Textarea
              id="description"
              name="description"
              value={descriptionProduct}
              onChange={({target:{value}}) => setDescriptionProduct(value)}
              placeholder="Escribí acá más información para tus compradores"
            />
          </div>
          <div className="editProduct-buttons">
            <button 
            className="btn btn-text-blue btn-m btn-text"
            disabled={description === descriptionProduct}
            onClick={() => setDescriptionProduct(description)}
            >
              Cancelar
            </button>
            {descriptionProductLoader
            ? <ButtonLoader />
            : <button 
              className="btn btn-blue btn-m btn-text"
              disabled={description === descriptionProduct}
              onClick={submitDescriptionProduct}
              >
                Continuar
              </button>}
          </div>
        </div>
      )}
    </div>
  );
}
