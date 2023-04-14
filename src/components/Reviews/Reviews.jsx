import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { addReview, getProductReviews } from "../../services/review.js"
import { Button, Element, InputRating, Loader, ReviewCard, ReviewRating, SelectReviewsSort, Textarea } from "../index.js"

export const Reviews = ({product}) => {
  const {userLogged} = useAuthContext()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState()
  const [writeReview, setWriteReview] = useState(false)
  const [review, setReview] = useState({rating:0})
  const [reviewsSort, setReviewsSort] = useState('new')

  useEffect(() => {
    getProductReviews(product,reviewsSort,setReviews)
  },[product,reviewsSort])

  const handleWriteReview = () => {
    userLogged
    ? setWriteReview(!writeReview)
    : navigate('/login')
  }

  const handleReview = ({target:{name,value}}) => {
    setReview({
      ...review,
      [name]: value
    })
  }

  const submitReview = e => {
    e.preventDefault()
    addReview(userLogged,product,review)
    setWriteReview(false)
  }

  return (
    <Element flex='flex-col'>
      <div className="box-header box-header-underline flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <h3 className="text-lg font-semibold grow">Reseñas</h3>
        <SelectReviewsSort selected={reviewsSort} onChange={({target:{id}}) => setReviewsSort(id)} />
        <div className="absolute top-2 right-2 md:static flex flex-none px-2 py-1">
          {writeReview
            ? <Button color='btn-black' size='btn-m' title='Ver reseñas' onClick={() => setWriteReview(false)}>
                <span className="text-sm font-medium">Ver reseñas</span>
              </Button>
            : <Button icon='pen' color='btn-black' size='btn-m' title='Escribir reseña' onClick={handleWriteReview}>
                <span className="text-sm font-medium">Escribir reseña</span>
              </Button>}
        </div>
      </div>
      {reviews
      ? <div className="w-full flex flex-col items-center md:flex-row md:items-start">
          <ReviewRating reviews={reviews} />
          {writeReview
          ? <form className="box-body flex flex-col grow gap-4" onSubmit={submitReview}>
              <InputRating initial={review} obs={setReview} />
              <Textarea label='Reseña' id='body' name='body' onChange={handleReview} />
              <Button icon='check' color='btn-green' size='btn-l'>
                <span className="text-sm font-medium">Enviar reseña</span>
              </Button>
            </form>
          : <ul className="box-body flex flex-col divide-y divide-gray-300">
              {reviews.map(e => <ReviewCard key={e.id} review={e} /> )}
            </ul>}
        </div>
      : <Loader />}
    </Element>
  )
}
