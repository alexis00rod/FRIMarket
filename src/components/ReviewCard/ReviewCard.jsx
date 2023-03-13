import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUser } from "../../services/firestore"

export const ReviewCard = ({review}) => {
  const [userReview, setUserReview] = useState([])

  useEffect(() => {
    getUser(review.email,setUserReview)
  },[review])

  const {idUser,photoURL, displayName} = userReview
  const {rating,title,body} = review

  return (
    <li className="px-2 py-4 flex gap-2">
      <Link to={`/profile/${idUser}`} className='w-12 h-12 flex flex-none'>
        <img src={photoURL} alt={displayName} className='w-full h-full object-cover rounded-md' />
      </Link>
      <div className="px-1 flex flex-col grow">
        <div className="flex gap-2">
          <Link to={`/profile/${idUser}`} className="font-medium">{displayName}</Link>
          <span className="font-semibold text-yellow-500">
            <i className="fa-solid fa-star"></i>
            {rating}
          </span>
        </div>
        <h4 className="mb-1 text-lg font-medium">{title}</h4>
        <p className="text-sm line-clamp-2">{body}</p>
      </div>
    </li>
  )
}
