import { Link } from "react-router-dom"
import { useUserPosts } from "../../hooks/useUserPosts"

export const SellerCard = ({seller}) => {
  const {email, idUser, photoURL, displayName, sales} = seller
  const {userPosts} = useUserPosts(email)

  return (
    <Link to={`/profile/${idUser}`} className="sellerCard">
      {/* Photo */}
      <img src={photoURL} alt={displayName} className="sellerCard-photo" />
      <div className="sellerCard-profile">
        <div className="flex flex-col grow">
          {/* Name */}
          <h3 className='sellerCard-name'>{displayName}</h3>
          {/* IDUser */}
          <h4 className='sellerCard-id'>@{idUser}</h4>
        </div>
        <div className="flex flex-col">
          {/* Posts */}
          <p className="sellerCard-posts">Publicaciones: <span>{userPosts.length}</span></p>
          {/* Sales */}
          <p className="sellerCard-sales">Ventas: <span>{sales ? sales : 0}</span></p>
        </div>
      </div>
    </Link>
  )
}
