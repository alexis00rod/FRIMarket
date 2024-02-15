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

  if(!profile && !categories.length) return <Loader />

  return (
    <main className="grow flex flex-col">
      <section className="w-full md:max-w-[44rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
        <div className="mt-6 md:mt-0 h-10 flex items-center">
          <p className="grow text-xs font-light">Paso 3 de 5</p>
          <Link to='/post/category-form' className="btn btn-text-blue btn-m">
            <i className="fa-solid fa-arrow-left"></i>
            <span className="text-sm font-medium">Anterior</span>
          </Link>
        </div>
        <h2 className="text-2xl font-medium">Perfecto, cuéntanos más sobre tu producto.</h2>
        <div className="flex flex-col divide-y divide-slate-300">
          {/* Imagenes */}
          <PostImages profile={profile} />
          {/* Título */}
          <PostTitle err='Se necesita un título' />
          {/* Categoría */}
          <PostChangeCategory categories={categories} category={categorySelected} />
          {/* Descripción */}
          <PostDescription />
          {/* Marca */}
          <PostBrand category={categorySelected} />
          {/* Estado del producto */}
          <PostCondition />
          {/* Stock */}
          <PostStock />
          <div className="mt-6 pt-6">
            <button onClick={submitDetailForm} className="btn btn-blue btn-l">
              <span className="text-sm font-medium">Continuar</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
