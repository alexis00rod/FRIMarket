import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUser } from "../../services/firestore"
import moment from "moment/moment"

export const ReviewCard = ({review}) => {
  const [userReview, setUserReview] = useState([])

  useEffect(() => {
    getUser(review.email,setUserReview)
  },[review])

  const {email, idUser, photoURL, displayName} = userReview
  const {rating,body,date} = review

  return (
    <li className="reviewCard">
      <Link to={`/profile/${idUser}`} className='reviewCard-user'>
        <img src={photoURL} alt={displayName} className='reviewCard-user-thumb' />
        <div className="reviewCard-user-profile">
          <h4>{displayName}</h4>
          <h5>{email}</h5>
        </div>
      </Link>
      <div className="reviewCard-body">
        <div className="reviewCard-rating">
          <div className="flex">
            {[1,2,3,4,5].map((e,i) => <i className={`${rating > i ? 'text-yellow-500' : 'text-gray-300'} fa-solid fa-star`}></i>)}
          </div>
          <span className="reviewCard-date">{date && moment(date.toDate()).fromNow()}</span>
        </div>
        <p className="reviewCard-review">{body}</p>
      </div>
    </li>
  )
}
