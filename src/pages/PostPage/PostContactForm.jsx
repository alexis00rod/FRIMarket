import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLocations } from "../../hooks/useLocations"
import { useProfile } from "../../hooks/useProfile"
import { usePostContext } from "./context/PostContext"
import { addProduct } from "../../services/post"
import { ButtonLoader, Loader, PostUserEmail, PostUserLocation, PostUserName, PostUserPhone } from "../../components"

export const PostContactForm = () => {
  const {productToPost, setProductToPost,validateContact} = usePostContext()
  const {profile} = useProfile()
  const {locations} = useLocations()
  const navigate = useNavigate()
  const [contactLoader, setContactLoader] = useState(false)
  
  const submitContact = async e => {
    e.preventDefault()
    setContactLoader(true)
    const validate = validateContact()
    if(validate) {
      try {
        const product = await addProduct(productToPost)
        setProductToPost({})
        navigate(`/post/${product}`)
        setContactLoader(false)
      } catch(err) {
        alert(err)
        setContactLoader(false)
      }
    } else {
      setContactLoader(false)
    }
  }

  useEffect(() => {
    profile &&
    setProductToPost({
      ...productToPost,
      user: {
        ...productToPost.user,
        name: `${profile.name} ${profile.lastName}`,
        email: profile.email,
        phone: profile.phone
      }
    })
  },[profile])

  const disablebContactForm = () => {
    if (
      !productToPost.user.name ||
      !productToPost.user.email ||
      !productToPost.user.phone ||
      !productToPost.user.province ||
      !productToPost.user.city
    ) {
      return true
    } else {
      return false
    }
  }

  if(!profile || !locations) return <Loader />

  return (
    <section className="post">
      <div className="post-form">
        <div className="post-header">
          <div className="flex items-center justify-between">
            <p>Paso 5 de 5</p>
            <Link to="/post/sale-form" className="btn btn-text-blue btn-m btn-text">
              <i className="fa-solid fa-arrow-left"></i>
              Anterior
            </Link>
          </div>
          <h2>¡Casi listo! Por favor, completa tu información y ubicación.</h2>
        </div>
        <div className="post-inputs">
          <PostUserName />
          <PostUserEmail />
          <PostUserPhone />
          <PostUserLocation profileLocations={profile.locations} locations={locations} />
        </div>
        <div className="post-buttons">
          {contactLoader
          ? <ButtonLoader />
          : <button 
            onClick={submitContact} 
            className="btn btn-blue btn-l btn-text"
            disabled={disablebContactForm()}
            >
              Confirmar
            </button>}
        </div>
      </div>
    </section>
  )
}
