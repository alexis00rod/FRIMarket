import { Link, useNavigate } from "react-router-dom";
import { usePostContext } from "./context/PostContext";
import { PostPrice, PostShipping } from "../../components";

export const PostSaleForm = () => {
  const {validateSale} = usePostContext()
  const navigate = useNavigate()

  const submitProduct = e => {
    e.preventDefault() 
    const validate = validateSale()
    if(validate) navigate('/post/contact-form')
  }

  return (
    <main className="grow flex flex-col">
      <section className="w-full md:max-w-[33rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
        <div className="mt-6 md:mt-0 h-10 flex items-center">
          <p className="grow text-xs font-light">Paso 4 de 5</p>
          <Link to="/post/details-form" className="btn btn-text-blue btn-m">
            <i className="fa-solid fa-arrow-left"></i>
            <span className="text-sm font-medium">Anterior</span>
          </Link>
        </div>
        <h2 className="mt-6 md:mt-0 text-2xl font-medium">
          Antes de terminar, definamos las condiciones de venta
        </h2>
        <div className="flex flex-col divide-y divide-slate-300">
          {/* Precio */}
          <PostPrice />
          {/* Método de envío */}
          <PostShipping />
        </div>
        <div className="w-full mt-6 flex flex-wrap gap-x-4 gap-y-2">
          <button onClick={submitProduct} className="btn btn-blue btn-l">
            <span className="text-sm font-medium">Publicar</span>
          </button>
        </div>
      </section>
    </main>
  );
};