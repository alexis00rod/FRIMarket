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
    <main className="grow flex flex-col">
      <section className="relative w-full md:max-w-[33rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
        {/* Contador de pasos */}
        <div className="mt-6 md:mt-0 h-10 flex items-center">
          <p className="grow text-xs font-light">Paso 2 de 5</p>
          <Link to='/post' className="btn btn-text-blue btn-m">
            <i className="fa-solid fa-arrow-left"></i>
            <span className="text-sm font-medium">Anterior</span>
          </Link>
        </div>
        {/* Titulo */}
        <h2 className="text-2xl font-medium">
          {productToPost.category && productToPost.type
          ? 'Confirmá la categoría'
          : 'Genial, ahora selecciona la categoría.'}
        </h2>
        {/* Formulario */}
        <div className="mt-6">
          {/* Categoria */}
          {!productToPost.category && !productToPost.type && <PostCategory categories={categories} />}
          {/* Tipo */}
          {productToPost.category && !productToPost.type && <PostType category={categorySelect} />}
          {/* Boton para continuar */}
          {productToPost.category && productToPost.type &&
            <>
              <div className="px-4 py-4 flex border border-slate-300 rounded-md">
                <i className={`w-11 h-11 flex items-center justify-center flex-none text-lg bg-yellow-500 text-white rounded-full fa-solid fa-${categorySelect.icon}`}></i>
                <div className="pl-4 flex items-center flex-wrap gap-x-2 gap-y-1 grow text-sm">
                  <span 
                  className="text-blue-500 duration-150 cursor-pointer hover:text-blue-700"
                  onClick={() => setProductToPost({...productToPost,category:'',type:''})}
                  >
                    {categorySelect.name}
                  </span>
                  <i className="text-gray-500 fa-solid fa-chevron-right"></i>
                  <span
                  className="text-blue-500 duration-150 cursor-pointer hover:text-blue-700"
                  onClick={() => setProductToPost({...productToPost,type:''})}
                  >
                    {productToPost.type}
                  </span>
                </div>
              </div>
              <div className="absolute md:static bottom-0 left-0 w-full px-6 md:px-0 py-6 md:py-0 mt-6">
                <Link to='/post/details-form' className="btn btn-blue btn-l">
                  <span className="text-sm font-medium">Confirmar</span>
                </Link>
              </div>
            </>}
        </div>
      </section>
    </main>
  )
}
