import { Link, useNavigate } from "react-router-dom"
import { usePostContext } from "./context/PostContext"
import { useCategories } from "../../hooks/useCategories"
import { useProfile } from "../../hooks/useProfile"
import { Loader, PostBrand, PostChangeCategory, PostCondition, PostDescription, PostImages, PostStock, PostTitle } from "../../components"

export const PostDetailsForm = () => {
  const {productToPost, validateDetail} = usePostContext()
  const {profile} = useProfile()
  const {categories} = useCategories()
  const navigate = useNavigate()

  const categorySelected = productToPost.category && categories && categories.find(e => e.idCategory === productToPost.category)

  const submitDetailForm = e => {
    e.preventDefault()
    const validate = validateDetail()
    if(validate) navigate('/post/sale-form')
  }

  const disabledDetailForm = () => {
    if (
      !productToPost.title ||
      productToPost.title.length === 0 ||
      (productToPost.title.length === 1 && productToPost.title[0] === "") ||
      !productToPost.type ||
      !productToPost.description ||
      !productToPost.condition ||
      !productToPost.brand ||
      !productToPost.stock
    ) {
      return true
    } else {
      return false
    }
  }

  if(!profile || !categories.length) return <Loader />

  return (
    <section className="post">
      <div className="post-form">
        <div className="post-header">
          <div className="flex items-center justify-between">
            <p>Paso 3 de 5</p>
            <Link to='/post' className="btn btn-text-blue btn-m btn-text">
              <i className="fa-solid fa-arrow-left"></i>
              Anterior
            </Link>
          </div>
          <h2>Perfecto, cuéntanos más sobre tu producto.</h2>
        </div>
        <div className="post-inputs">
          <PostImages profile={profile} />
          <PostTitle err='Se necesita un título' />
          <PostChangeCategory categories={categories} category={categorySelected} />
          <PostDescription />
          <PostBrand category={categorySelected} />
          <PostCondition />
          <PostStock />
        </div>
        <div className="post-buttons">
          <button 
          onClick={submitDetailForm} 
          className="btn btn-blue btn-l btn-text"
          disabled={disabledDetailForm()}
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  )
}
