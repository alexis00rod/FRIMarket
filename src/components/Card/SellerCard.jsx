import { Link } from "react-router-dom"
import { useUserPosts } from "../../hooks/useUserPosts"

export const SellerCard = ({seller}) => {
  const {email, idUser, photoURL, displayName, bio, posts, sales} = seller
  const {userPosts} = useUserPosts(email)

  return (
    <Link to={`/profile/${idUser}`} className="sellerCard">
      {/* Photo */}
      <img src={photoURL} alt={displayName} className="sellerCard-photo" />
      <div className="sellerCard-profile px-1 md:px-2 py-1 md:py-2 flex flex-col justify-between gap-2">
        <div className="flex flex-col">
          <h3 className='sellerCard-name'>{displayName}</h3>
          <h4 className='sellerCard-id'>@{idUser}</h4>
          {bio && <p className='sellerCard-bio'>{bio}</p>}
        </div>
        <div className="flex flex-col">
          <p className="sellerCard-posts">Publicaciones: <span className="font-medium">{userPosts.length}</span></p>
          <p className="sellerCard-sales">Ventas: <span className="font-medium">{sales ? sales : 0}</span></p>
        </div>
      </div>
    </Link>
  )
}
