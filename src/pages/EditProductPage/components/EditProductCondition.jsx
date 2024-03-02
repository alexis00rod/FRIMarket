import { useState } from "react"
import { ButtonLoader, InputRadio } from "../../../components"
import { editProductDoc } from "../../../services/shop"

export const EditProductCondition = ({product}) => {
  const {condition} = product
  const [editProduct, setEditProduct] = useState(false)
  const [conditionProduct, setConditionProduct] = useState(condition)
  const [conditionProductLoader, setConditionProductLoader] = useState(false)

  const handleSubmitConditionProduct = async e => {
    e.preventDefault()
    setConditionProductLoader(true)
    try {
      await editProductDoc(product,{condition: conditionProduct})
      setConditionProductLoader(false)
      setEditProduct(false)
    } catch (err) {
      alert(err)
      setConditionProductLoader(false)
    }
  }

  return (
    <div className="editProduct-accordion">
      <div
        className="editProduct-accordion-handle"
        onClick={() => setEditProduct(!editProduct)}
      >
        <div className="editProduct-accordion-title">
          <span className="editProduct-accordion-title-section">Condición</span>
          <h4>
            {editProduct
              ? "Indicá el estado en que se encuentra tu producto."
              : `${condition}.`}
          </h4>
        </div>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      {editProduct && (
        <div className="editProduct-accordion-expand">
          <div className="editProduct-item">
            {['Nuevo','Usado','Reacondicionado'].map((option,i ) => 
              <InputRadio
              key={i}
              name='condition'
              id={option}
              checked={conditionProduct === option}
              onChange={({target:{id}}) => setConditionProduct(id)}
              >
                {option}
              </InputRadio>)}
          </div>
          <div className="editProduct-buttons">
            <button 
            className="btn btn-text-blue btn-m btn-text"
            disabled={condition === conditionProduct}
            onClick={() => setConditionProduct(condition)}
            >
              Cancelar
            </button>
            {conditionProductLoader
            ? <ButtonLoader />
            : <button 
              className="btn btn-blue btn-m btn-text"
              disabled={condition === conditionProduct}
              onClick={handleSubmitConditionProduct}
              >
                Continuar
              </button>}
          </div>
        </div>
      )}
    </div>
  );
}
