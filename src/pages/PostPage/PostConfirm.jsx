import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProductDetail } from "../../services/shop"
import { useProfile } from "../../hooks/useProfile"
import { Loader } from '../../components'

export const PostConfirm = () => {
  const {idPost} = useParams()
  const [post, setPost] = useState()
  const {profile} = useProfile()

  useEffect(() => {
    getProductDetail(idPost,setPost)
  },[idPost])

  if(!post || !profile) return <Loader />

  return (
    <section className="post">
      <div className="post-confirm">
        <div className="post-confirm-header">
          <div className="grow flex flex-col">
            <span>¡Listo!</span>
            <p>Creaste tu publicación</p>
          </div>
          <i className="fa-solid fa-check"></i>
        </div>
        <div className="post-confirm-detail">
          <img src={post.images[0].url} alt={post.images[0].name} />
          <h3>{post.title.join(' ')}</h3>
          <Link to={`/product/${post.id}`} className="btn btn-text btn-m btn-text-blue">
            Ir a la página del producto
          </Link>
        </div>
        <div className="post-confirm-buttons">
          <Link to={`/profile/${profile.idUser}`} className="btn btn-m btn-text btn-blue">
            Ir a publicaciones
          </Link>
        </div>
      </div>
    </section>
  )
}
