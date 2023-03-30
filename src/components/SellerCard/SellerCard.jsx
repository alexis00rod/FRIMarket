import { Link } from "react-router-dom"
import { useUserPosts } from "../../hooks/useUserPosts"

export const SellerCard = ({seller}) => {
  const {email, idUser, photoURL, displayName, bio, posts, sales} = seller
  const {userPosts} = useUserPosts(email)

  return (
    <Link to={`/profile/${idUser}`} className="sellerCard">
      <div className="sellerCard-profile">
        <img src={photoURL} alt={displayName} className='sellerCard-photo' />
        <div className="px-2 py-2 w-full flex flex-col">
          <h3 className='sellerCard-name'>{displayName}</h3>
          <h4 className='sellerCard-id'>@{idUser}</h4>
          {bio && <p className='sellerCard-bio'>{bio}</p>}
        </div>
      </div>
      <div className="sellerCard-info">
        <p className="flex items-center gap-2 font-medium">
          Publicaciones:
          <span>{userPosts.length}</span>
        </p>
        <p className="flex items-center gap-2 font-medium">
          Ventas:
          <span>{sales ? sales : 0}</span>
        </p>
      </div>
    </Link>
  )
}
