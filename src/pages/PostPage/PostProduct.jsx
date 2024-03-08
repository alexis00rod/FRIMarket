import { useNavigate } from "react-router-dom"
import { usePostContext } from "./context/PostContext"
import { PostTitle } from "../../components"

export const PostProduct = () => {
  const {productToPost, validateProduct} = usePostContext()
  const navigate = useNavigate()

  const submitTitle = e => {
    e.preventDefault()
    const validate = validateProduct()
    if(validate) navigate('/post/category-form')
  }

  return (
    <section className="post">
      <div className="post-form">
        <div className="post-header">
          <p>Paso 1 de 5</p>
          <h2>¡Hola! Antes que nada contanos, ¿qué vas a publicar?</h2>
        </div>
        <div className="post-inputs">
          <PostTitle label='Escribí nombre, marca o modelo' err='Para comenzar indica el producto que queres publicar' />
        </div>
        <div className="post-buttons">
          <button 
          disabled={!productToPost.title || productToPost.title.length === 0 || (productToPost.title.length === 1 && productToPost.title[0] === '')} 
          onClick={submitTitle} 
          className="btn btn-blue btn-l btn-text"
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  )
}
