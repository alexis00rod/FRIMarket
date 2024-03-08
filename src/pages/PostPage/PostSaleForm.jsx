import { Link, useNavigate } from "react-router-dom";
import { usePostContext } from "./context/PostContext";
import { PostPrice, PostShipping } from "../../components";

export const PostSaleForm = () => {
  const {productToPost,validateSale} = usePostContext()
  const navigate = useNavigate()

  const submitProduct = e => {
    e.preventDefault() 
    const validate = validateSale()
    if(validate) navigate('/post/contact-form')
  }

  return (
    <section className="post">
      <div className="post-form">
        <div className="post-header">
          <div className="flex items-center justify-between">
            <p>Paso 4 de 5</p>
            <Link to="/post/details-form" className="btn btn-text-blue btn-m btn-text">
              <i className="fa-solid fa-arrow-left"></i>
              Anterior
            </Link>
          </div>
          <h2>Antes de terminar, definamos las condiciones de venta</h2>
        </div>
        <div className="post-inputs">
          <PostPrice />
          <PostShipping />
        </div>
        <div className="post-buttons">
          <button 
          onClick={submitProduct} 
          className="btn btn-blue btn-l btn-text"
          disabled={!productToPost.price || !productToPost.shipping}
          >
            Publicar
          </button>
        </div>
      </div>
    </section>
  )
}