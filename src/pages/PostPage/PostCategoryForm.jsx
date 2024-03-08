import { Link } from "react-router-dom"
import { usePostContext } from "./context/PostContext"
import { useCategories } from "../../hooks/useCategories"
import { Loader, PostCategory, PostType } from "../../components"

export const PostCategoryForm = () => {
  const {productToPost, setProductToPost} = usePostContext()
  const {categories} = useCategories()
  
  const categorySelect = categories && categories.find(e => e.idCategory === productToPost.category)
  
  if(!categories.length) return <Loader />

  return (
    <section className="post">
      <div className="post-form">
        <div className="post-header">
          <div className="flex items-center justify-between">
            <p>Paso 2 de 5</p>
            <Link to='/post' className="btn btn-text-blue btn-m btn-text">
              <i className="fa-solid fa-arrow-left"></i>
              Anterior
            </Link>
          </div>
          <h2>
            {productToPost.category && productToPost.type
            ? 'Confirmá la categoría'
            : 'Genial, ahora selecciona la categoría.'}
          </h2>
        </div>
        <div className="post-inputs">
          {!productToPost.category && !productToPost.type && <PostCategory categories={categories} />}
          {productToPost.category && !productToPost.type && <PostType category={categorySelect} />}
          {productToPost.category && productToPost.type && 
            <div className="post-category-confirm">
              <i className={`fa-solid fa-${categorySelect.icon}`}></i>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 grow">
                <span  onClick={() => setProductToPost({...productToPost,category:'',type:''})}>
                  {categorySelect.name}
                </span>
                <i className="fa-solid fa-chevron-right"></i>
                <span onClick={() => setProductToPost({...productToPost,type:''})}>
                  {productToPost.type}
                </span>
              </div>
            </div>}
        </div>
        {productToPost.category && productToPost.type &&
          <div className="post-buttons">
            <Link to='/post/details-form' className="btn btn-blue btn-l btn-text">
              Confirmar
            </Link>
          </div>}
      </div>
    </section>
  )
}
