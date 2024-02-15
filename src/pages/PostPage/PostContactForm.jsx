import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLocations } from "../../hooks/useLocations"
import { useProfile } from "../../hooks/useProfile"
import { usePostContext } from "./context/PostContext"
import { addProduct } from "../../services/post"
import { Loader, PostUserEmail, PostUserLocation, PostUserName, PostUserPhone } from "../../components"

export const PostContactForm = () => {
  const {productToPost, setProductToPost,validateContact} = usePostContext()
  const {profile} = useProfile()
  const {locations} = useLocations()
  const navigate = useNavigate()
  
  const submitContact = async e => {
    e.preventDefault()
    const validate = validateContact()
    if(validate) {
      try {
        await addProduct(productToPost)
        navigate('/')
      } catch(err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    profile &&
    setProductToPost({
      ...productToPost,
      user: {
        ...productToPost.user,
        name: profile.displayName,
        email: profile.email
      }
    })
  },[profile])

  if(!profile && !locations) return <Loader />

  return (
    <main className="grow flex flex-col">
      <section className="w-full md:max-w-[33rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 flex flex-col grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
        <div className="mt-6 md:mt-0 h-10 flex items-center">
          <p className="grow text-xs font-light">Paso 5 de 5</p>
          <Link to="/post/sale-form" className="btn btn-text-blue btn-m">
            <i className="fa-solid fa-arrow-left"></i>
            <span className="text-sm font-medium">Anterior</span>
          </Link>
        </div>
        <h2 className="mt-6 md:mt-0 text-2xl font-medium">
          ¡Casi listo! Por favor, completa tu información y localización.
        </h2>
        <div className="flex flex-col divide-y divide-gray-300">
          {/* Nombre */}
          <PostUserName />
          {/* Email */}
          <PostUserEmail />
          {/* Numero de contacto */}
          <PostUserPhone />
          {/* Localizacion */}
          <PostUserLocation locations={locations} />
          <div className="mt-6 pt-6">
            <button onClick={submitContact} className="btn btn-blue btn-l">
              <span className="text-sm font-medium">Confirmar</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
