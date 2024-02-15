import { useNavigate } from "react-router-dom"
import { usePostContext } from "./context/PostContext"
import { PostTitle } from "../../components"

export const PostProduct = () => {
  const {validateProduct} = usePostContext()
  const navigate = useNavigate()

  const submitTitle = e => {
    e.preventDefault()
    const validate = validateProduct()
    if(validate) navigate('/post/category-form')
  }
  
  return (
    <main className="grow flex flex-col">
      <section className="relative w-full md:max-w-[33rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
        {/* Contador de pasos */}
        <div className="mt-6 md:mt-0 h-10 flex items-center">
          <p className="text-xs font-light">Paso 1 de 5</p>
        </div>
        {/* Titulo */}
        <h2 className="text-2xl font-medium">¡Hola! Antes que nada contanos, ¿qué vas a publicar?</h2>
        {/* Formulario */}
        <PostTitle label='Escribí nombre, marca o modelo' err='Para comenzar indica el producto que queres publicar' />
        {/* Boton para continuar */}
        <div className="absolute md:static bottom-0 left-0 w-full px-6 md:px-0 py-6 md:py-0 mt-6">
          <button onClick={submitTitle} className="btn btn-blue btn-l">
            <span className="text-sm font-medium">Continuar</span>
          </button>
        </div>
      </section>
    </main>
  )
}
