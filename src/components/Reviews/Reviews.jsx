import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext/AuthContext"
import { addReview, getProductReviews } from "../../services/firestore"
import { Button, InputRating, InputText, ReviewCard, ReviewRating, ReviewsSort, Textarea } from "../index.js"

export const Reviews = ({product}) => {
  const {userLogged} = useAuthContext()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])
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
    <div className="box flex flex-col">
      <div className="box-header flex items-center flex-wrap gap-4">
        <h4 className='grow text-xl font-medium'>Reseñas</h4>
        <div className="grow flex items-center justify-end gap-4">
          <ReviewsSort selected={reviewsSort} onChange={({target:{id}}) => setReviewsSort(id)} />
          <div className="w-36 flex justify-center flex-none">
            {writeReview
            ? <Button color='btn-black' size='btn-m' title='Ver reseñas' onClick={() => setWriteReview(false)}>
                <span className="text-sm font-medium">Ver reseñas</span>
              </Button>
            : <Button icon='pen' color='btn-black' size='btn-m' title='Escribir reseña' onClick={handleWriteReview}>
                <span className="text-sm font-medium">Escribir reseña</span>
              </Button>}
          </div>
        </div>
      </div>
      {writeReview
      ? <form className='box-body flex flex-col gap-2' onSubmit={submitReview}>
          <div className="w-full pb-1 flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col justify-between grow gap-4">
              <InputRating initial={review} obs={setReview} />
              <InputText label='Titulo de la reseña' id='title' name='title' onChange={handleReview} />
            </div>
            <div className="grow">
              <Textarea label='Reseña' id='body' name='body' onChange={handleReview} />
            </div>
          </div>
          <Button icon='check' color='btn-green' size='btn-l'>
            <span className="text-sm font-medium">Enviar reseña</span>
          </Button>
        </form>
      : reviews.length > 0
        ? <div className='box-body flex flex-wrap gap-2'>
            <ReviewRating reviews={reviews} />
            <ul className="flex flex-col grow divide-y divide-gray-300">
              {reviews.map(e => <ReviewCard key={e.id} review={e} /> )}
            </ul>
          </div>
        : <div className='w-full px-2 pt-2'>
            <span>No hay reseñas</span>
          </div>}
    </div>
  )
}
